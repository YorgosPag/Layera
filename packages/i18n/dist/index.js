import i18n from 'i18next';
export { default as i18n } from 'i18next';
import { initReactI18next, useTranslation, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, createContext, useContext } from 'react';

var app$1 = {
	name: "Layera",
	subtitle: "Επιχειρησιακή Διαχείριση Ταυτότητας",
	welcome: "Καλώς ήρθατε στο Layera!",
	loading: "Φόρτωση...",
	languageSwitch: "Γλώσσα"
};
var navigation$1 = {
	dashboard: "Πίνακας Ελέγχου",
	account: "Ο λογαριασμός μου",
	settings: "Ρυθμίσεις",
	data: "Δεδομένα",
	logout: "Αποσύνδεση",
	back: "Επιστροφή",
	backToDashboard: "Επιστροφή στον Πίνακα Ελέγχου"
};
var auth$1 = {
	login: "Σύνδεση",
	register: "Εγγραφή",
	email: "Email",
	password: "Κωδικός",
	confirmPassword: "Επιβεβαίωση Κωδικού",
	signInWithGoogle: "Σύνδεση με Google",
	forgotPassword: "Ξεχάσατε τον κωδικό;",
	noAccount: "Δεν έχετε λογαριασμό;",
	hasAccount: "Έχετε ήδη λογαριασμό;",
	signOut: "Αποσύνδεση"
};
var mfa$1 = {
	title: "Ενεργοποίηση 2FA",
	subtitle: "Προστατέψτε τον λογαριασμό σας με διπλή ταυτοποίηση μέσω SMS. Θα λαμβάνετε έναν κωδικό στο κινητό σας κάθε φορά που συνδέεστε.",
	whyNeeded: {
		title: "Γιατί χρειάζεται το 2FA;",
		description: "Η διπλή ταυτοποίηση προσθέτει ένα επιπλέον επίπεδο ασφαλείας:",
		benefits: {
			passwordProtection: "Προστασία από κλοπή κωδικών πρόσβασης",
			secureAccess: "Ασφαλής πρόσβαση ακόμα και από άγνωστες συσκευές",
			unauthorizedAlert: "Ειδοποίηση σε περίπτωση μη εξουσιοδοτημένης πρόσβασης"
		}
	},
	form: {
		phoneLabel: "Αριθμός Κινητού Τηλεφώνου",
		phoneHint: "Εισάγετε τον αριθμό με διεθνή κωδικό (π.χ. +30 για Ελλάδα)",
		enableButton: "Ενεργοποίηση 2FA"
	},
	prompts: {
		enterSmsCode: "Εισάγετε τον κωδικό SMS:"
	},
	success: {
		enrollmentComplete: "2FA εγγραφή επιτυχής!"
	},
	errors: {
		enterPhone: "Εισάγετε αριθμό τηλεφώνου",
		operationNotAllowed: "Το SMS-based MFA δεν είναι ενεργοποιημένο στο Firebase Console. Παρακαλούμε επικοινωνήστε με τον διαχειριστή.",
		tooManyRequests: "Πάρα πολλές προσπάθειες. Δοκιμάστε ξανά αργότερα.",
		invalidPhoneNumber: "Μη έγκυρος αριθμός τηλεφώνου. Χρησιμοποιήστε τη μορφή +30xxxxxxxxxx",
		requiresRecentLogin: "Για λόγους ασφαλείας, χρειάζεται πρόσφατη σύνδεση. Παρακαλούμε κάντε logout και login ξανά."
	}
};
var account$1 = {
	title: "Ο λογαριασμός μου",
	info: "Πληροφορίες λογαριασμού",
	security: "Ασφάλεια",
	messages: {
		emailNotVerified: "Το email σας δεν είναι επιβεβαιωμένο. Παρακαλούμε ελέγξτε τα εισερχόμενά σας.",
		mfaRecommendation: "Προτείνουμε να ενεργοποιήσετε την διπλή ταυτοποίηση (2FA) για επιπλέον ασφάλεια."
	},
	badges: {
		mfaActive: "2FA: Ενεργό",
		mfaInactive: "2FA: Ανενεργό"
	},
	actions: {
		enable2fa: "Ενεργοποίηση 2FA",
		settings: "Ρυθμίσεις"
	}
};
var settings$1 = {
	title: "Ρυθμίσεις",
	subtitle: "Προσαρμόστε τις προτιμήσεις και τις ρυθμίσεις του λογαριασμού σας",
	sections: {
		security: "Ασφάλεια & Προσωπικά Δεδομένα",
		notifications: "Ειδοποιήσεις",
		appearance: "Εμφάνιση",
		dangerZone: "Επικίνδυνη Ζώνη"
	},
	items: {
		changePassword: {
			title: "Αλλαγή Κωδικού",
			description: "Ενημερώστε τον κωδικό πρόσβασης"
		},
		twoFactor: {
			title: "Διπλή Ταυτοποίηση (2FA)",
			description: "Κατάσταση: {{status}}",
			statusActive: "Ενεργή",
			statusInactive: "Ανενεργή"
		},
		emailVerification: {
			title: "Επιβεβαίωση Email",
			description: "Κατάσταση: {{status}}",
			statusVerified: "Επιβεβαιωμένο",
			statusUnverified: "Μη επιβεβαιωμένο"
		},
		emailNotifications: {
			title: "Email Ειδοποιήσεις",
			description: "Λάβετε ειδοποιήσεις για σημαντικές ενέργειες"
		},
		smsNotifications: {
			title: "SMS Ειδοποιήσεις",
			description: "Λάβετε SMS για σημαντικές ενέργειες ασφαλείας"
		},
		theme: {
			title: "Θέμα Εφαρμογής",
			description: "Επιλέξτε φωτεινό ή σκοτεινό θέμα",
			options: {
				light: "Φωτεινό",
				dark: "Σκοτεινό",
				auto: "Αυτόματο"
			}
		},
		language: {
			title: "Γλώσσα",
			description: "Επιλέξτε την προτιμώμενη γλώσσα",
			options: {
				el: "Ελληνικά",
				en: "English"
			}
		},
		deleteAccount: {
			title: "Διαγραφή Λογαριασμού",
			description: "Διαγράψτε οριστικά τον λογαριασμό σας"
		}
	}
};
var data$1 = {
	title: "Τα Δεδομένα Μου",
	subtitle: "Δείτε και διαχειριστείτε όλα τα προσωπικά σας δεδομένα",
	personalInfo: "Προσωπικές Πληροφορίες",
	security: "Ασφάλεια",
	devices: "Συσκευές & Συνδέσεις",
	"export": "Εξαγωγή Δεδομένων",
	privacy: "Προστασία Δεδομένων",
	fields: {
		email: "Email",
		name: "Όνομα",
		displayName: "Όνομα Χρήστη",
		userId: "User ID",
		role: "Ρόλος",
		emailVerified: "Email Επιβεβαιωμένο",
		mfaEnabled: "2FA Ενεργοποιημένο",
		lastSignIn: "Τελευταία Σύνδεση",
		accountCreated: "Δημιουργία Λογαριασμού",
		currentDevice: "Τρέχουσα Συσκευή",
		ipAddress: "IP Address",
		connectionProvider: "Provider Σύνδεσης",
		notAvailable: "Μη διαθέσιμο",
		encrypted: "Κρυπτογραφημένο",
		webBrowser: "Web Browser"
	},
	exportFormats: {
		pdf: "Εξαγωγή σε PDF",
		json: "Εξαγωγή σε JSON",
		csv: "Εξαγωγή σε CSV"
	},
	exportDescription: "Μπορείτε να εξάγετε όλα τα προσωπικά σας δεδομένα σε διάφορες μορφές:",
	privacyPoints: {
		title: "Η προστασία των δεδομένων σας είναι προτεραιότητά μας.",
		encryption: "Όλα τα δεδομένα κρυπτογραφούνται κατά τη μετάδοση και αποθήκευση",
		noSharing: "Δεν μοιραζόμαστε προσωπικά δεδομένα με τρίτους",
		deleteAnytime: "Μπορείτε να διαγράψετε τον λογαριασμό σας ανά πάσα στιγμή",
		compliance: "Συμμορφώνεται με GDPR και τις ελληνικές νομοθεσίες"
	}
};
var roles$1 = {
	admin: "Διαχειριστής",
	broker: "Μεσίτης",
	builder: "Κατασκευαστής",
	"private": "Ιδιώτης"
};
var admin$3 = {
	roleManagement: {
		title: "Διαχείριση Ρόλων",
		subtitle: "Διαχείριση ρόλων χρηστών και ρυθμίσεων ασφαλείας",
		form: {
			title: "Ορισμός Ρόλου Χρήστη",
			description: "Εισάγετε τα στοιχεία του χρήστη για τροποποίηση του ρόλου του",
			emailHint: "Το email του χρήστη που θέλετε να τροποποιήσετε",
			roleHint: "Επιλέξτε το νέο ρόλο που θα ανατεθεί στον χρήστη"
		},
		info: {
			title: "Πληροφορίες Διαχείρισης",
			adminOnly: "Μόνο admin μπορεί να καλέσει τα functions διαχείρισης",
			clientRestrictions: "Ο πελάτης δεν γράφει claims απευθείας",
			mfaRefresh: "Η ανανέωση 2FA ελέγχει την τρέχουσα κατάσταση του χρήστη"
		}
	},
	actions: {
		setRole: "Ορισμός Ρόλου",
		refreshMfa: "Ανανέωση 2FA"
	},
	errors: {
		enterEmail: "Εισάγετε email χρήστη",
		roleSetFailed: "❌ Σφάλμα ορισμού ρόλου: {{error}}",
		mfaRefreshFailed: "❌ Σφάλμα ανανέωσης 2FA: {{error}}"
	},
	success: {
		roleSet: "✅ Ρόλος ορίστηκε: {{uid}} → {{role}}",
		mfaRefreshed: "✅ 2FA ανανεώθηκε: {{uid}} → {{status}}"
	},
	checking2FA: "Έλεγχος κατάστασης 2FA..."
};
var status$1 = {
	active: "Ενεργό",
	inactive: "Ανενεργό",
	verified: "Επιβεβαιωμένο",
	unverified: "Μη επιβεβαιωμένο",
	enabled: "Ενεργοποιημένο",
	disabled: "Απενεργοποιημένο"
};
var actions$1 = {
	save: "Αποθήκευση",
	cancel: "Ακύρωση",
	edit: "Επεξεργασία",
	"delete": "Διαγραφή",
	enable: "Ενεργοποίηση",
	disable: "Απενεργοποίηση",
	change: "Αλλαγή",
	manage: "Διαχείριση",
	verify: "Επιβεβαίωση"
};
var errors$1 = {
	required: "Αυτό το πεδίο είναι υποχρεωτικό",
	invalidEmail: "Μη έγκυρη διεύθυνση email",
	invalidPhone: "Μη έγκυρος αριθμός τηλεφώνου",
	passwordTooShort: "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες",
	passwordMismatch: "Οι κωδικοί δεν ταιριάζουν",
	authError: "Σφάλμα αυθεντικοποίησης",
	networkError: "Σφάλμα δικτύου",
	unknownError: "Άγνωστο σφάλμα",
	adminRequired: {
		title: "Απαιτείται Δικαίωμα Admin",
		description: "Απαγορεύεται. Μόνο admin μπορεί να δει αυτή τη σελίδα."
	}
};
var common$1 = {
	error: "Σφάλμα",
	processing: "Επεξεργασία..."
};
var notifications$1 = {
	loading: "Φόρτωση...",
	retry: "Επανάληψη",
	tryAgain: "Δοκιμάστε ξανά",
	somethingWentWrong: "Κάτι πήγε στραβά",
	dismiss: "Απόρριψη",
	ok: "ΟΚ",
	cancel: "Ακύρωση",
	types: {
		success: "Επιτυχία",
		warning: "Προειδοποίηση",
		error: "Σφάλμα",
		info: "Πληροφορία"
	},
	messages: {
		generalError: "Παρουσιάστηκε ένα απροσδόκητο σφάλμα",
		networkError: "Σφάλμα σύνδεσης δικτύου",
		operationComplete: "Η ενέργεια ολοκληρώθηκε επιτυχώς",
		operationFailed: "Η ενέργεια απέτυχε"
	}
};
var forms$1 = {
	validation: {
		required: "Αυτό το πεδίο είναι υποχρεωτικό"
	},
	labels: {
		email: "Διεύθυνση Email",
		name: "Όνομα",
		phone: "Τηλέφωνο",
		password: "Κωδικός Πρόσβασης",
		confirmPassword: "Επιβεβαίωση Κωδικού",
		role: "Ρόλος",
		status: "Κατάσταση"
	},
	placeholders: {
		email: "user@example.com",
		password: "Εισάγετε τον κωδικό σας",
		confirmPassword: "Επιβεβαιώστε τον κωδικό σας",
		displayName: "Εισάγετε το όνομά σας",
		enterValue: "Εισάγετε τιμή",
		selectRole: "Επιλέξτε ρόλο",
		search: "Αναζήτηση..."
	},
	hints: {
		emailPrivacy: "Δεν θα μοιραστούμε το email σας ποτέ",
		passwordRequirements: "Τουλάχιστον 8 χαρακτήρες, πεζά και κεφαλαία γράμματα",
		displayName: "Αυτό θα είναι το εμφανιζόμενο όνομά σας (προαιρετικό)"
	},
	select: {
		noOptions: "Δεν υπάρχουν επιλογές",
		clear: "Καθαρισμός",
		loading: "Φόρτωση..."
	}
};
var tables$1 = {
	selectAll: "Επιλογή όλων",
	selectNone: "Καθαρισμός επιλογών",
	selectRow: "Επιλογή γραμμής {{index}}",
	selectedCount: "{{count}} από {{total}} επιλεγμένα",
	noData: {
		title: "Δεν υπάρχουν δεδομένα",
		description: "Δεν βρέθηκαν εγγραφές για εμφάνιση"
	},
	search: {
		placeholder: "Αναζήτηση..."
	},
	pagination: {
		showing: "Εμφάνιση {{start}}-{{end}} από {{total}}",
		itemsPerPage: "Στοιχεία ανά σελίδα",
		previous: "Προηγούμενη",
		next: "Επόμενη"
	},
	headers: {
		name: "Όνομα",
		email: "Email",
		role: "Ρόλος",
		status: "Κατάσταση",
		actions: "Ενέργειες",
		createdAt: "Δημιουργήθηκε",
		updatedAt: "Ενημερώθηκε"
	}
};
var pipeline$1 = {
	newEntry: {
		title: "Νέα Καταχώριση"
	},
	category: {
		selection: {
			title: "Επιλέξτε Κατηγορία"
		},
		property: {
			title: "Ακίνητο",
			description: "Αναζητήστε ή διαφημίστε ακίνητα"
		},
		job: {
			title: "Εργασία",
			description: "Αναζητήστε ή διαφημίστε θέσεις εργασίας"
		}
	},
	intent: {
		selection: {
			title: "Επιλέξτε Πρόθεση"
		},
		offer: {
			title: "Προσφορά"
		},
		search: {
			title: "Αναζήτηση"
		}
	},
	preview: {
		ready: {
			title: "Έτοιμο για Αποθήκευση",
			description: "Η καταχώρισή σας είναι έτοιμη"
		},
		"continue": "Συνέχεια"
	}
};
var geoalert$1 = {
	title: "Layera GeoAlert",
	subtitle: "Προηγμένο σύστημα γεωγραφικών ειδοποιήσεων",
	geoCanvasReady: "Ο Geo Canvas είναι έτοιμος",
	professionalArchitecture: "Επαγγελματική αρχιτεκτονική με LEGO systems",
	enterGeoCanvas: "Είσοδος στον Geo Canvas",
	statusCheck: "Έλεγχος Κατάστασης",
	port: "Πόρτα",
	reactReady: "React 19 Έτοιμο",
	typescriptStrict: "TypeScript Strict Mode",
	independentApp: "Ανεξάρτητη Εφαρμογή",
	enterpriseArchitecture: "Enterprise Architecture",
	navigateToLayeraId: "Μετάβαση στο Layera ID",
	modularMicroservice: "Modular Microservice",
	crossAppNavigation: "Cross-App Navigation",
	readyForImplementation: "Έτοιμο για υλοποίηση"
};
var dashboard$1 = {
	overview: "Επισκόπηση κατάστασης λογαριασμού",
	userInfo: "Πληροφορίες Χρήστη",
	accountDetails: "Λεπτομέρειες Λογαριασμού",
	personalInformation: "Προσωπικές Πληροφορίες",
	quickActions: "Γρήγορες Ενέργειες",
	accountAge: "Ηλικία Λογαριασμού",
	daysSinceCreated: "Ημέρες από τη δημιουργία",
	emailStatus: "Κατάσταση Email",
	mfaStatus: "Κατάσταση MFA",
	accountRole: "Ρόλος Λογαριασμού",
	descriptions: {
		account: "Διαχειριστείτε τις ρυθμίσεις και τις πληροφορίες του προφίλ σας",
		settings: "Διαμορφώστε τις προτιμήσεις εφαρμογής και τις ρυθμίσεις ασφαλείας",
		data: "Δείτε και διαχειριστείτε τα δεδομένα και τις ρυθμίσεις απορρήτου σας",
		mfa: "Ενεργοποίηση πολυπαραγοντικής ταυτοποίησης για ενισχυμένη ασφάλεια"
	},
	actionDescriptions: {
		manageAccount: "Διαχειριστείτε τις ρυθμίσεις και τις πληροφορίες του προφίλ σας",
		configureSettings: "Διαμορφώστε τις προτιμήσεις εφαρμογής και τις ρυθμίσεις ασφαλείας",
		manageData: "Δείτε και διαχειριστείτε τα δεδομένα και τις ρυθμίσεις απορρήτου σας",
		enableMfa: "Ενεργοποίηση πολυπαραγοντικής ταυτοποίησης για ενισχυμένη ασφάλεια"
	},
	theme: {
		light: "Φωτεινό θέμα",
		dark: "Σκοτεινό θέμα",
		system: "Σύστημα"
	}
};
var elCommon = {
	app: app$1,
	navigation: navigation$1,
	auth: auth$1,
	mfa: mfa$1,
	account: account$1,
	settings: settings$1,
	data: data$1,
	roles: roles$1,
	admin: admin$3,
	status: status$1,
	actions: actions$1,
	errors: errors$1,
	common: common$1,
	notifications: notifications$1,
	forms: forms$1,
	tables: tables$1,
	pipeline: pipeline$1,
	geoalert: geoalert$1,
	dashboard: dashboard$1
};

