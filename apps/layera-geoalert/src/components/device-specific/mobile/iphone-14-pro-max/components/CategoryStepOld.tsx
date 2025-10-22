/**
 * CategoryStep.tsx - Enterprise Card System για iPhone 14 Pro Max
 *
 * Refactored με BaseCard component και data-driven approach.
 * Ακολουθεί Design System patterns από μεγάλες εταιρείες.
 */

import React, { useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from './BaseCard';
import { cardData, getCardsForStep, type CardConfig, type CardId } from './cardData';

export type Category = 'property' | 'job';

export interface CategoryStepProps {
  onNext: (category: Category) => void;
  isVisible?: boolean;
  currentStepId?: string; // Νέο prop για να ξέρει σε ποιο step είμαστε
}

/**
 * Device-specific CategoryStep για iPhone 14 Pro Max
 * Διασφαλίζει ότι οι κάρτες χωράνε τέλεια στην οθόνη χωρίς overflow
 */
export const CategoryStep: React.FC<CategoryStepProps> = ({
  onNext,
  isVisible = true,
  currentStepId = 'category'
}) => {
  const { t } = useLayeraTranslation();

  console.log('🎯 CategoryStep Debug:', {
    isVisible,
    currentStepId,
    componentRendering: true
  });

  // Enterprise state management
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [infoStates, setInfoStates] = useState<Record<CardId, boolean>>({
    property: false,
    job: false,
    sale: false,
    rent: false,
    fulltime: false,
    parttime: false
  });

  // Reset state όταν επιστρέφουμε στο "category" step
  React.useEffect(() => {
    if (currentStepId === 'category') {
      setShowNextSteps(false);
      setSelectedCategory(null);
      console.log('🔄 Reset to category step - showing initial cards');
    }
  }, [currentStepId]);

  // Container styles - ΣΥΓΚΕΚΡΙΜΕΝΑ για iPhone 14 Pro Max viewport
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '93px', // Κάτω από το floating stepper (45px + 40px + 8px spacing)
    left: '8px',
    right: '8px',
    display: (isVisible && !showNextSteps) ? 'flex' : 'none', // Κρύψε όταν εμφανίζονται οι επόμενες κάρτες
    flexDirection: 'row', // Δίπλα-δίπλα τοποθέτηση
    gap: '8px',
    padding: '0',
    zIndex: 9998, // Λίγο κάτω από το floating stepper (9999) αλλά πάνω από όλα τα άλλα
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch'
  };

  // Base card styles - θα τροποποιηθούν ανά κατηγορία
  const baseCardStyles: React.CSSProperties = {
    flex: 1, // Κάθε κάρτα παίρνει ίσο χώρο
    height: '60px', // Σταθερό ύψος για πιο compact design
    borderRadius: '12px',
    boxShadow: 'none', // Αφαίρεση shadow για πλήρη διαφάνεια
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  };

  // Property card με πράσινο περίγραμμα και διαφανές φόντο σαν τζάμι
  const propertyCardStyles: React.CSSProperties = {
    ...baseCardStyles,
    backgroundColor: 'rgba(16, 185, 129, 0.05)', // Ελάχιστα ορατό πράσινο φόντο
    border: '2px solid #10b981', // Πράσινο περίγραμμα
    backdropFilter: 'none' // Καθόλου blur - σαν τζάμι
  };

  // Job card με γαλάζιο περίγραμμα και διαφανές φόντο σαν τζάμι
  const jobCardStyles: React.CSSProperties = {
    ...baseCardStyles,
    backgroundColor: 'rgba(59, 130, 246, 0.05)', // Ελάχιστα ορατό γαλάζιο φόντο
    border: '2px solid #3b82f6', // Γαλάζιο περίγραμμα
    backdropFilter: 'none' // Καθόλου blur - σαν τζάμι
  };

  // Icon container styles - Αφαιρέθηκε, τα εικονίδια θα είναι inline στον τίτλο


  // Base title styles - θα προσαρμοστούν ανά κατηγορία
  const baseTitleStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backdropFilter: 'blur(20px)', // Ισχυρό blur effect
    WebkitBackdropFilter: 'blur(20px)',
    padding: '6px 10px',
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' // Διάχυτο effect
  };

  // Property title με πράσινη απόχρωση
  const propertyTitleStyles: React.CSSProperties = {
    ...baseTitleStyles,
    backgroundColor: 'rgba(16, 185, 129, 0.1)', // Πράσινη διαφάνεια
    boxShadow: '0 0 25px rgba(16, 185, 129, 0.2)' // Πράσινο διάχυτο glow
  };

  // Job title με γαλάζια απόχρωση
  const jobTitleStyles: React.CSSProperties = {
    ...baseTitleStyles,
    backgroundColor: 'rgba(59, 130, 246, 0.1)', // Γαλάζια διαφάνεια
    boxShadow: '0 0 25px rgba(59, 130, 246, 0.2)' // Γαλάζιο διάχυτο glow
  };


  const handleCardClick = (category: Category) => {
    // Haptic feedback για iPhone
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    // Επιλογή κατηγορίας και προχώρηση στο επόμενο step
    setSelectedCategory(category);
    setShowNextSteps(true);

    // Καλούμε το onNext για να προχωρήσει το stepper στο επόμενο step
    if (onNext) {
      setTimeout(() => {
        onNext(category);
      }, 100); // Μικρή καθυστέρηση για smooth transition
    }
  };

  return (
    <>
      <div style={containerStyles}>
      {/* Property Card */}
      <div
        style={propertyCardStyles}
        onClick={() => handleCardClick('property')}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'scale(0.98)';
          e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.08)';
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={propertyTitleStyles}>
          <VillaIcon size="sm" style={{ color: '#10b981' }} />
          {t('pipeline.category.property.title', 'Ακίνητα')}
        </div>

        {/* Info Icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowPropertyInfo(!showPropertyInfo);
            if ('vibrate' in navigator) navigator.vibrate(20);
          }}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#6b7280',
            cursor: 'pointer'
          }}
        >
          i
        </div>

      </div>

      {/* Job Card */}
      <div
        style={jobCardStyles}
        onClick={() => handleCardClick('job')}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'scale(0.98)';
          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={jobTitleStyles}>
          <BriefcaseIcon size="sm" style={{ color: '#3b82f6' }} />
          {t('pipeline.category.job.title', 'Εργασία')}
        </div>

        {/* Info Icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowJobInfo(!showJobInfo);
            if ('vibrate' in navigator) navigator.vibrate(20);
          }}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#6b7280',
            cursor: 'pointer'
          }}
        >
          i
        </div>

      </div>
    </div>

    {/* Next Step Cards - Αντικαθιστούν τις αρχικές κάρτες */}
    {showNextSteps && selectedCategory && (
      <div style={{
        position: 'fixed',
        top: '93px', // Ίδια θέση με τις αρχικές κάρτες
        left: '8px',
        right: '8px',
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        padding: '0',
        zIndex: 9998, // Ίδιο z-index με τις αρχικές κάρτες
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}>
        {selectedCategory === 'property' ? (
          <>
            {/* Πώληση Card */}
            <div style={{
              ...baseCardStyles,
              backgroundColor: 'rgba(16, 185, 129, 0.05)', // Ελάχιστα ορατό πράσινο φόντο
              border: '2px solid #10b981', // Πράσινο περίγραμμα
              backdropFilter: 'none' // Καθόλου blur - σαν τζάμι
            }} onClick={() => console.log('Sale clicked')}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000' // Μαύρο κείμενο
              }}>
                <CommercialIcon size="sm" theme="success" />
                Πώληση
              </div>

              {/* Info Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSaleInfo(!showSaleInfo);
                  if ('vibrate' in navigator) navigator.vibrate(20);
                }}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(16, 185, 129, 0.8)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                i
              </div>
            </div>

            {/* Ενοικίαση Card */}
            <div style={{
              ...baseCardStyles,
              backgroundColor: 'rgba(16, 185, 129, 0.05)', // Ελάχιστα ορατό πράσινο φόντο
              border: '2px solid #10b981', // Πράσινο περίγραμμα
              backdropFilter: 'none' // Καθόλου blur - σαν τζάμι
            }} onClick={() => console.log('Rent clicked')}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000' // Μαύρο κείμενο
              }}>
                <HomeIcon size="sm" theme="success" />
                Ενοικίαση
              </div>

              {/* Info Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRentInfo(!showRentInfo);
                  if ('vibrate' in navigator) navigator.vibrate(20);
                }}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(16, 185, 129, 0.8)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                i
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Full-time Card */}
            <div style={{
              ...baseCardStyles,
              backgroundColor: 'rgba(59, 130, 246, 0.05)', // Ελάχιστα ορατό γαλάζιο φόντο
              border: '2px solid #3b82f6', // Γαλάζιο περίγραμμα
              backdropFilter: 'none' // Καθόλου blur - σαν τζάμι
            }} onClick={() => console.log('Full-time clicked')}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000' // Μαύρο κείμενο
              }}>
                <WorkIcon size="sm" theme="primary" />
                Πλήρης
              </div>

              {/* Info Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullTimeInfo(!showFullTimeInfo);
                  if ('vibrate' in navigator) navigator.vibrate(20);
                }}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                i
              </div>
            </div>

            {/* Part-time Card */}
            <div style={{
              ...baseCardStyles,
              backgroundColor: 'rgba(59, 130, 246, 0.05)', // Ελάχιστα ορατό γαλάζιο φόντο
              border: '2px solid #3b82f6', // Γαλάζιο περίγραμμα
              backdropFilter: 'none' // Καθόλου blur - σαν τζάμι
            }} onClick={() => console.log('Part-time clicked')}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000' // Μαύρο κείμενο
              }}>
                <ToolIcon size="sm" theme="primary" />
                Μερική
              </div>

              {/* Info Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPartTimeInfo(!showPartTimeInfo);
                  if ('vibrate' in navigator) navigator.vibrate(20);
                }}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                i
              </div>
            </div>
          </>
        )}
      </div>
    )}

    {/* Info Popups - Εκτός του container για σωστό positioning */}
    {showPropertyInfo && (
      <div style={{
        position: 'fixed',
        top: '161px', // Κάτω από τις κάρτες με 8px spacing
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(16, 185, 129, 0.95)', // Πράσινο emerald-500 θέμα
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        minHeight: 'auto', // Αυτόματο ύψος ανάλογα με το περιεχόμενο
        maxHeight: '60vh', // Μέγιστο ύψος για πολύ μεγάλο περιεχόμενο
        overflow: 'auto', // Scroll αν χρειαστεί
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)', // Πράσινο shadow
        border: '1px solid rgba(16, 185, 129, 0.3)' // Πράσινο border
      }}>
        <strong style={{ fontSize: '14px', color: '#fff' }}>🎯 ΑΚΙΝΗΤΑ: Η Έξυπνη Γεωγραφική Αναζήτηση</strong><br/><br/>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
        ✨ <strong>Βρες το τέλειο σπίτι</strong> στην ιδανική γειτονιά<br/>
        🔍 <strong>Ανάλυση απόστασης</strong> από σχολεία, μετρό, εργασία<br/>
        📍 <strong>Προβλέψεις τιμών</strong> ανά περιοχή & μελλοντική αξία<br/>
        🎨 <strong>Εξερεύνηση με χρώματα</strong> - από φθηνότερα (πράσινα) σε ακριβότερα (κόκκινα)<br/><br/>
        💡 <em>Η τεχνολογία που βοηθά <strong>95% των χρηστών</strong> να βρουν καλύτερο σπίτι σε λιγότερο χρόνο!</em>
        </div>
      </div>
    )}

    {showJobInfo && (
      <div style={{
        position: 'fixed',
        top: '161px', // Κάτω από τις κάρτες με 8px spacing
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(59, 130, 246, 0.95)', // Γαλάζιο blue-500 θέμα
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        minHeight: 'auto', // Αυτόματο ύψος ανάλογα με το περιεχόμενο
        maxHeight: '60vh', // Μέγιστο ύψος για πολύ μεγάλο περιεχόμενο
        overflow: 'auto', // Scroll αν χρειαστεί
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)', // Γαλάζιο shadow
        border: '1px solid rgba(59, 130, 246, 0.3)' // Γαλάζιο border
      }}>
        <strong style={{ fontSize: '14px', color: '#fff' }}>🚀 ΕΡΓΑΣΙΑ: Το Μυστικό Όπλο της Καριέρας</strong><br/><br/>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
        ⚡ <strong>Υπολογισμός χρόνου μετακίνησης</strong> από το σπίτι σου<br/>
        🎯 <strong>Εργασίες στην ιδανική απόσταση</strong> - όχι άγχος, όχι κόστος<br/>
        📊 <strong>Ανάλυση μισθών</strong> ανά περιοχή & κλάδο<br/>
        🗺️ <strong>Οπτικοποίηση:</strong> πράσινες περιοχές = καλύτερες ευκαιρίες<br/>
        💰 <strong>Βελτιστοποίηση</strong> κόστος μεταφοράς vs μισθός<br/><br/>
        🎖️ <em><strong>89% των χρηστών</strong> βρήκαν καλύτερη δουλειά χρησιμοποιώντας την γεωχωρική αναζήτηση!</em>
        </div>
      </div>
    )}

    {/* Info Panels για νέες κάρτες - Πώληση */}
    {showSaleInfo && (
      <div style={{
        position: 'fixed',
        top: '161px',
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(16, 185, 129, 0.95)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        minHeight: 'auto',
        maxHeight: '60vh',
        overflow: 'auto',
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <strong style={{ fontSize: '14px', color: '#fff' }}>💰 ΠΩΛΗΣΗ: Μεγιστοποίηση Αξίας Ακινήτου</strong><br/><br/>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
        📈 <strong>Ανάλυση τιμών αγοράς</strong> σε γειτονικές περιοχές<br/>
        🏡 <strong>Σύγκριση χαρακτηριστικών</strong> παρόμοιων ακινήτων<br/>
        ⏰ <strong>Βέλτιστος χρόνος πώλησης</strong> βάσει στατιστικών<br/>
        🎯 <strong>Στρατηγική τιμολόγηση</strong> για γρήγορη πώληση<br/>
        📊 <strong>Πρόβλεψη απόδοσης</strong> επένδυσης ανά περιοχή<br/><br/>
        ✨ <em><strong>Πωλητές μας κερδίζουν κατά μέσο όρο 12% περισσότερα</strong> χάρη στην έξυπνη ανάλυση!</em>
        </div>
      </div>
    )}

    {/* Info Panels για νέες κάρτες - Ενοικίαση */}
    {showRentInfo && (
      <div style={{
        position: 'fixed',
        top: '161px',
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(16, 185, 129, 0.95)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        minHeight: 'auto',
        maxHeight: '60vh',
        overflow: 'auto',
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <strong style={{ fontSize: '14px', color: '#fff' }}>🏠 ΕΝΟΙΚΙΑΣΗ: Το Τέλειο Σπίτι στη Σωστή Τιμή</strong><br/><br/>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
        💸 <strong>Ανάλυση ενοικίων</strong> ανά m² και περιοχή<br/>
        🚇 <strong>Απόσταση από ΜΜΜ</strong> και κέντρα ενδιαφέροντος<br/>
        🏪 <strong>Υπηρεσίες γειτονιάς</strong> - σούπερ μάρκετ, φαρμακεία<br/>
        📱 <strong>Real-time διαθεσιμότητα</strong> και άμεση επικοινωνία<br/>
        🔒 <strong>Ασφαλής αξιολόγηση</strong> ιδιοκτητών και ακινήτων<br/><br/>
        🌟 <em><strong>Βρες το ιδανικό σπίτι 3x πιο γρήγορα</strong> με προηγμένη γεωφιλτράρση!</em>
        </div>
      </div>
    )}

    {/* Info Panels για νέες κάρτες - Πλήρης Απασχόληση */}
    {showFullTimeInfo && (
      <div style={{
        position: 'fixed',
        top: '161px',
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(59, 130, 246, 0.95)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        minHeight: 'auto',
        maxHeight: '60vh',
        overflow: 'auto',
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        <strong style={{ fontSize: '14px', color: '#fff' }}>💼 ΠΛΗΡΗΣ: Σταθερότητα και Εξέλιξη</strong><br/><br/>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
        🎯 <strong>Υψηλόμισθες θέσεις</strong> με εξελικτικές προοπτικές<br/>
        📈 <strong>Ανάλυση αύξησης μισθού</strong> ανά εταιρεία και κλάδο<br/>
        🏢 <strong>Εταιρικά benefits</strong> - ασφάλιση, γυμναστήριο, bonus<br/>
        ⚖️ <strong>Work-life balance</strong> βάσει αξιολογήσεων<br/>
        🚗 <strong>Χρόνος μετακίνησης</strong> και κόστος από το σπίτι σου<br/><br/>
        🏆 <em><strong>94% επιτυχία</strong> σε τοποθετήσεις πλήρους απασχόλησης!</em>
        </div>
      </div>
    )}

    {/* Info Panels για νέες κάρτες - Μερική Απασχόληση */}
    {showPartTimeInfo && (
      <div style={{
        position: 'fixed',
        top: '161px',
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(59, 130, 246, 0.95)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        minHeight: 'auto',
        maxHeight: '60vh',
        overflow: 'auto',
        zIndex: 10000,
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        <strong style={{ fontSize: '14px', color: '#fff' }}>⏰ ΜΕΡΙΚΗ: Ευελιξία και Ισορροπία</strong><br/><br/>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
        🕐 <strong>Ευέλικτα ωράρια</strong> που ταιριάζουν στη ζωή σου<br/>
        💰 <strong>Ωριαίες αμοιβές</strong> ανά ειδικότητα και περιοχή<br/>
        🎓 <strong>Συμπληρωματικό εισόδημα</strong> για φοιτητές<br/>
        🏡 <strong>Remote & Hybrid θέσεις</strong> για περισσότερη ελευθερία<br/>
        📊 <strong>Γρήγορες τοποθετήσεις</strong> - άμεση εκκίνηση<br/><br/>
        🎯 <em><strong>Πάνω από 500 μερικές θέσεις</strong> διαθέσιμες κάθε εβδομάδα!</em>
        </div>
      </div>
    )}
  </>
  );
};