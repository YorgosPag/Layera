/**
 * Factory Settings Service
 *
 * Διαχειρίζεται τις εργοστασιακές ρυθμίσεις χρωμάτων στο Firebase
 * και την αποθήκευση προσωπικών ρυθμίσεων χρήστη
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { getDb, getAuthCurrentUser } from '../firebase';
import {
  AVAILABLE_PALETTES,
  PaletteType,
  loadFactorySettings,
  convertPaletteToAppFormat,
  type FactoryColorSettings
} from '../constants/factoryColorSettings';

// Collection references
const FACTORY_SETTINGS_COLLECTION = 'factoryColorSettings';
const USER_SETTINGS_COLLECTION = 'userColorSettings';

interface UserColorSettings {
  userId: string;
  settings: {
    primaryColor: string;
    secondaryColor: string;
    successColor: string;
    warningColor: string;
    dangerColor: string;
    infoColor: string;
    outlineColor: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isCustom: boolean;
  paletteType?: PaletteType;
}

interface StoredFactorySettings {
  id: string;
  name: string;
  palette: FactoryColorSettings;
  isDefault: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Factory Settings Management
 */
export class FactorySettingsService {
  /**
   * Αρχικοποιεί τη Firebase με τις εργοστασιακές ρυθμίσεις
   */
  static async initializeFactorySettings(): Promise<void> {
      // Αρχικοποίηση εργοστασιακών ρυθμίσεων

      // Έλεγχος αν έχουμε Firebase database
      const db = getDb();
      if (!db) {
        //console.log('⚠️ Firebase δεν είναι διαθέσιμο - χρήση local settings');
        return;
      }

      //console.log('🔐 Έλεγχος Firebase permissions...');

      // Έλεγχος authentication
      const currentUser = getAuthCurrentUser();
      if (currentUser) {
        //console.log('👤 Χρήστης συνδεδεμένος:', currentUser.email);
        // Μπορείς να ελέγξεις εδώ τον ρόλο του χρήστη αν χρειάζεται
      } else {
        //console.log('🚫 Χρήστης δεν είναι συνδεδεμένος - απαιτείται authentication για Firebase write operations');
        // Δοκιμάζουμε παρόλα αυτά - ίσως έχουν δημόσια read permissions
      }

      // Ελέγχουμε αν υπάρχουν ήδη
      const existingSettings = await this.getFactorySettings();
      if (existingSettings.length > 0) {
        //console.log('✅ Εργοστασιακές ρυθμίσεις υπάρχουν ήδη');
        return;
      }

      // Αποθηκεύουμε όλες τις palettes
      const settingsToStore: Omit<StoredFactorySettings, 'createdAt' | 'updatedAt'>[] = [
        {
          id: 'enterprise',
          name: 'Enterprise Standard',
          palette: AVAILABLE_PALETTES.enterprise,
          isDefault: true
        },
        {
          id: 'microsoft',
          name: 'Microsoft Fluent',
          palette: AVAILABLE_PALETTES.microsoft,
          isDefault: false
        },
        {
          id: 'google',
          name: 'Google Material',
          palette: AVAILABLE_PALETTES.google,
          isDefault: false
        }
      ];

      // Αποθήκευση στη Firebase - χρησιμοποιούμε την ήδη ελεγμένη db
      for (const setting of settingsToStore) {
        const docRef = doc(db, FACTORY_SETTINGS_COLLECTION, setting.id);
        await setDoc(docRef, {
          ...setting,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }

      //console.log('✅ Εργοστασιακές ρυθμίσεις αποθηκεύτηκαν επιτυχώς');
  }

  /**
   * Ανακτάει όλες τις εργοστασιακές ρυθμίσεις από Firebase
   */
  static async getFactorySettings(): Promise<StoredFactorySettings[]> {
    try {
      const db = getDb();
      if (!db) {
        //console.log('Firebase δεν είναι διαθέσιμο - χρήση local settings');
        return [];
      }

      const querySnapshot = await getDocs(collection(db, FACTORY_SETTINGS_COLLECTION));
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as StoredFactorySettings[];
    } catch (error) {
      //console.error('❌ Σφάλμα κατά την ανάκτηση εργοστασιακών ρυθμίσεων:', error);
      // Fallback σε local settings
      return [];
    }
  }

  /**
   * Ανακτάει συγκεκριμένη εργοστασιακή ρύθμιση
   */
  static async getFactorySettingById(id: PaletteType): Promise<StoredFactorySettings | null> {
    try {
      const db = getDb();
      if (!db) {
        //console.log('Firebase δεν είναι διαθέσιμο - χρήση local settings');
        return null;
      }
      const docRef = doc(db, FACTORY_SETTINGS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          ...docSnap.data(),
          id: docSnap.id
        } as StoredFactorySettings;
      }

      return null;
    } catch (error) {
      //console.error(`❌ Σφάλμα κατά την ανάκτηση factory setting ${id}:`, error);
      return null;
    }
  }

  /**
   * User Settings Management
   */

  /**
   * Αποθηκεύει τις ρυθμίσεις χρήστη
   */
  static async saveUserSettings(userId: string, settings: UserColorSettings['settings'], paletteType?: PaletteType): Promise<void> {
      const db = getDb();
      if (!db) {
        throw new Error('Firebase δεν είναι διαθέσιμο');
      }
      const docRef = doc(db, USER_SETTINGS_COLLECTION, userId);
      const userSettings: Omit<UserColorSettings, 'createdAt'> & { createdAt?: Timestamp } = {
        userId,
        settings,
        updatedAt: Timestamp.now(),
        isCustom: !paletteType,
        paletteType
      };

      // Ελέγχουμε αν υπάρχουν ήδη ρυθμίσεις
      const existingDoc = await getDoc(docRef);
      if (existingDoc.exists()) {
        await updateDoc(docRef, userSettings);
      } else {
        await setDoc(docRef, {
          ...userSettings,
          createdAt: Timestamp.now()
        });
      }

      //console.log('✅ Ρυθμίσεις χρήστη αποθηκεύτηκαν επιτυχώς');
  }

  /**
   * Ανακτάει τις ρυθμίσεις χρήστη
   */
  static async getUserSettings(userId: string): Promise<UserColorSettings | null> {
    try {
      const db = getDb();
      if (!db) {
        //console.log('Firebase δεν είναι διαθέσιμο - χρήση local settings');
        return null;
      }
      const docRef = doc(db, USER_SETTINGS_COLLECTION, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserColorSettings;
      }

      return null;
    } catch (error) {
      //console.error('❌ Σφάλμα κατά την ανάκτηση ρυθμίσεων χρήστη:', error);
      return null;
    }
  }


  /**
   * Διαγράφει όλες τις αποθηκευμένες ρυθμίσεις χρηστών (admin function)
   */
  static async deleteAllUserSettings(): Promise<void> {
    //console.log('🗑️ Διαγραφή όλων των ρυθμίσεων χρηστών...');
    const db = getDb();
    if (!db) {
      throw new Error('Firebase δεν είναι διαθέσιμο');
    }
    const querySnapshot = await getDocs(collection(db, USER_SETTINGS_COLLECTION));

    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    //console.log(`✅ Διαγράφηκαν ${querySnapshot.size} ρυθμίσεις χρηστών`);
  }

  /**
   * Utility Functions
   */

  /**
   * Φορτώνει τις εργοστασιακές ρυθμίσεις (fallback σε local αν Firebase αποτύχει)
   */
  static async loadFactorySettingsWithFallback(paletteType: PaletteType = 'enterprise') {
    try {
      const firebaseSettings = await this.getFactorySettingById(paletteType);
      if (firebaseSettings) {
        //console.log('✅ Φόρτωση factory settings από Firebase επιτυχής');
        return convertPaletteToAppFormat(firebaseSettings.palette);
      }
    } catch (error) {
      //console.warn('⚠️ Fallback σε local factory settings:', error);
    }

    // Fallback σε local settings
    return loadFactorySettings(paletteType);
  }

  /**
   * Local Storage Management
   */

  /**
   * Αποθηκεύει ρυθμίσεις στο local storage
   */
  static saveToLocalStorage(settings: UserColorSettings['settings']): void {
    try {
      localStorage.setItem('layera-color-settings', JSON.stringify(settings));
      localStorage.setItem('layera-color-settings-timestamp', Date.now().toString());
    } catch (error) {
      //console.error('❌ Σφάλμα κατά την αποθήκευση στο local storage:', error);
    }
  }

  /**
   * Ανακτάει ρυθμίσεις από το local storage
   */
  static loadFromLocalStorage(): UserColorSettings['settings'] | null {
    try {
      const settings = localStorage.getItem('layera-color-settings');
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      //console.error('❌ Σφάλμα κατά την ανάκτηση από το local storage:', error);
      return null;
    }
  }

}