var app = {
	name: "Layera",
	subtitle: "Enterprise Identity Management",
	welcome: "Welcome to Layera!",
	loading: "Loading...",
	languageSwitch: "Language"
};
var navigation = {
	dashboard: "Dashboard",
	account: "My Account",
	settings: "Settings",
	data: "Data",
	logout: "Logout",
	back: "Back",
	backToDashboard: "Back to Dashboard"
};
var auth = {
	login: "Login",
	register: "Register",
	email: "Email",
	password: "Password",
	confirmPassword: "Confirm Password",
	signInWithGoogle: "Sign in with Google",
	forgotPassword: "Forgot password?",
	noAccount: "Don't have an account?",
	hasAccount: "Already have an account?",
	signOut: "Sign Out"
};
var mfa = {
	title: "Enable 2FA",
	subtitle: "Protect your account with two-factor authentication via SMS. You will receive a code on your mobile every time you log in.",
	whyNeeded: {
		title: "Why do you need 2FA?",
		description: "Two-factor authentication adds an extra layer of security:",
		benefits: {
			passwordProtection: "Protection against password theft",
			secureAccess: "Secure access even from unknown devices",
			unauthorizedAlert: "Notification in case of unauthorized access"
		}
	},
	form: {
		phoneLabel: "Mobile Phone Number",
		phoneHint: "Enter the number with international code (e.g. +30 for Greece)",
		enableButton: "Enable 2FA"
	},
	prompts: {
		enterSmsCode: "Enter the SMS code:"
	},
	success: {
		enrollmentComplete: "2FA enrollment successful!"
	},
	errors: {
		enterPhone: "Enter phone number",
		operationNotAllowed: "SMS-based MFA is not enabled in Firebase Console. Please contact the administrator.",
		tooManyRequests: "Too many attempts. Try again later.",
		invalidPhoneNumber: "Invalid phone number. Use the format +30xxxxxxxxxx",
		requiresRecentLogin: "For security reasons, recent login is required. Please logout and login again."
	}
};
var account = {
	title: "My Account",
	info: "Account Information",
	security: "Security",
	messages: {
		emailNotVerified: "Your email is not verified. Please check your inbox.",
		mfaRecommendation: "We recommend enabling two-factor authentication (2FA) for additional security."
	},
	badges: {
		mfaActive: "2FA: Active",
		mfaInactive: "2FA: Inactive"
	},
	actions: {
		enable2fa: "Enable 2FA",
		settings: "Settings"
	}
};
var settings = {
	title: "Settings",
	subtitle: "Customize your preferences and account settings",
	sections: {
		security: "Security & Personal Data",
		notifications: "Notifications",
		appearance: "Appearance",
		dangerZone: "Danger Zone"
	},
	items: {
		changePassword: {
			title: "Change Password",
			description: "Update your access password"
		},
		twoFactor: {
			title: "Two-Factor Authentication (2FA)",
			description: "Status: {{status}}",
			statusActive: "Active",
			statusInactive: "Inactive"
		},
		emailVerification: {
			title: "Email Verification",
			description: "Status: {{status}}",
			statusVerified: "Verified",
			statusUnverified: "Unverified"
		},
		emailNotifications: {
			title: "Email Notifications",
			description: "Receive notifications for important actions"
		},
		smsNotifications: {
			title: "SMS Notifications",
			description: "Receive SMS for important security actions"
		},
		theme: {
			title: "Application Theme",
			description: "Choose light or dark theme",
			options: {
				light: "Light",
				dark: "Dark",
				auto: "Auto"
			}
		},
		language: {
			title: "Language",
			description: "Choose your preferred language",
			options: {
				el: "Ελληνικά",
				en: "English"
			}
		},
		deleteAccount: {
			title: "Delete Account",
			description: "Permanently delete your account"
		}
	}
};
var data = {
	title: "My Data",
	subtitle: "View and manage all your personal data",
	personalInfo: "Personal Information",
	security: "Security",
	devices: "Devices & Connections",
	"export": "Data Export",
	privacy: "Data Protection",
	fields: {
		email: "Email",
		name: "Name",
		displayName: "Display Name",
		userId: "User ID",
		role: "Role",
		emailVerified: "Email Verified",
		mfaEnabled: "2FA Enabled",
		lastSignIn: "Last Sign In",
		accountCreated: "Account Created",
		currentDevice: "Current Device",
		ipAddress: "IP Address",
		connectionProvider: "Connection Provider",
		notAvailable: "Not Available",
		encrypted: "Encrypted",
		webBrowser: "Web Browser"
	},
	exportFormats: {
		pdf: "Export to PDF",
		json: "Export to JSON",
		csv: "Export to CSV"
	},
	exportDescription: "You can export all your personal data in various formats:",
	privacyPoints: {
		title: "Protecting your data is our priority.",
		encryption: "All data is encrypted during transmission and storage",
		noSharing: "We do not share personal data with third parties",
		deleteAnytime: "You can delete your account at any time",
		compliance: "Complies with GDPR and Greek legislation"
	}
};
var roles = {
	admin: "Administrator",
	broker: "Broker",
	builder: "Builder",
	"private": "Private"
};
var admin$2 = {
	roleManagement: {
		title: "Role Management",
		subtitle: "Manage user roles and security settings",
		form: {
			title: "Set User Role",
			description: "Enter user details to modify their role",
			emailHint: "The email of the user you want to modify",
			roleHint: "Select the new role to assign to the user"
		},
		info: {
			title: "Management Information",
			adminOnly: "Only admin can call management functions",
			clientRestrictions: "Client does not write claims directly",
			mfaRefresh: "2FA refresh checks the user's current status"
		}
	},
	actions: {
		setRole: "Set Role",
		refreshMfa: "Refresh 2FA"
	},
	errors: {
		enterEmail: "Enter user email",
		roleSetFailed: "❌ Role set error: {{error}}",
		mfaRefreshFailed: "❌ 2FA refresh error: {{error}}"
	},
	success: {
		roleSet: "✅ Role set: {{uid}} → {{role}}",
		mfaRefreshed: "✅ 2FA refreshed: {{uid}} → {{status}}"
	},
	checking2FA: "Checking 2FA status..."
};
var status = {
	active: "Active",
	inactive: "Inactive",
	verified: "Verified",
	unverified: "Unverified",
	enabled: "Enabled",
	disabled: "Disabled"
};
var actions = {
	save: "Save",
	cancel: "Cancel",
	edit: "Edit",
	"delete": "Delete",
	enable: "Enable",
	disable: "Disable",
	change: "Change",
	manage: "Manage",
	verify: "Verify"
};
var errors = {
	required: "This field is required",
	invalidEmail: "Invalid email address",
	invalidPhone: "Invalid phone number",
	passwordTooShort: "Password must be at least 6 characters",
	passwordMismatch: "Passwords do not match",
	authError: "Authentication error",
	networkError: "Network error",
	unknownError: "Unknown error",
	adminRequired: {
		title: "Admin Access Required",
		description: "Access denied. Only admin can view this page."
	}
};
var common = {
	error: "Error",
	processing: "Processing..."
};
var notifications = {
	loading: "Loading...",
	retry: "Retry",
	tryAgain: "Try Again",
	somethingWentWrong: "Something Went Wrong",
	dismiss: "Dismiss",
	ok: "OK",
	cancel: "Cancel",
	types: {
		success: "Success",
		warning: "Warning",
		error: "Error",
		info: "Information"
	},
	messages: {
		generalError: "An unexpected error occurred",
		networkError: "Network connection error",
		operationComplete: "Operation completed successfully",
		operationFailed: "Operation failed"
	}
};
var forms = {
	validation: {
		required: "This field is required"
	},
	labels: {
		email: "Email Address",
		name: "Name",
		phone: "Phone",
		password: "Password",
		confirmPassword: "Confirm Password",
		role: "Role",
		status: "Status"
	},
	placeholders: {
		email: "user@example.com",
		password: "Enter your password",
		confirmPassword: "Confirm your password",
		displayName: "Enter your name",
		enterValue: "Enter value",
		selectRole: "Select role",
		search: "Search..."
	},
	hints: {
		emailPrivacy: "We'll never share your email",
		passwordRequirements: "At least 8 characters, upper and lowercase letters",
		displayName: "This will be your display name (optional)"
	},
	select: {
		noOptions: "No options available",
		clear: "Clear",
		loading: "Loading..."
	}
};
var tables = {
	selectAll: "Select all",
	selectNone: "Clear selection",
	selectRow: "Select row {{index}}",
	selectedCount: "{{count}} of {{total}} selected",
	noData: {
		title: "No data available",
		description: "No records found to display"
	},
	search: {
		placeholder: "Search..."
	},
	pagination: {
		showing: "Showing {{start}}-{{end}} of {{total}}",
		itemsPerPage: "Items per page",
		previous: "Previous",
		next: "Next"
	},
	headers: {
		name: "Name",
		email: "Email",
		role: "Role",
		status: "Status",
		actions: "Actions",
		createdAt: "Created",
		updatedAt: "Updated"
	}
};
var theme = {
	light: "Light",
	dark: "Dark",
	system: "System"
};
var pipeline = {
	newEntry: {
		title: "New Entry"
	},
	category: {
		selection: {
			title: "Select Category"
		},
		property: {
			title: "Property",
			description: "Search or advertise real estate"
		},
		job: {
			title: "Job",
			description: "Search or advertise job positions"
		}
	},
	intent: {
		selection: {
			title: "Select Intent"
		},
		offer: {
			title: "Offer"
		},
		search: {
			title: "Search"
		}
	},
	preview: {
		ready: {
			title: "Ready to Save",
			description: "Your entry is ready"
		},
		"continue": "Continue"
	}
};
var geoalert = {
	title: "Layera GeoAlert",
	subtitle: "Advanced Geographic Notifications System",
	geoCanvasReady: "Geo Canvas is Ready",
	professionalArchitecture: "Professional architecture with LEGO systems",
	enterGeoCanvas: "Enter Geo Canvas",
	statusCheck: "Status Check",
	port: "Port",
	reactReady: "React 19 Ready",
	typescriptStrict: "TypeScript Strict Mode",
	independentApp: "Independent Application",
	enterpriseArchitecture: "Enterprise Architecture",
	navigateToLayeraId: "Navigate to Layera ID",
	modularMicroservice: "Modular Microservice",
	crossAppNavigation: "Cross-App Navigation",
	readyForImplementation: "Ready for Implementation"
};
var dashboard = {
	overview: "Overview of your account status",
	userInfo: "User Information",
	accountDetails: "Account Details",
	personalInformation: "Personal Information",
	quickActions: "Quick Actions",
	accountAge: "Account Age",
	daysSinceCreated: "Days since created",
	emailStatus: "Email Status",
	mfaStatus: "MFA Status",
	accountRole: "Account Role",
	descriptions: {
		account: "Manage your account settings and profile information",
		settings: "Configure application preferences and security settings",
		data: "View and manage your data and privacy settings",
		mfa: "Enable multi-factor authentication for enhanced security"
	},
	actionDescriptions: {
		manageAccount: "Manage your account settings and profile information",
		configureSettings: "Configure application preferences and security settings",
		manageData: "View and manage your data and privacy settings",
		enableMfa: "Enable multi-factor authentication for enhanced security"
	}
};
var enCommon = {
	app: app,
	navigation: navigation,
	auth: auth,
	mfa: mfa,
	account: account,
	settings: settings,
	data: data,
	roles: roles,
	admin: admin$2,
	status: status,
	actions: actions,
	errors: errors,
	common: common,
	notifications: notifications,
	forms: forms,
	tables: tables,
	theme: theme,
	pipeline: pipeline,
	geoalert: geoalert,
	dashboard: dashboard
};

