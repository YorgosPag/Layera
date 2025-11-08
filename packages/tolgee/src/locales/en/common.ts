/**
 * 🇺🇸 SINGLE SOURCE OF TRUTH - English translations
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ - Αγγλικές μεταφράσεις
 * Enterprise TypeScript translations for Layera ecosystem
 */

// 🎯 IMPORT SINGLE SOURCE OF TRUTH - from @layera/constants
import { DEMO_ACCOUNT_DATA } from '@layera/constants';

// Helper function for English month formatting
const getEnglishMonth = (monthNumber: number): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthNumber - 1];
};

export const enTranslations = {
  // Authentication - Login and Registration
  "auth": {
    "login": "Login",
    "signInWithGoogle": "Sign in with Google",
    "forgotPassword": "Forgot Password",
    "noAccount": "Don't have an account?",
    "register": "Register"
  },
  "forms": {
    "labels": {
      "email": "Email",
      "password": "Password"
    },
    "placeholders": {
      "email": "Enter your email",
      "password": "Enter your password"
    }
  },
  // App & Dashboard - Application and Dashboard
  "app": {
    "name": "Layera",
    "subtitle": "Real Estate & Employment Platform"
  },
  "dashboard": {
    "welcome": "Welcome",
    "user": {
      "successfulLogin": "Successful login",
      "info": "User Information"
    },
    "overview": "Overview",
    "emailStatus": "Email Status",
    "mfaStatus": "MFA Status",
    "accountAge": "Account Age",
    "accountRole": "Account Role",
    "daysSinceCreated": "days since created",
    "accountDetails": "Account Details",
    "personalInformation": "Personal Information",
    "quickActions": {
      "title": "Quick Actions"
    },
    "cards": {
      "mfa": {
        "title": "Account Security"
      }
    },
    "actionDescriptions": {
      "enableMfa": "Enable multi-factor authentication"
    }
  },
  "data": {
    "title": "Account Data",
    "subtitle": "Manage and export your personal data",
    "personalInfo": "Personal Information",
    "security": "Security",
    "fields": {
      "email": DEMO_ACCOUNT_DATA.USER_INFO.EMAIL,
      "displayName": DEMO_ACCOUNT_DATA.USER_INFO.DISPLAY_NAME,
      "emailVerified": "Verified",
      "mfaEnabled": "Disabled",
      "role": "Private",
      "userId": DEMO_ACCOUNT_DATA.USER_INFO.USER_ID,
      "accountCreated": `${getEnglishMonth(DEMO_ACCOUNT_DATA.ACCOUNT_CREATION.MONTH)} ${DEMO_ACCOUNT_DATA.ACCOUNT_CREATION.DAY}, ${DEMO_ACCOUNT_DATA.ACCOUNT_CREATION.YEAR}, ${DEMO_ACCOUNT_DATA.ACCOUNT_CREATION.HOUR}:${String(DEMO_ACCOUNT_DATA.ACCOUNT_CREATION.MINUTE).padStart(2, '0')}:${String(DEMO_ACCOUNT_DATA.ACCOUNT_CREATION.SECOND).padStart(2, '0')} PM`,
      "lastSignIn": `${getEnglishMonth(DEMO_ACCOUNT_DATA.LAST_SIGNIN.MONTH)} ${DEMO_ACCOUNT_DATA.LAST_SIGNIN.DAY}, ${DEMO_ACCOUNT_DATA.LAST_SIGNIN.YEAR}, ${DEMO_ACCOUNT_DATA.LAST_SIGNIN.HOUR}:${DEMO_ACCOUNT_DATA.LAST_SIGNIN.MINUTE}:${String(DEMO_ACCOUNT_DATA.LAST_SIGNIN.SECOND).padStart(2, '0')} PM`
    },
    "export": "Data Export",
    "exportDescription": "Download all your personal data in various formats",
    "exportFormats": {
      "pdf": "PDF Report",
      "json": "JSON Data",
      "csv": "CSV Spreadsheet"
    },
    "privacy": "Data Privacy Protection",
    "privacyPoints": {
      "title": "Privacy Commitments",
      "encryption": "Data encryption",
      "noSharing": "No sharing with third parties",
      "deleteAnytime": "Delete anytime",
      "compliance": "GDPR/CCPA compliance"
    }
  },
  "navigation": {
    "logout": "Logout",
    "account": "Account",
    "settings": "Settings",
    "data": "Data",
    "backToDashboard": "Back to Dashboard"
  },
  "account": {
    "title": "Account",
    "info": "Account Information",
    "security": "Account Security",
    "actions": {
      "settings": "Settings",
      "enable2fa": "Enable 2FA"
    },
    "messages": {
      "mfaRecommendation": "Multi-factor authentication is recommended for enhanced security"
    },
    "badges": {
      "mfaInactive": "MFA Inactive"
    }
  },
  "status": {
    "verified": "Verified",
    "disabled": "Disabled"
  },
  "roles": {
    "private": "Private"
  },
  "settings": {
    "title": "Settings",
    "subtitle": "Manage your account preferences",
    "sections": {
      "security": "Security",
      "notifications": "Notifications",
      "appearance": "Appearance"
    },
    "items": {
      "changePassword": {
        "title": "Change Password",
        "description": "Update your account password"
      },
      "twoFactor": {
        "title": "Two-Factor Authentication",
        "description": "Add an extra layer of security"
      },
      "emailVerification": {
        "title": "Email Verification",
        "description": "Verify your email address"
      },
      "emailNotifications": {
        "title": "Email Notifications",
        "description": "Manage email notifications"
      },
      "smsNotifications": {
        "title": "SMS Notifications",
        "description": "Manage SMS notifications"
      },
      "theme": {
        "title": "App Theme",
        "description": "Choose light or dark theme",
        "light": "Light",
        "dark": "Dark",
        "system": "System (Auto)"
      },
      "language": {
        "title": "Language",
        "description": "Select your preferred language"
      }
    }
  },
  "actions": {
    "change": "Change",
    "enable": "Enable",
    "manage": "Manage",
    "skip": "Skip"
  },
  "mfa": {
    "title": "Multi-Factor Authentication (MFA)",
    "subtitle": "Protect your account with an additional layer of security",
    "whyNeeded": {
      "title": "Why do you need MFA?",
      "description": "MFA adds extra protection to your account",
      "benefits": {
        "passwordProtection": "Protection from stolen passwords",
        "secureAccess": "Secure access from anywhere",
        "unauthorizedAlert": "Alert for unauthorized access attempts"
      }
    },
    "form": {
      "enableButton": "Enable MFA",
      "phoneLabel": "Phone Number",
      "phoneHint": "Enter your phone number to receive SMS verification codes"
    }
  },

  // GeoAlert Application - GeoAlert Application
  "geoalert": {
    "title": "GeoAlert - Mapping Platform",
    "subtitle": "Advanced mapping application with professional architecture",
    "geoCanvasReady": "GeoCanvas Ready",
    "professionalArchitecture": "Professional Architecture",
    "enterGeoCanvas": "Enter GeoCanvas",
    "statusCheck": "Status Check",
    "port": "Port",
    "reactReady": "React Ready",
    "typescriptStrict": "TypeScript Strict",
    "independentApp": "Independent App",
    "enterpriseArchitecture": "Enterprise Architecture",
    "navigateToLayeraId": "Navigate to Layera ID",
    "modularMicroservice": "Modular Microservice",
    "crossAppNavigation": "Cross-App Navigation",
    "readyForImplementation": "Ready for Implementation"
  },

  // Core sections - main categories needed for GeoAlert
  "propertyType": {
    "title": "Property Type",
    "subtitle": "Select the type of property you want to list",
    "placeholder": "Select property type...",
    // Residential
    "apartment": "Apartment",
    "studio": "Studio",
    "maisonette": "Maisonette",
    "house": "House",
    "villa": "Villa",
    "cottage": "Cottage",
    "penthouse": "Penthouse",
    "loft": "Loft",
    // Commercial
    "store": "Store",
    "office": "Office",
    "warehouse": "Warehouse",
    "factory": "Factory",
    // Land & Plots
    "residential_plot": "Residential Plot",
    "commercial_plot": "Commercial Plot",
    "agricultural_land": "Agricultural Land",
    "forest_land": "Forest Land",
    "land": "Land",
    // Special
    "garage": "Garage",
    "parking_space": "Parking Space",
    "storage_unit": "Storage Unit",
    "basement": "Basement",
    "rooftop": "Rooftop",
    "descriptions": {
      "apartment": "Residential unit in complex",
      "studio": "Small residence",
      "maisonette": "Two-story residence",
      "house": "Independent residence",
      "villa": "Luxury residence",
      "cottage": "Country residence",
      "penthouse": "Top-floor residence",
      "loft": "Open living space",
      "office": "Professional space",
      "store": "Commercial space",
      "warehouse": "Storage space",
      "factory": "Industrial space",
      "residential_plot": "Land for residential construction",
      "commercial_plot": "Land for commercial use",
      "agricultural_land": "Land for farming",
      "forest_land": "Forest area",
      "land": "Land for construction",
      "garage": "Enclosed parking space",
      "parking_space": "Vehicle parking spot",
      "storage_unit": "Storage space for items",
      "basement": "Underground space",
      "rooftop": "Building rooftop"
    }
  },
  "occupation": {
    "title": "Occupation Selection",
    "subtitle": "Search and select your profession from the European ESCO database",
    "search": {
      "placeholder": "Search occupation (e.g. programmer, engineer...)"
    },
    "noResults": "No results found",
    "loading": "Loading occupations...",
    "selectOccupation": "Select occupation"
  },
  "intent": {
    "offer": "Offer",
    "search": "Search"
  },
  "pipeline": {
    "category": {
      "job": {
        "title": "Job"
      },
      "property": {
        "title": "Property"
      }
    }
  },
  "complete": {
    "finish": {
      "title": "Complete",
      "description": "Process completed successfully"
    },
    "success": {
      "title": "Success"
    },
    "back": {
      "title": "Back"
    }
  },
  "propertyDetails": {
    "title": "Property Details"
  },
  "property-details": {
    "fill-details": "Fill in the details",
    "continue-without-details": "Continue without details"
  },
  "test": {
    "panel": {
      "title": "LEGO Systems Test Panel",
      "success": "Test Success",
      "error": "Test Error",
      "info": "Test Info",
      "loading": "Test Loading"
    }
  },
  "common": {
    "error": "Error",
    "processing": "Processing...",
    "title": "Title",
    "subtitle": "Subtitle",
    "newEntry": "New Entry"
  },
  "quickSearch": {
    "title": "Quick Management",
    "subtitle": "List or search for properties and jobs easily",
    "helpText": "Quick selection with only 3-4 clicks",
    "intent": {
      "offer": "Offer",
      "search": "Search"
    },
    "kind": {
      "property": "Property",
      "job": "Job"
    },
    "purpose": {
      "sell": "Sale",
      "rent": "Rent"
    },
    "timeframe": {
      "now": "Now",
      "future": "Future"
    },
    "labels": {
      "intentQuestion": "What do you want to do?",
      "intentDescription": "Choose whether you want to offer (list) or search",
      "kindQuestion": "What type of listing?",
      "kindDescription": "Properties for sale/rent or job positions",
      "purposeQuestion": "Property transaction type:",
      "purposeDescription": "Sale or rental of property (shown only for properties)",
      "timeframeQuestion": "Timeframe:",
      "timeframeDescription": "Immediately available/needed or for future use"
    },
    "detailedLabels": {
      "intentOptions": {
        "offer": "Offer - List a property or job position I have available",
        "search": "Search - Look for a property or job I need"
      },
      "kindOptions": {
        "property": "Property - Houses, apartments, offices, stores",
        "job": "Job - Employment positions and career opportunities"
      },
      "purposeOptions": {
        "sell": "Sale - Transfer of ownership with payment",
        "rent": "Rent - Lease agreement with monthly payments"
      },
      "timeframeOptions": {
        "now": "Now - Available or needed immediately",
        "future": "Future - Planned for later"
      }
    },
    "cta": "View Results",
    "validation": {
      "propertyPurposeRequired": "Please select sale or rent for properties"
    },
    "security": {
      "dataProtection": "We don't share your data",
      "privateListings": "Secure private listings",
      "noSpam": "No spam - ever",
      "gdprCompliant": "GDPR Compliant",
      "encryptedData": "Encrypted data"
    },
    "actions": {
      "close": "Close",
      "closeTooltip": "Exit quick management"
    },
    "nextStepHints": {
      "afterIntent": "Next: Choose category (property or job)",
      "afterKind": {
        "property": "Next: Transaction type (sale or rent)",
        "job": "Next: Availability timeframe"
      },
      "afterPurpose": "Next: Availability timeframe",
      "final": "Ready! Click to view results"
    }
  },
  "categorySelection": {
    "title": "Category Selection"
  },
  "categories": {
    "properties": {
      "title": "Properties",
      "description": "List a property for sale or rent, or search for a property to buy or rent"
    },
    "jobs": {
      "title": "Jobs",
      "description": "Offer a job position or create a listing to search for employment"
    }
  },
  "workflow": {
    "titles": {
      "property": {
        "offer": {
          "sell": "Property Listing for Sale",
          "rent": "Property Listing for Rent"
        },
        "search": {
          "buy": "Property Search for Purchase",
          "rent": "Property Search for Rent"
        }
      },
      "job": {
        "offer": "Job Position Listing",
        "search": "Job Search"
      },
      "default": "Next Steps"
    },
    "subtitles": {
      "urgency": {
        "now": "immediate",
        "future": "future"
      },
      "template": "Manage your {{urgency}} need quickly and easily"
    },
    "preview": {
      "title": "Next Steps",
      "steps": "steps"
    },
    "property": {
      "offer": {
        "propertyType": {
          "title": "Property Type",
          "description": "Select your property type",
          "duration": "~1 min"
        },
        "location": {
          "title": "Location",
          "description": "Mark the location on the map",
          "duration": "~2 mins"
        },
        "photos": {
          "title": "Photos",
          "description": "Upload property photos",
          "duration": "~3 mins"
        },
        "details": {
          "title": "Details",
          "description": "Fill in property characteristics",
          "duration": "~2 mins"
        },
        "description": {
          "title": "Description",
          "description": "Write property description",
          "duration": "~3 mins"
        },
        "pricing": {
          "title": "Price",
          "description": "Set sale/rental price",
          "duration": "~1 min"
        }
      },
      "search": {
        "location": {
          "title": "Search Area",
          "description": "Select areas of interest",
          "duration": "~2 mins"
        },
        "basics": {
          "title": "Basic Criteria",
          "description": "Property type and characteristics",
          "duration": "~2 mins"
        },
        "budget": {
          "title": "Budget",
          "description": "Set your price range",
          "duration": "~1 min"
        },
        "timeframe": {
          "title": "Timeframe",
          "description": "When do you need to find a property",
          "duration": "~1 min"
        }
      }
    },
    "job": {
      "offer": {
        "jobType": {
          "title": "Job Type",
          "description": "Describe the job position",
          "duration": "~2 mins"
        },
        "company": {
          "title": "Company",
          "description": "Company details and work environment",
          "duration": "~3 mins"
        },
        "requirements": {
          "title": "Requirements",
          "description": "Qualifications and experience needed",
          "duration": "~3 mins"
        },
        "description": {
          "title": "Job Description",
          "description": "Detailed description of responsibilities",
          "duration": "~4 mins"
        },
        "salary": {
          "title": "Compensation",
          "description": "Salary and benefits",
          "duration": "~2 mins"
        }
      },
      "search": {
        "profile": {
          "title": "Profile",
          "description": "Profile details and career goals",
          "duration": "~3 mins"
        },
        "cv": {
          "title": "CV",
          "description": "Upload and process CV",
          "duration": "~5 mins"
        },
        "experience": {
          "title": "Experience",
          "description": "Previous work experience",
          "duration": "~4 mins"
        },
        "availability": {
          "title": "Availability",
          "description": "When can you start working",
          "duration": "~1 min"
        }
      }
    },
    "actions": {
      "backToQuickSearch": "← Back to Search",
      "startWorkflow": "Start Now"
    },
    "security": {
      "dataProtection": "Data Protection",
      "encrypted": "Encrypted"
    }
  }
} as const;

export default enTranslations;