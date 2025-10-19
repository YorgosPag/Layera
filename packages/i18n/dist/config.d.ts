import i18n from 'i18next';
export declare const defaultNS = "common";
export declare const namespaces: readonly ["common", "dashboard"];
export declare const resources: {
    readonly el: {
        readonly common: {
            app: {
                name: string;
                subtitle: string;
                welcome: string;
                loading: string;
                languageSwitch: string;
            };
            navigation: {
                dashboard: string;
                account: string;
                settings: string;
                data: string;
                logout: string;
                back: string;
                backToDashboard: string;
            };
            auth: {
                login: string;
                register: string;
                email: string;
                password: string;
                confirmPassword: string;
                signInWithGoogle: string;
                forgotPassword: string;
                noAccount: string;
                hasAccount: string;
                signOut: string;
            };
            mfa: {
                title: string;
                subtitle: string;
                whyNeeded: {
                    title: string;
                    description: string;
                    benefits: {
                        passwordProtection: string;
                        secureAccess: string;
                        unauthorizedAlert: string;
                    };
                };
                form: {
                    phoneLabel: string;
                    phoneHint: string;
                    enableButton: string;
                };
                prompts: {
                    enterSmsCode: string;
                };
                success: {
                    enrollmentComplete: string;
                };
                errors: {
                    enterPhone: string;
                    operationNotAllowed: string;
                    tooManyRequests: string;
                    invalidPhoneNumber: string;
                    requiresRecentLogin: string;
                };
            };
            account: {
                title: string;
                info: string;
                security: string;
                messages: {
                    emailNotVerified: string;
                    mfaRecommendation: string;
                };
                badges: {
                    mfaActive: string;
                    mfaInactive: string;
                };
                actions: {
                    enable2fa: string;
                    settings: string;
                };
            };
            settings: {
                title: string;
                subtitle: string;
                sections: {
                    security: string;
                    notifications: string;
                    appearance: string;
                    dangerZone: string;
                };
                items: {
                    changePassword: {
                        title: string;
                        description: string;
                    };
                    twoFactor: {
                        title: string;
                        description: string;
                        statusActive: string;
                        statusInactive: string;
                    };
                    emailVerification: {
                        title: string;
                        description: string;
                        statusVerified: string;
                        statusUnverified: string;
                    };
                    emailNotifications: {
                        title: string;
                        description: string;
                    };
                    smsNotifications: {
                        title: string;
                        description: string;
                    };
                    theme: {
                        title: string;
                        description: string;
                        options: {
                            light: string;
                            dark: string;
                            auto: string;
                        };
                    };
                    language: {
                        title: string;
                        description: string;
                        options: {
                            el: string;
                            en: string;
                        };
                    };
                    deleteAccount: {
                        title: string;
                        description: string;
                    };
                };
            };
            data: {
                title: string;
                subtitle: string;
                personalInfo: string;
                security: string;
                devices: string;
                export: string;
                privacy: string;
                fields: {
                    email: string;
                    name: string;
                    displayName: string;
                    userId: string;
                    role: string;
                    emailVerified: string;
                    mfaEnabled: string;
                    lastSignIn: string;
                    accountCreated: string;
                    currentDevice: string;
                    ipAddress: string;
                    connectionProvider: string;
                    notAvailable: string;
                    encrypted: string;
                    webBrowser: string;
                };
                exportFormats: {
                    pdf: string;
                    json: string;
                    csv: string;
                };
                exportDescription: string;
                privacyPoints: {
                    title: string;
                    encryption: string;
                    noSharing: string;
                    deleteAnytime: string;
                    compliance: string;
                };
            };
            roles: {
                admin: string;
                broker: string;
                builder: string;
                private: string;
            };
            admin: {
                roleManagement: {
                    title: string;
                    subtitle: string;
                    form: {
                        title: string;
                        description: string;
                        emailHint: string;
                        roleHint: string;
                    };
                    info: {
                        title: string;
                        adminOnly: string;
                        clientRestrictions: string;
                        mfaRefresh: string;
                    };
                };
                actions: {
                    setRole: string;
                    refreshMfa: string;
                };
                errors: {
                    enterEmail: string;
                    roleSetFailed: string;
                    mfaRefreshFailed: string;
                };
                success: {
                    roleSet: string;
                    mfaRefreshed: string;
                };
                checking2FA: string;
            };
            status: {
                active: string;
                inactive: string;
                verified: string;
                unverified: string;
                enabled: string;
                disabled: string;
            };
            actions: {
                save: string;
                cancel: string;
                edit: string;
                delete: string;
                enable: string;
                disable: string;
                change: string;
                manage: string;
                verify: string;
            };
            errors: {
                required: string;
                invalidEmail: string;
                invalidPhone: string;
                passwordTooShort: string;
                passwordMismatch: string;
                authError: string;
                networkError: string;
                unknownError: string;
                adminRequired: {
                    title: string;
                    description: string;
                };
            };
            common: {
                error: string;
                processing: string;
            };
            notifications: {
                loading: string;
                retry: string;
                tryAgain: string;
                somethingWentWrong: string;
                dismiss: string;
                ok: string;
                cancel: string;
                types: {
                    success: string;
                    warning: string;
                    error: string;
                    info: string;
                };
                messages: {
                    generalError: string;
                    networkError: string;
                    operationComplete: string;
                    operationFailed: string;
                };
            };
            forms: {
                validation: {
                    required: string;
                };
                labels: {
                    email: string;
                    name: string;
                    phone: string;
                    password: string;
                    confirmPassword: string;
                    role: string;
                    status: string;
                };
                placeholders: {
                    email: string;
                    password: string;
                    confirmPassword: string;
                    displayName: string;
                    enterValue: string;
                    selectRole: string;
                    search: string;
                };
                hints: {
                    emailPrivacy: string;
                    passwordRequirements: string;
                    displayName: string;
                };
                select: {
                    noOptions: string;
                    clear: string;
                    loading: string;
                };
            };
            tables: {
                selectAll: string;
                selectNone: string;
                selectRow: string;
                selectedCount: string;
                noData: {
                    title: string;
                    description: string;
                };
                search: {
                    placeholder: string;
                };
                pagination: {
                    showing: string;
                    itemsPerPage: string;
                    previous: string;
                    next: string;
                };
                headers: {
                    name: string;
                    email: string;
                    role: string;
                    status: string;
                    actions: string;
                    createdAt: string;
                    updatedAt: string;
                };
            };
            pipeline: {
                newEntry: {
                    title: string;
                };
                category: {
                    selection: {
                        title: string;
                    };
                    property: {
                        title: string;
                        description: string;
                    };
                    job: {
                        title: string;
                        description: string;
                    };
                };
                intent: {
                    selection: {
                        title: string;
                    };
                    offer: {
                        title: string;
                    };
                    search: {
                        title: string;
                    };
                };
                preview: {
                    ready: {
                        title: string;
                        description: string;
                    };
                    continue: string;
                };
            };
            geoalert: {
                title: string;
                subtitle: string;
                geoCanvasReady: string;
                professionalArchitecture: string;
                enterGeoCanvas: string;
                statusCheck: string;
                port: string;
                reactReady: string;
                typescriptStrict: string;
                independentApp: string;
                enterpriseArchitecture: string;
                navigateToLayeraId: string;
                modularMicroservice: string;
                crossAppNavigation: string;
                readyForImplementation: string;
            };
            dashboard: {
                overview: string;
                userInfo: string;
                accountDetails: string;
                personalInformation: string;
                quickActions: string;
                accountAge: string;
                daysSinceCreated: string;
                emailStatus: string;
                mfaStatus: string;
                accountRole: string;
                descriptions: {
                    account: string;
                    settings: string;
                    data: string;
                    mfa: string;
                };
                actionDescriptions: {
                    manageAccount: string;
                    configureSettings: string;
                    manageData: string;
                    enableMfa: string;
                };
                theme: {
                    light: string;
                    dark: string;
                    system: string;
                };
            };
        };
        readonly dashboard: {
            title: string;
            welcome: string;
            quickActions: {
                title: string;
                subtitle: string;
            };
            cards: {
                account: {
                    title: string;
                    description: string;
                    action: string;
                };
                settings: {
                    title: string;
                    description: string;
                    action: string;
                };
                data: {
                    title: string;
                    description: string;
                    action: string;
                };
                mfa: {
                    title: string;
                    description: string;
                    action: string;
                };
            };
            user: {
                role: string;
                lastLogin: string;
                successfulLogin: string;
                username: string;
                usernameDisplay: string;
                info: string;
                security: {
                    emailVerified: string;
                    emailNotVerified: string;
                    mfaEnabled: string;
                    mfaDisabled: string;
                };
            };
            admin: {
                roleManagement: string;
            };
        };
    };
    readonly en: {
        readonly common: {
            app: {
                name: string;
                subtitle: string;
                welcome: string;
                loading: string;
                languageSwitch: string;
            };
            navigation: {
                dashboard: string;
                account: string;
                settings: string;
                data: string;
                logout: string;
                back: string;
                backToDashboard: string;
            };
            auth: {
                login: string;
                register: string;
                email: string;
                password: string;
                confirmPassword: string;
                signInWithGoogle: string;
                forgotPassword: string;
                noAccount: string;
                hasAccount: string;
                signOut: string;
            };
            mfa: {
                title: string;
                subtitle: string;
                whyNeeded: {
                    title: string;
                    description: string;
                    benefits: {
                        passwordProtection: string;
                        secureAccess: string;
                        unauthorizedAlert: string;
                    };
                };
                form: {
                    phoneLabel: string;
                    phoneHint: string;
                    enableButton: string;
                };
                prompts: {
                    enterSmsCode: string;
                };
                success: {
                    enrollmentComplete: string;
                };
                errors: {
                    enterPhone: string;
                    operationNotAllowed: string;
                    tooManyRequests: string;
                    invalidPhoneNumber: string;
                    requiresRecentLogin: string;
                };
            };
            account: {
                title: string;
                info: string;
                security: string;
                messages: {
                    emailNotVerified: string;
                    mfaRecommendation: string;
                };
                badges: {
                    mfaActive: string;
                    mfaInactive: string;
                };
                actions: {
                    enable2fa: string;
                    settings: string;
                };
            };
            settings: {
                title: string;
                subtitle: string;
                sections: {
                    security: string;
                    notifications: string;
                    appearance: string;
                    dangerZone: string;
                };
                items: {
                    changePassword: {
                        title: string;
                        description: string;
                    };
                    twoFactor: {
                        title: string;
                        description: string;
                        statusActive: string;
                        statusInactive: string;
                    };
                    emailVerification: {
                        title: string;
                        description: string;
                        statusVerified: string;
                        statusUnverified: string;
                    };
                    emailNotifications: {
                        title: string;
                        description: string;
                    };
                    smsNotifications: {
                        title: string;
                        description: string;
                    };
                    theme: {
                        title: string;
                        description: string;
                        options: {
                            light: string;
                            dark: string;
                            auto: string;
                        };
                    };
                    language: {
                        title: string;
                        description: string;
                        options: {
                            el: string;
                            en: string;
                        };
                    };
                    deleteAccount: {
                        title: string;
                        description: string;
                    };
                };
            };
            data: {
                title: string;
                subtitle: string;
                personalInfo: string;
                security: string;
                devices: string;
                export: string;
                privacy: string;
                fields: {
                    email: string;
                    name: string;
                    displayName: string;
                    userId: string;
                    role: string;
                    emailVerified: string;
                    mfaEnabled: string;
                    lastSignIn: string;
                    accountCreated: string;
                    currentDevice: string;
                    ipAddress: string;
                    connectionProvider: string;
                    notAvailable: string;
                    encrypted: string;
                    webBrowser: string;
                };
                exportFormats: {
                    pdf: string;
                    json: string;
                    csv: string;
                };
                exportDescription: string;
                privacyPoints: {
                    title: string;
                    encryption: string;
                    noSharing: string;
                    deleteAnytime: string;
                    compliance: string;
                };
            };
            roles: {
                admin: string;
                broker: string;
                builder: string;
                private: string;
            };
            admin: {
                roleManagement: {
                    title: string;
                    subtitle: string;
                    form: {
                        title: string;
                        description: string;
                        emailHint: string;
                        roleHint: string;
                    };
                    info: {
                        title: string;
                        adminOnly: string;
                        clientRestrictions: string;
                        mfaRefresh: string;
                    };
                };
                actions: {
                    setRole: string;
                    refreshMfa: string;
                };
                errors: {
                    enterEmail: string;
                    roleSetFailed: string;
                    mfaRefreshFailed: string;
                };
                success: {
                    roleSet: string;
                    mfaRefreshed: string;
                };
                checking2FA: string;
            };
            status: {
                active: string;
                inactive: string;
                verified: string;
                unverified: string;
                enabled: string;
                disabled: string;
            };
            actions: {
                save: string;
                cancel: string;
                edit: string;
                delete: string;
                enable: string;
                disable: string;
                change: string;
                manage: string;
                verify: string;
            };
            errors: {
                required: string;
                invalidEmail: string;
                invalidPhone: string;
                passwordTooShort: string;
                passwordMismatch: string;
                authError: string;
                networkError: string;
                unknownError: string;
                adminRequired: {
                    title: string;
                    description: string;
                };
            };
            common: {
                error: string;
                processing: string;
            };
            notifications: {
                loading: string;
                retry: string;
                tryAgain: string;
                somethingWentWrong: string;
                dismiss: string;
                ok: string;
                cancel: string;
                types: {
                    success: string;
                    warning: string;
                    error: string;
                    info: string;
                };
                messages: {
                    generalError: string;
                    networkError: string;
                    operationComplete: string;
                    operationFailed: string;
                };
            };
            forms: {
                validation: {
                    required: string;
                };
                labels: {
                    email: string;
                    name: string;
                    phone: string;
                    password: string;
                    confirmPassword: string;
                    role: string;
                    status: string;
                };
                placeholders: {
                    email: string;
                    password: string;
                    confirmPassword: string;
                    displayName: string;
                    enterValue: string;
                    selectRole: string;
                    search: string;
                };
                hints: {
                    emailPrivacy: string;
                    passwordRequirements: string;
                    displayName: string;
                };
                select: {
                    noOptions: string;
                    clear: string;
                    loading: string;
                };
            };
            tables: {
                selectAll: string;
                selectNone: string;
                selectRow: string;
                selectedCount: string;
                noData: {
                    title: string;
                    description: string;
                };
                search: {
                    placeholder: string;
                };
                pagination: {
                    showing: string;
                    itemsPerPage: string;
                    previous: string;
                    next: string;
                };
                headers: {
                    name: string;
                    email: string;
                    role: string;
                    status: string;
                    actions: string;
                    createdAt: string;
                    updatedAt: string;
                };
            };
            theme: {
                light: string;
                dark: string;
                system: string;
            };
            pipeline: {
                newEntry: {
                    title: string;
                };
                category: {
                    selection: {
                        title: string;
                    };
                    property: {
                        title: string;
                        description: string;
                    };
                    job: {
                        title: string;
                        description: string;
                    };
                };
                intent: {
                    selection: {
                        title: string;
                    };
                    offer: {
                        title: string;
                    };
                    search: {
                        title: string;
                    };
                };
                preview: {
                    ready: {
                        title: string;
                        description: string;
                    };
                    continue: string;
                };
            };
            geoalert: {
                title: string;
                subtitle: string;
                geoCanvasReady: string;
                professionalArchitecture: string;
                enterGeoCanvas: string;
                statusCheck: string;
                port: string;
                reactReady: string;
                typescriptStrict: string;
                independentApp: string;
                enterpriseArchitecture: string;
                navigateToLayeraId: string;
                modularMicroservice: string;
                crossAppNavigation: string;
                readyForImplementation: string;
            };
            dashboard: {
                overview: string;
                userInfo: string;
                accountDetails: string;
                personalInformation: string;
                quickActions: string;
                accountAge: string;
                daysSinceCreated: string;
                emailStatus: string;
                mfaStatus: string;
                accountRole: string;
                descriptions: {
                    account: string;
                    settings: string;
                    data: string;
                    mfa: string;
                };
                actionDescriptions: {
                    manageAccount: string;
                    configureSettings: string;
                    manageData: string;
                    enableMfa: string;
                };
            };
        };
        readonly dashboard: {
            title: string;
            welcome: string;
            quickActions: {
                title: string;
                subtitle: string;
            };
            cards: {
                account: {
                    title: string;
                    description: string;
                    action: string;
                };
                settings: {
                    title: string;
                    description: string;
                    action: string;
                };
                data: {
                    title: string;
                    description: string;
                    action: string;
                };
                mfa: {
                    title: string;
                    description: string;
                    action: string;
                };
            };
            user: {
                role: string;
                lastLogin: string;
                successfulLogin: string;
                username: string;
                usernameDisplay: string;
                info: string;
                security: {
                    emailVerified: string;
                    emailNotVerified: string;
                    mfaEnabled: string;
                    mfaDisabled: string;
                };
            };
            admin: {
                roleManagement: string;
            };
        };
    };
};
export declare const supportedLngs: readonly ["el", "en"];
export type SupportedLanguage = typeof supportedLngs[number];
export declare const i18nConfig: {
    debug: boolean;
    lng: string;
    fallbackLng: string;
    supportedLngs: readonly ["el", "en"];
    ns: readonly ["common", "dashboard"];
    defaultNS: string;
    resources: {
        readonly el: {
            readonly common: {
                app: {
                    name: string;
                    subtitle: string;
                    welcome: string;
                    loading: string;
                    languageSwitch: string;
                };
                navigation: {
                    dashboard: string;
                    account: string;
                    settings: string;
                    data: string;
                    logout: string;
                    back: string;
                    backToDashboard: string;
                };
                auth: {
                    login: string;
                    register: string;
                    email: string;
                    password: string;
                    confirmPassword: string;
                    signInWithGoogle: string;
                    forgotPassword: string;
                    noAccount: string;
                    hasAccount: string;
                    signOut: string;
                };
                mfa: {
                    title: string;
                    subtitle: string;
                    whyNeeded: {
                        title: string;
                        description: string;
                        benefits: {
                            passwordProtection: string;
                            secureAccess: string;
                            unauthorizedAlert: string;
                        };
                    };
                    form: {
                        phoneLabel: string;
                        phoneHint: string;
                        enableButton: string;
                    };
                    prompts: {
                        enterSmsCode: string;
                    };
                    success: {
                        enrollmentComplete: string;
                    };
                    errors: {
                        enterPhone: string;
                        operationNotAllowed: string;
                        tooManyRequests: string;
                        invalidPhoneNumber: string;
                        requiresRecentLogin: string;
                    };
                };
                account: {
                    title: string;
                    info: string;
                    security: string;
                    messages: {
                        emailNotVerified: string;
                        mfaRecommendation: string;
                    };
                    badges: {
                        mfaActive: string;
                        mfaInactive: string;
                    };
                    actions: {
                        enable2fa: string;
                        settings: string;
                    };
                };
                settings: {
                    title: string;
                    subtitle: string;
                    sections: {
                        security: string;
                        notifications: string;
                        appearance: string;
                        dangerZone: string;
                    };
                    items: {
                        changePassword: {
                            title: string;
                            description: string;
                        };
                        twoFactor: {
                            title: string;
                            description: string;
                            statusActive: string;
                            statusInactive: string;
                        };
                        emailVerification: {
                            title: string;
                            description: string;
                            statusVerified: string;
                            statusUnverified: string;
                        };
                        emailNotifications: {
                            title: string;
                            description: string;
                        };
                        smsNotifications: {
                            title: string;
                            description: string;
                        };
                        theme: {
                            title: string;
                            description: string;
                            options: {
                                light: string;
                                dark: string;
                                auto: string;
                            };
                        };
                        language: {
                            title: string;
                            description: string;
                            options: {
                                el: string;
                                en: string;
                            };
                        };
                        deleteAccount: {
                            title: string;
                            description: string;
                        };
                    };
                };
                data: {
                    title: string;
                    subtitle: string;
                    personalInfo: string;
                    security: string;
                    devices: string;
                    export: string;
                    privacy: string;
                    fields: {
                        email: string;
                        name: string;
                        displayName: string;
                        userId: string;
                        role: string;
                        emailVerified: string;
                        mfaEnabled: string;
                        lastSignIn: string;
                        accountCreated: string;
                        currentDevice: string;
                        ipAddress: string;
                        connectionProvider: string;
                        notAvailable: string;
                        encrypted: string;
                        webBrowser: string;
                    };
                    exportFormats: {
                        pdf: string;
                        json: string;
                        csv: string;
                    };
                    exportDescription: string;
                    privacyPoints: {
                        title: string;
                        encryption: string;
                        noSharing: string;
                        deleteAnytime: string;
                        compliance: string;
                    };
                };
                roles: {
                    admin: string;
                    broker: string;
                    builder: string;
                    private: string;
                };
                admin: {
                    roleManagement: {
                        title: string;
                        subtitle: string;
                        form: {
                            title: string;
                            description: string;
                            emailHint: string;
                            roleHint: string;
                        };
                        info: {
                            title: string;
                            adminOnly: string;
                            clientRestrictions: string;
                            mfaRefresh: string;
                        };
                    };
                    actions: {
                        setRole: string;
                        refreshMfa: string;
                    };
                    errors: {
                        enterEmail: string;
                        roleSetFailed: string;
                        mfaRefreshFailed: string;
                    };
                    success: {
                        roleSet: string;
                        mfaRefreshed: string;
                    };
                    checking2FA: string;
                };
                status: {
                    active: string;
                    inactive: string;
                    verified: string;
                    unverified: string;
                    enabled: string;
                    disabled: string;
                };
                actions: {
                    save: string;
                    cancel: string;
                    edit: string;
                    delete: string;
                    enable: string;
                    disable: string;
                    change: string;
                    manage: string;
                    verify: string;
                };
                errors: {
                    required: string;
                    invalidEmail: string;
                    invalidPhone: string;
                    passwordTooShort: string;
                    passwordMismatch: string;
                    authError: string;
                    networkError: string;
                    unknownError: string;
                    adminRequired: {
                        title: string;
                        description: string;
                    };
                };
                common: {
                    error: string;
                    processing: string;
                };
                notifications: {
                    loading: string;
                    retry: string;
                    tryAgain: string;
                    somethingWentWrong: string;
                    dismiss: string;
                    ok: string;
                    cancel: string;
                    types: {
                        success: string;
                        warning: string;
                        error: string;
                        info: string;
                    };
                    messages: {
                        generalError: string;
                        networkError: string;
                        operationComplete: string;
                        operationFailed: string;
                    };
                };
                forms: {
                    validation: {
                        required: string;
                    };
                    labels: {
                        email: string;
                        name: string;
                        phone: string;
                        password: string;
                        confirmPassword: string;
                        role: string;
                        status: string;
                    };
                    placeholders: {
                        email: string;
                        password: string;
                        confirmPassword: string;
                        displayName: string;
                        enterValue: string;
                        selectRole: string;
                        search: string;
                    };
                    hints: {
                        emailPrivacy: string;
                        passwordRequirements: string;
                        displayName: string;
                    };
                    select: {
                        noOptions: string;
                        clear: string;
                        loading: string;
                    };
                };
                tables: {
                    selectAll: string;
                    selectNone: string;
                    selectRow: string;
                    selectedCount: string;
                    noData: {
                        title: string;
                        description: string;
                    };
                    search: {
                        placeholder: string;
                    };
                    pagination: {
                        showing: string;
                        itemsPerPage: string;
                        previous: string;
                        next: string;
                    };
                    headers: {
                        name: string;
                        email: string;
                        role: string;
                        status: string;
                        actions: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
                pipeline: {
                    newEntry: {
                        title: string;
                    };
                    category: {
                        selection: {
                            title: string;
                        };
                        property: {
                            title: string;
                            description: string;
                        };
                        job: {
                            title: string;
                            description: string;
                        };
                    };
                    intent: {
                        selection: {
                            title: string;
                        };
                        offer: {
                            title: string;
                        };
                        search: {
                            title: string;
                        };
                    };
                    preview: {
                        ready: {
                            title: string;
                            description: string;
                        };
                        continue: string;
                    };
                };
                geoalert: {
                    title: string;
                    subtitle: string;
                    geoCanvasReady: string;
                    professionalArchitecture: string;
                    enterGeoCanvas: string;
                    statusCheck: string;
                    port: string;
                    reactReady: string;
                    typescriptStrict: string;
                    independentApp: string;
                    enterpriseArchitecture: string;
                    navigateToLayeraId: string;
                    modularMicroservice: string;
                    crossAppNavigation: string;
                    readyForImplementation: string;
                };
                dashboard: {
                    overview: string;
                    userInfo: string;
                    accountDetails: string;
                    personalInformation: string;
                    quickActions: string;
                    accountAge: string;
                    daysSinceCreated: string;
                    emailStatus: string;
                    mfaStatus: string;
                    accountRole: string;
                    descriptions: {
                        account: string;
                        settings: string;
                        data: string;
                        mfa: string;
                    };
                    actionDescriptions: {
                        manageAccount: string;
                        configureSettings: string;
                        manageData: string;
                        enableMfa: string;
                    };
                    theme: {
                        light: string;
                        dark: string;
                        system: string;
                    };
                };
            };
            readonly dashboard: {
                title: string;
                welcome: string;
                quickActions: {
                    title: string;
                    subtitle: string;
                };
                cards: {
                    account: {
                        title: string;
                        description: string;
                        action: string;
                    };
                    settings: {
                        title: string;
                        description: string;
                        action: string;
                    };
                    data: {
                        title: string;
                        description: string;
                        action: string;
                    };
                    mfa: {
                        title: string;
                        description: string;
                        action: string;
                    };
                };
                user: {
                    role: string;
                    lastLogin: string;
                    successfulLogin: string;
                    username: string;
                    usernameDisplay: string;
                    info: string;
                    security: {
                        emailVerified: string;
                        emailNotVerified: string;
                        mfaEnabled: string;
                        mfaDisabled: string;
                    };
                };
                admin: {
                    roleManagement: string;
                };
            };
        };
        readonly en: {
            readonly common: {
                app: {
                    name: string;
                    subtitle: string;
                    welcome: string;
                    loading: string;
                    languageSwitch: string;
                };
                navigation: {
                    dashboard: string;
                    account: string;
                    settings: string;
                    data: string;
                    logout: string;
                    back: string;
                    backToDashboard: string;
                };
                auth: {
                    login: string;
                    register: string;
                    email: string;
                    password: string;
                    confirmPassword: string;
                    signInWithGoogle: string;
                    forgotPassword: string;
                    noAccount: string;
                    hasAccount: string;
                    signOut: string;
                };
                mfa: {
                    title: string;
                    subtitle: string;
                    whyNeeded: {
                        title: string;
                        description: string;
                        benefits: {
                            passwordProtection: string;
                            secureAccess: string;
                            unauthorizedAlert: string;
                        };
                    };
                    form: {
                        phoneLabel: string;
                        phoneHint: string;
                        enableButton: string;
                    };
                    prompts: {
                        enterSmsCode: string;
                    };
                    success: {
                        enrollmentComplete: string;
                    };
                    errors: {
                        enterPhone: string;
                        operationNotAllowed: string;
                        tooManyRequests: string;
                        invalidPhoneNumber: string;
                        requiresRecentLogin: string;
                    };
                };
                account: {
                    title: string;
                    info: string;
                    security: string;
                    messages: {
                        emailNotVerified: string;
                        mfaRecommendation: string;
                    };
                    badges: {
                        mfaActive: string;
                        mfaInactive: string;
                    };
                    actions: {
                        enable2fa: string;
                        settings: string;
                    };
                };
                settings: {
                    title: string;
                    subtitle: string;
                    sections: {
                        security: string;
                        notifications: string;
                        appearance: string;
                        dangerZone: string;
                    };
                    items: {
                        changePassword: {
                            title: string;
                            description: string;
                        };
                        twoFactor: {
                            title: string;
                            description: string;
                            statusActive: string;
                            statusInactive: string;
                        };
                        emailVerification: {
                            title: string;
                            description: string;
                            statusVerified: string;
                            statusUnverified: string;
                        };
                        emailNotifications: {
                            title: string;
                            description: string;
                        };
                        smsNotifications: {
                            title: string;
                            description: string;
                        };
                        theme: {
                            title: string;
                            description: string;
                            options: {
                                light: string;
                                dark: string;
                                auto: string;
                            };
                        };
                        language: {
                            title: string;
                            description: string;
                            options: {
                                el: string;
                                en: string;
                            };
                        };
                        deleteAccount: {
                            title: string;
                            description: string;
                        };
                    };
                };
                data: {
                    title: string;
                    subtitle: string;
                    personalInfo: string;
                    security: string;
                    devices: string;
                    export: string;
                    privacy: string;
                    fields: {
                        email: string;
                        name: string;
                        displayName: string;
                        userId: string;
                        role: string;
                        emailVerified: string;
                        mfaEnabled: string;
                        lastSignIn: string;
                        accountCreated: string;
                        currentDevice: string;
                        ipAddress: string;
                        connectionProvider: string;
                        notAvailable: string;
                        encrypted: string;
                        webBrowser: string;
                    };
                    exportFormats: {
                        pdf: string;
                        json: string;
                        csv: string;
                    };
                    exportDescription: string;
                    privacyPoints: {
                        title: string;
                        encryption: string;
                        noSharing: string;
                        deleteAnytime: string;
                        compliance: string;
                    };
                };
                roles: {
                    admin: string;
                    broker: string;
                    builder: string;
                    private: string;
                };
                admin: {
                    roleManagement: {
                        title: string;
                        subtitle: string;
                        form: {
                            title: string;
                            description: string;
                            emailHint: string;
                            roleHint: string;
                        };
                        info: {
                            title: string;
                            adminOnly: string;
                            clientRestrictions: string;
                            mfaRefresh: string;
                        };
                    };
                    actions: {
                        setRole: string;
                        refreshMfa: string;
                    };
                    errors: {
                        enterEmail: string;
                        roleSetFailed: string;
                        mfaRefreshFailed: string;
                    };
                    success: {
                        roleSet: string;
                        mfaRefreshed: string;
                    };
                    checking2FA: string;
                };
                status: {
                    active: string;
                    inactive: string;
                    verified: string;
                    unverified: string;
                    enabled: string;
                    disabled: string;
                };
                actions: {
                    save: string;
                    cancel: string;
                    edit: string;
                    delete: string;
                    enable: string;
                    disable: string;
                    change: string;
                    manage: string;
                    verify: string;
                };
                errors: {
                    required: string;
                    invalidEmail: string;
                    invalidPhone: string;
                    passwordTooShort: string;
                    passwordMismatch: string;
                    authError: string;
                    networkError: string;
                    unknownError: string;
                    adminRequired: {
                        title: string;
                        description: string;
                    };
                };
                common: {
                    error: string;
                    processing: string;
                };
                notifications: {
                    loading: string;
                    retry: string;
                    tryAgain: string;
                    somethingWentWrong: string;
                    dismiss: string;
                    ok: string;
                    cancel: string;
                    types: {
                        success: string;
                        warning: string;
                        error: string;
                        info: string;
                    };
                    messages: {
                        generalError: string;
                        networkError: string;
                        operationComplete: string;
                        operationFailed: string;
                    };
                };
                forms: {
                    validation: {
                        required: string;
                    };
                    labels: {
                        email: string;
                        name: string;
                        phone: string;
                        password: string;
                        confirmPassword: string;
                        role: string;
                        status: string;
                    };
                    placeholders: {
                        email: string;
                        password: string;
                        confirmPassword: string;
                        displayName: string;
                        enterValue: string;
                        selectRole: string;
                        search: string;
                    };
                    hints: {
                        emailPrivacy: string;
                        passwordRequirements: string;
                        displayName: string;
                    };
                    select: {
                        noOptions: string;
                        clear: string;
                        loading: string;
                    };
                };
                tables: {
                    selectAll: string;
                    selectNone: string;
                    selectRow: string;
                    selectedCount: string;
                    noData: {
                        title: string;
                        description: string;
                    };
                    search: {
                        placeholder: string;
                    };
                    pagination: {
                        showing: string;
                        itemsPerPage: string;
                        previous: string;
                        next: string;
                    };
                    headers: {
                        name: string;
                        email: string;
                        role: string;
                        status: string;
                        actions: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
                theme: {
                    light: string;
                    dark: string;
                    system: string;
                };
                pipeline: {
                    newEntry: {
                        title: string;
                    };
                    category: {
                        selection: {
                            title: string;
                        };
                        property: {
                            title: string;
                            description: string;
                        };
                        job: {
                            title: string;
                            description: string;
                        };
                    };
                    intent: {
                        selection: {
                            title: string;
                        };
                        offer: {
                            title: string;
                        };
                        search: {
                            title: string;
                        };
                    };
                    preview: {
                        ready: {
                            title: string;
                            description: string;
                        };
                        continue: string;
                    };
                };
                geoalert: {
                    title: string;
                    subtitle: string;
                    geoCanvasReady: string;
                    professionalArchitecture: string;
                    enterGeoCanvas: string;
                    statusCheck: string;
                    port: string;
                    reactReady: string;
                    typescriptStrict: string;
                    independentApp: string;
                    enterpriseArchitecture: string;
                    navigateToLayeraId: string;
                    modularMicroservice: string;
                    crossAppNavigation: string;
                    readyForImplementation: string;
                };
                dashboard: {
                    overview: string;
                    userInfo: string;
                    accountDetails: string;
                    personalInformation: string;
                    quickActions: string;
                    accountAge: string;
                    daysSinceCreated: string;
                    emailStatus: string;
                    mfaStatus: string;
                    accountRole: string;
                    descriptions: {
                        account: string;
                        settings: string;
                        data: string;
                        mfa: string;
                    };
                    actionDescriptions: {
                        manageAccount: string;
                        configureSettings: string;
                        manageData: string;
                        enableMfa: string;
                    };
                };
            };
            readonly dashboard: {
                title: string;
                welcome: string;
                quickActions: {
                    title: string;
                    subtitle: string;
                };
                cards: {
                    account: {
                        title: string;
                        description: string;
                        action: string;
                    };
                    settings: {
                        title: string;
                        description: string;
                        action: string;
                    };
                    data: {
                        title: string;
                        description: string;
                        action: string;
                    };
                    mfa: {
                        title: string;
                        description: string;
                        action: string;
                    };
                };
                user: {
                    role: string;
                    lastLogin: string;
                    successfulLogin: string;
                    username: string;
                    usernameDisplay: string;
                    info: string;
                    security: {
                        emailVerified: string;
                        emailNotVerified: string;
                        mfaEnabled: string;
                        mfaDisabled: string;
                    };
                };
                admin: {
                    roleManagement: string;
                };
            };
        };
    };
    interpolation: {
        escapeValue: boolean;
    };
    react: {
        useSuspense: boolean;
        bindI18n: string;
        bindI18nStore: string;
        transEmptyNodeValue: string;
        transSupportBasicHtmlNodes: boolean;
        transKeepBasicHtmlNodesFor: string[];
    };
    detection: {
        order: string[];
        lookupLocalStorage: string;
        caches: string[];
    };
};
export default i18n;
//# sourceMappingURL=config.d.ts.map