var title$1 = "Dashboard";
var welcome$1 = "Καλώς ήρθες, {{name}}!";
var quickActions$1 = {
	title: "Γρήγορες Ενέργειες",
	subtitle: "Πρόσβαση στις πιο σημαντικές λειτουργίες"
};
var cards$1 = {
	account: {
		title: "Ο λογαριασμός μου",
		description: "Διαχειριστείτε τις πληροφορίες του λογαριασμού σας",
		action: "Προβολή προφίλ"
	},
	settings: {
		title: "Ρυθμίσεις",
		description: "Προσαρμόστε τις προτιμήσεις και τις ρυθμίσεις ασφαλείας",
		action: "Άνοιγμα ρυθμίσεων"
	},
	data: {
		title: "Δεδομένα",
		description: "Διαχειριστείτε και εξάγετε τα προσωπικά σας δεδομένα",
		action: "Προβολή δεδομένων"
	},
	mfa: {
		title: "Ενεργοποίηση 2FA",
		description: "Βελτιώστε την ασφάλεια με διπλή ταυτοποίηση",
		action: "Ρύθμιση 2FA"
	}
};
var user$1 = {
	role: "Ρόλος: {{role}}",
	lastLogin: "Τελευταία σύνδεση: {{date}}",
	successfulLogin: "Συνδεθήκατε επιτυχώς με το email: {{email}}",
	username: "Όνομα χρήστη",
	usernameDisplay: "Όνομα χρήστη: {{name}}",
	info: "Πληροφορίες Χρήστη",
	security: {
		emailVerified: "Email επιβεβαιωμένο",
		emailNotVerified: "Email μη επιβεβαιωμένο",
		mfaEnabled: "2FA ενεργό",
		mfaDisabled: "2FA ανενεργό"
	}
};
var admin$1 = {
	roleManagement: "Διαχείριση ρόλων"
};
var elDashboard = {
	title: title$1,
	welcome: welcome$1,
	quickActions: quickActions$1,
	cards: cards$1,
	user: user$1,
	admin: admin$1
};

var title = "Dashboard";
var welcome = "Welcome, {{name}}!";
var quickActions = {
	title: "Quick Actions",
	subtitle: "Access to the most important functions"
};
var cards = {
	account: {
		title: "My Account",
		description: "Manage your account information",
		action: "View profile"
	},
	settings: {
		title: "Settings",
		description: "Customize preferences and security settings",
		action: "Open settings"
	},
	data: {
		title: "Data",
		description: "Manage and export your personal data",
		action: "View data"
	},
	mfa: {
		title: "Enable 2FA",
		description: "Improve security with two-factor authentication",
		action: "Setup 2FA"
	}
};
var user = {
	role: "Role: {{role}}",
	lastLogin: "Last login: {{date}}",
	successfulLogin: "Successfully logged in with email: {{email}}",
	username: "Username",
	usernameDisplay: "Username: {{name}}",
	info: "User Information",
	security: {
		emailVerified: "Email verified",
		emailNotVerified: "Email not verified",
		mfaEnabled: "2FA enabled",
		mfaDisabled: "2FA disabled"
	}
};
var admin = {
	roleManagement: "Role Management"
};
var enDashboard = {
	title: title,
	welcome: welcome,
	quickActions: quickActions,
	cards: cards,
	user: user,
	admin: admin
};

const defaultNS = 'common';
const namespaces = ['common', 'dashboard'];
const resources = {
    el: {
        common: elCommon,
        dashboard: elDashboard,
    },
    en: {
        common: enCommon,
        dashboard: enDashboard,
    },
};
const supportedLngs = ['el', 'en'];
const i18nConfig = {
    debug: process.env.NODE_ENV === 'development',
    // Default language
    lng: 'el',
    fallbackLng: 'el',
    // Supported languages
    supportedLngs,
    // Namespaces
    ns: namespaces,
    defaultNS,
    // Resources
    resources,
    // Interpolation options
    interpolation: {
        escapeValue: false, // React already escapes
    },
    // React specific options
    react: {
        useSuspense: false, // Disable suspense for SSR compatibility
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
    },
    // Language detection options
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        lookupLocalStorage: 'layera-language',
        caches: ['localStorage'],
    },
};
// Initialize i18next
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig);

/**
 * Custom hook for Layera-specific translations
 * Provides type-safe translation with automatic namespace handling
 */
function useLayeraTranslation(ns = defaultNS, options) {
    const { t, i18n, ready } = useTranslation(ns, {
        useSuspense: false,
        ...options,
    });
    /**
     * Change language with type safety
     */
    const changeLanguage = (lng) => {
        return i18n.changeLanguage(lng);
    };
    /**
     * Get current language
     */
    const currentLanguage = i18n.language;
    /**
     * Check if translation is ready
     */
    const isReady = ready;
    /**
     * Get all available languages
     */
    const availableLanguages = ['el', 'en'];
    /**
     * Format functions for common patterns
     */
    const formatters = {
        /**
         * Format role name
         */
        role: (role) => t(`roles.${role}`, { defaultValue: role }),
        /**
         * Format status
         */
        status: (status) => t(`status.${status}`, { defaultValue: status }),
        /**
         * Format action
         */
        action: (action) => t(`actions.${action}`, { defaultValue: action }),
        /**
         * Format error message
         */
        error: (error) => t(`errors.${error}`, { defaultValue: error }),
    };
    return {
        t,
        i18n,
        ready: isReady,
        changeLanguage,
        currentLanguage,
        availableLanguages,
        formatters,
    };
}

const languageLabels = {
    el: 'Ελληνικά',
    en: 'English',
};
const languageFlags = {
    el: '🇬🇷',
    en: '🇺🇸',
};
function LanguageSwitcher({ className = '', variant = 'dropdown', showFlags = true, align = 'right', }) {
    const { currentLanguage, changeLanguage, availableLanguages } = useLayeraTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const handleLanguageChange = (language) => {
        changeLanguage(language);
        setIsOpen(false);
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;
            if (!target.closest('.language-switcher-dropdown-container')) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);
    if (variant === 'dropdown') {
        return (jsxs("div", { className: `language-switcher-dropdown-container ${className} ${isOpen ? 'language-switcher--open' : ''}`, children: [jsxs("button", { type: "button", className: "language-switcher__trigger", onClick: () => setIsOpen(!isOpen), "aria-label": `Select language. Current: ${languageLabels[currentLanguage]}`, "aria-expanded": isOpen, "aria-haspopup": "menu", children: [jsx("span", { className: "language-switcher__icon", "aria-hidden": "true", children: showFlags && languageFlags[currentLanguage] }), jsx("span", { className: "language-switcher__label", children: languageLabels[currentLanguage] }), jsx("span", { className: "language-switcher__arrow", "aria-hidden": "true", children: "\u25BC" })] }), isOpen && (jsx("div", { className: `language-switcher__dropdown language-switcher__dropdown--${align}`, children: availableLanguages.map((lang) => (jsxs("button", { type: "button", className: `language-switcher__option ${currentLanguage === lang ? 'language-switcher__option--active' : ''}`, onClick: () => handleLanguageChange(lang), role: "menuitem", children: [jsx("span", { className: "language-switcher__option-icon", "aria-hidden": "true", children: showFlags && languageFlags[lang] }), jsx("span", { className: "language-switcher__option-label", children: languageLabels[lang] })] }, lang))) }))] }));
    }
    if (variant === 'toggle') {
        return (jsxs("button", { onClick: () => {
                const nextLang = currentLanguage === 'el' ? 'en' : 'el';
                handleLanguageChange(nextLang);
            }, className: `language-toggle ${className}`, "aria-label": "Toggle language", children: [showFlags && languageFlags[currentLanguage], " ", languageLabels[currentLanguage]] }));
    }
    if (variant === 'buttons') {
        return (jsx("div", { className: `language-buttons ${className}`, children: availableLanguages.map((lang) => (jsxs("button", { onClick: () => handleLanguageChange(lang), className: `language-button ${currentLanguage === lang ? 'active' : ''}`, "aria-label": `Switch to ${languageLabels[lang]}`, children: [showFlags && languageFlags[lang], " ", languageLabels[lang]] }, lang))) }));
    }
    return null;
}

const I18nContext = createContext(null);
/**
 * Enterprise-grade i18n provider for Layera applications
 *
 * Features:
 * - Type-safe language management
 * - Error handling and fallback mechanisms
 * - Loading states for async operations
 * - Event callbacks for language changes
 * - Persistent language storage
 * - Modular namespace support
 */
function LayeraI18nProvider({ children, fallbackLanguage = 'el', onLanguageChange, onError, }) {
    const [language, setLanguage] = useState(() => i18n.language || fallbackLanguage);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Set fallback language if current language is not supported
        if (!supportedLngs.includes(i18n.language)) {
            i18n.changeLanguage(fallbackLanguage);
        }
        // Subscribe to language changes
        const handleLanguageChanged = (lng) => {
            const supportedLng = lng;
            setLanguage(supportedLng);
            onLanguageChange?.(supportedLng);
        };
        i18n.on('languageChanged', handleLanguageChanged);
        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, [fallbackLanguage, onLanguageChange]);
    const changeLanguage = async (lng) => {
        try {
            setIsLoading(true);
            setError(null);
            await i18n.changeLanguage(lng);
            // Language state will be updated via the event listener
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to change language');
            setError(error);
            onError?.(error);
            // Revert to previous language on error
            await i18n.changeLanguage(language);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    const contextValue = {
        language,
        changeLanguage,
        isLoading,
        error,
        supportedLanguages: supportedLngs,
    };
    return (jsx(I18nextProvider, { i18n: i18n, children: jsx(I18nContext.Provider, { value: contextValue, children: children }) }));
}
/**
 * Hook to access i18n context value
 * Must be used within LayeraI18nProvider
 */
function useLayeraI18nContext() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useLayeraI18nContext must be used within LayeraI18nProvider');
    }
    return context;
}
/**
 * Higher-order component for easy i18n integration
 */
function withLayeraI18n(Component, options) {
    return function WrappedComponent(props) {
        return (jsx(LayeraI18nProvider, { ...options, children: jsx(Component, { ...props }) }));
    };
}

export { LanguageSwitcher, LayeraI18nProvider, defaultNS, i18nConfig, namespaces, supportedLngs, useLayeraI18nContext, useLayeraTranslation, withLayeraI18n };
//# sourceMappingURL=index.js.map
