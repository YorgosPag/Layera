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
            map: {
                title: string;
                loading: string;
                center: string;
                zoom: string;
                fullscreen: string;
                layers: string;
                drawing: string;
            };
            buttons: {
                save: string;
                cancel: string;
                delete: string;
                edit: string;
                create: string;
                update: string;
                close: string;
                open: string;
                search: string;
                filter: string;
                export: string;
                import: string;
                download: string;
                upload: string;
                submit: string;
                reset: string;
                clear: string;
                apply: string;
                confirm: string;
                reject: string;
            };
            alerts: {
                success: string;
                error: string;
                warning: string;
                info: string;
                loading: string;
                saving: string;
                deleting: string;
                updating: string;
                processing: string;
                completed: string;
                failed: string;
            };
            forms: {
                required: string;
                invalid: string;
                tooShort: string;
                tooLong: string;
                invalidEmail: string;
                invalidPhone: string;
                passwordMismatch: string;
                weakPassword: string;
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
            realEstate: {
                newListing: string;
                categorySelection: string;
                properties: string;
                propertyDescription: string;
                jobs: string;
                jobDescription: string;
                wantToOffer: string;
                offerDescription: string;
                wantToSearch: string;
                searchDescription: string;
                transactionType: string;
                sale: string;
                saleDescription: string;
                rental: string;
                rentalDescription: string;
            };
            availability: {
                whenAvailable: string;
                selectPeriod: string;
                now: string;
                nowDescription: string;
                future: string;
                futureDescription: string;
                details: string;
                pleaseSetDateAndDuration: string;
                startDate: string;
                datePlaceholder: string;
                duration: string;
                durationExample: string;
                unit: string;
                months: string;
            };
            location: {
                locationAndFloorplan: string;
                uploadFloorplan: string;
                selectFile: string;
                clickToUpload: string;
                or: string;
                searchLocation: string;
                locationExample: string;
                placementTools: string;
                toolsDescription: string;
                rotation: string;
                scale: string;
                cmToM: string;
                mmToM: string;
                mToM: string;
            };
            jobs: {
                listingType: string;
                wantToOfferPosition: string;
                offerPositionDescription: string;
                lookingForJob: string;
                lookingForJobDescription: string;
                employmentType: string;
                fullTime: string;
                fullTimeDescription: string;
                partTime: string;
                partTimeDescription: string;
                freelance: string;
                freelanceDescription: string;
                seasonal: string;
                seasonalDescription: string;
                drawingArea: string;
                drawingSearchArea: string;
                openDrawingTool: string;
                clickToDrawOnMap: string;
                jobDetails: string;
                fillSearchDetails: string;
                title: string;
                titleExample: string;
                description: string;
                descriptionPlaceholder: string;
                salary: string;
                salaryExample: string;
                contactInfo: string;
                contactExample: string;
                required: string;
            };
            common: {
                error: string;
                processing: string;
                addressDetails: string;
                showOnMap: string;
                clickToShowBoundary: string;
                title: string;
                subtitle: string;
                realEstate: string;
                job: string;
                marker: string;
                polygon: string;
                clear: string;
                auto: string;
                mobile: string;
                tablet: string;
                desktop: string;
                overrideActive: string;
            };
            addressDetails: string;
            showOnMap: string;
            clickToShowBoundary: string;
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
                        property: {
                            title: string;
                            description: string;
                        };
                        job: {
                            title: string;
                            description: string;
                        };
                    };
                    search: {
                        property: {
                            title: string;
                            description: string;
                        };
                        job: {
                            title: string;
                            description: string;
                        };
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
            pipelines: {
                steps: {
                    details: {
                        title: string;
                        subtitle: string;
                        property: string;
                        job: string;
                        offer: string;
                        search: string;
                        fields: {
                            title: string;
                            description: string;
                            price: string;
                            salary: string;
                            contactInfo: string;
                        };
                        placeholders: {
                            propertyTitle: string;
                            jobTitle: string;
                            description: string;
                            price: string;
                            salary: string;
                            contact: string;
                        };
                    };
                    transaction: {
                        title: string;
                        sale: {
                            title: string;
                            description: string;
                        };
                        rent: {
                            title: string;
                            description: string;
                        };
                    };
                    layout: {
                        title: string;
                        findMyLocation: string;
                        or: string;
                        searchLocation: string;
                        locationPlaceholder: string;
                        results: string;
                        locationPin: string;
                        placementTools: {
                            title: string;
                            description: string;
                            rotation: string;
                            scale: string;
                            units: {
                                cmToM: string;
                                mmToM: string;
                                mToM: string;
                            };
                        };
                        actions: {
                            back: string;
                            saveLocation: string;
                        };
                    };
                    employmentType: {
                        title: string;
                        fullTime: {
                            title: string;
                            description: string;
                        };
                        partTime: {
                            title: string;
                            description: string;
                        };
                        freelance: {
                            title: string;
                            description: string;
                        };
                        seasonal: {
                            title: string;
                            description: string;
                        };
                    };
                    availability: {
                        title: string;
                        subtitle: string;
                        fields: {
                            startDate: string;
                            duration: string;
                            unit: string;
                        };
                        units: {
                            months: string;
                            years: string;
                        };
                        placeholders: {
                            duration: string;
                            datePlaceholder: string;
                        };
                        question: {
                            title: string;
                            subtitle: string;
                        };
                        options: {
                            now: {
                                title: string;
                                description: string;
                            };
                            future: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
                actions: {
                    back: string;
                    continue: string;
                    save: string;
                    cancel: string;
                };
            };
            progress: {
                stepper: {
                    optional: string;
                    labels: {
                        category: string;
                        intent: string;
                        transactionType: string;
                        employmentType: string;
                        availability: string;
                        availabilityDetails: string;
                        location: string;
                        layout: string;
                        details: string;
                        complete: string;
                    };
                    descriptions: {
                        category: string;
                        intent: string;
                        transactionType: string;
                        employmentType: string;
                        availability: string;
                        availabilityDetails: string;
                        location: string;
                        layout: string;
                        details: string;
                        complete: string;
                    };
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
            map: {
                title: string;
                loading: string;
                center: string;
                zoom: string;
                fullscreen: string;
                layers: string;
                drawing: string;
            };
            buttons: {
                save: string;
                cancel: string;
                delete: string;
                edit: string;
                create: string;
                update: string;
                close: string;
                open: string;
                search: string;
                filter: string;
                export: string;
                import: string;
                download: string;
                upload: string;
                submit: string;
                reset: string;
                clear: string;
                apply: string;
                confirm: string;
                reject: string;
            };
            alerts: {
                success: string;
                error: string;
                warning: string;
                info: string;
                loading: string;
                saving: string;
                deleting: string;
                updating: string;
                processing: string;
                completed: string;
                failed: string;
            };
            forms: {
                required: string;
                invalid: string;
                tooShort: string;
                tooLong: string;
                invalidEmail: string;
                invalidPhone: string;
                passwordMismatch: string;
                weakPassword: string;
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
            realEstate: {
                newListing: string;
                categorySelection: string;
                properties: string;
                propertyDescription: string;
                jobs: string;
                jobDescription: string;
                wantToOffer: string;
                offerDescription: string;
                wantToSearch: string;
                searchDescription: string;
                transactionType: string;
                sale: string;
                saleDescription: string;
                rental: string;
                rentalDescription: string;
            };
            availability: {
                whenAvailable: string;
                selectPeriod: string;
                now: string;
                nowDescription: string;
                future: string;
                futureDescription: string;
                details: string;
                pleaseSetDateAndDuration: string;
                startDate: string;
                datePlaceholder: string;
                duration: string;
                durationExample: string;
                unit: string;
                months: string;
            };
            location: {
                locationAndFloorplan: string;
                uploadFloorplan: string;
                selectFile: string;
                clickToUpload: string;
                or: string;
                searchLocation: string;
                locationExample: string;
                placementTools: string;
                toolsDescription: string;
                rotation: string;
                scale: string;
                cmToM: string;
                mmToM: string;
                mToM: string;
            };
            jobs: {
                listingType: string;
                wantToOfferPosition: string;
                offerPositionDescription: string;
                lookingForWork: string;
                lookingForWorkDescription: string;
                employmentType: string;
                fullTime: string;
                fullTimeDescription: string;
                partTime: string;
                partTimeDescription: string;
                freelance: string;
                freelanceDescription: string;
                seasonal: string;
                seasonalDescription: string;
                whenAvailable: string;
                selectAvailabilityPeriod: string;
                now: string;
                nowDescription: string;
                future: string;
                futureDescription: string;
                locationAndMap: string;
                drawPropertyArea: string;
                drawingSearchArea: string;
                openDrawingTool: string;
                clickToDrawOnMap: string;
                jobDetails: string;
                fillJobSearchDetails: string;
                title: string;
                titleExample: string;
                description: string;
                describeDetailed: string;
                salary: string;
                salaryExample: string;
                contactInfo: string;
                contactExample: string;
            };
            common: {
                error: string;
                processing: string;
                addressDetails: string;
                showOnMap: string;
                clickToShowBoundary: string;
                title: string;
                subtitle: string;
                realEstate: string;
                job: string;
                marker: string;
                polygon: string;
                clear: string;
                auto: string;
                mobile: string;
                tablet: string;
                desktop: string;
                overrideActive: string;
            };
            addressDetails: string;
            showOnMap: string;
            clickToShowBoundary: string;
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
                        property: {
                            title: string;
                            description: string;
                        };
                        job: {
                            title: string;
                            description: string;
                        };
                    };
                    search: {
                        property: {
                            title: string;
                            description: string;
                        };
                        job: {
                            title: string;
                            description: string;
                        };
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
            pipelines: {
                steps: {
                    details: {
                        title: string;
                        subtitle: string;
                        property: string;
                        job: string;
                        offer: string;
                        search: string;
                        fields: {
                            title: string;
                            description: string;
                            price: string;
                            salary: string;
                            contactInfo: string;
                        };
                        placeholders: {
                            propertyTitle: string;
                            jobTitle: string;
                            description: string;
                            price: string;
                            salary: string;
                            contact: string;
                        };
                    };
                    layout: {
                        title: string;
                        findMyLocation: string;
                        or: string;
                        searchLocation: string;
                        locationPlaceholder: string;
                        results: string;
                        locationPin: string;
                        placementTools: {
                            title: string;
                            description: string;
                            rotation: string;
                            scale: string;
                            units: {
                                cmToM: string;
                                mmToM: string;
                                mToM: string;
                            };
                        };
                        actions: {
                            back: string;
                            saveLocation: string;
                        };
                    };
                    transaction: {
                        title: string;
                        sale: {
                            title: string;
                            description: string;
                        };
                        rent: {
                            title: string;
                            description: string;
                        };
                    };
                    employmentType: {
                        title: string;
                        fullTime: {
                            title: string;
                            description: string;
                        };
                        partTime: {
                            title: string;
                            description: string;
                        };
                        freelance: {
                            title: string;
                            description: string;
                        };
                        seasonal: {
                            title: string;
                            description: string;
                        };
                    };
                    availability: {
                        title: string;
                        subtitle: string;
                        fields: {
                            startDate: string;
                            duration: string;
                            unit: string;
                        };
                        units: {
                            months: string;
                            years: string;
                        };
                        placeholders: {
                            duration: string;
                            datePlaceholder: string;
                        };
                        question: {
                            title: string;
                            subtitle: string;
                        };
                        options: {
                            now: {
                                title: string;
                                description: string;
                            };
                            future: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
                actions: {
                    back: string;
                    continue: string;
                    save: string;
                };
            };
            progress: {
                stepper: {
                    optional: string;
                    labels: {
                        category: string;
                        intent: string;
                        transactionType: string;
                        employmentType: string;
                        availability: string;
                        availabilityDetails: string;
                        location: string;
                        layout: string;
                        details: string;
                        complete: string;
                    };
                    descriptions: {
                        category: string;
                        intent: string;
                        transactionType: string;
                        employmentType: string;
                        availability: string;
                        availabilityDetails: string;
                        location: string;
                        layout: string;
                        details: string;
                        complete: string;
                    };
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
                map: {
                    title: string;
                    loading: string;
                    center: string;
                    zoom: string;
                    fullscreen: string;
                    layers: string;
                    drawing: string;
                };
                buttons: {
                    save: string;
                    cancel: string;
                    delete: string;
                    edit: string;
                    create: string;
                    update: string;
                    close: string;
                    open: string;
                    search: string;
                    filter: string;
                    export: string;
                    import: string;
                    download: string;
                    upload: string;
                    submit: string;
                    reset: string;
                    clear: string;
                    apply: string;
                    confirm: string;
                    reject: string;
                };
                alerts: {
                    success: string;
                    error: string;
                    warning: string;
                    info: string;
                    loading: string;
                    saving: string;
                    deleting: string;
                    updating: string;
                    processing: string;
                    completed: string;
                    failed: string;
                };
                forms: {
                    required: string;
                    invalid: string;
                    tooShort: string;
                    tooLong: string;
                    invalidEmail: string;
                    invalidPhone: string;
                    passwordMismatch: string;
                    weakPassword: string;
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
                realEstate: {
                    newListing: string;
                    categorySelection: string;
                    properties: string;
                    propertyDescription: string;
                    jobs: string;
                    jobDescription: string;
                    wantToOffer: string;
                    offerDescription: string;
                    wantToSearch: string;
                    searchDescription: string;
                    transactionType: string;
                    sale: string;
                    saleDescription: string;
                    rental: string;
                    rentalDescription: string;
                };
                availability: {
                    whenAvailable: string;
                    selectPeriod: string;
                    now: string;
                    nowDescription: string;
                    future: string;
                    futureDescription: string;
                    details: string;
                    pleaseSetDateAndDuration: string;
                    startDate: string;
                    datePlaceholder: string;
                    duration: string;
                    durationExample: string;
                    unit: string;
                    months: string;
                };
                location: {
                    locationAndFloorplan: string;
                    uploadFloorplan: string;
                    selectFile: string;
                    clickToUpload: string;
                    or: string;
                    searchLocation: string;
                    locationExample: string;
                    placementTools: string;
                    toolsDescription: string;
                    rotation: string;
                    scale: string;
                    cmToM: string;
                    mmToM: string;
                    mToM: string;
                };
                jobs: {
                    listingType: string;
                    wantToOfferPosition: string;
                    offerPositionDescription: string;
                    lookingForJob: string;
                    lookingForJobDescription: string;
                    employmentType: string;
                    fullTime: string;
                    fullTimeDescription: string;
                    partTime: string;
                    partTimeDescription: string;
                    freelance: string;
                    freelanceDescription: string;
                    seasonal: string;
                    seasonalDescription: string;
                    drawingArea: string;
                    drawingSearchArea: string;
                    openDrawingTool: string;
                    clickToDrawOnMap: string;
                    jobDetails: string;
                    fillSearchDetails: string;
                    title: string;
                    titleExample: string;
                    description: string;
                    descriptionPlaceholder: string;
                    salary: string;
                    salaryExample: string;
                    contactInfo: string;
                    contactExample: string;
                    required: string;
                };
                common: {
                    error: string;
                    processing: string;
                    addressDetails: string;
                    showOnMap: string;
                    clickToShowBoundary: string;
                    title: string;
                    subtitle: string;
                    realEstate: string;
                    job: string;
                    marker: string;
                    polygon: string;
                    clear: string;
                    auto: string;
                    mobile: string;
                    tablet: string;
                    desktop: string;
                    overrideActive: string;
                };
                addressDetails: string;
                showOnMap: string;
                clickToShowBoundary: string;
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
                            property: {
                                title: string;
                                description: string;
                            };
                            job: {
                                title: string;
                                description: string;
                            };
                        };
                        search: {
                            property: {
                                title: string;
                                description: string;
                            };
                            job: {
                                title: string;
                                description: string;
                            };
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
                pipelines: {
                    steps: {
                        details: {
                            title: string;
                            subtitle: string;
                            property: string;
                            job: string;
                            offer: string;
                            search: string;
                            fields: {
                                title: string;
                                description: string;
                                price: string;
                                salary: string;
                                contactInfo: string;
                            };
                            placeholders: {
                                propertyTitle: string;
                                jobTitle: string;
                                description: string;
                                price: string;
                                salary: string;
                                contact: string;
                            };
                        };
                        transaction: {
                            title: string;
                            sale: {
                                title: string;
                                description: string;
                            };
                            rent: {
                                title: string;
                                description: string;
                            };
                        };
                        layout: {
                            title: string;
                            findMyLocation: string;
                            or: string;
                            searchLocation: string;
                            locationPlaceholder: string;
                            results: string;
                            locationPin: string;
                            placementTools: {
                                title: string;
                                description: string;
                                rotation: string;
                                scale: string;
                                units: {
                                    cmToM: string;
                                    mmToM: string;
                                    mToM: string;
                                };
                            };
                            actions: {
                                back: string;
                                saveLocation: string;
                            };
                        };
                        employmentType: {
                            title: string;
                            fullTime: {
                                title: string;
                                description: string;
                            };
                            partTime: {
                                title: string;
                                description: string;
                            };
                            freelance: {
                                title: string;
                                description: string;
                            };
                            seasonal: {
                                title: string;
                                description: string;
                            };
                        };
                        availability: {
                            title: string;
                            subtitle: string;
                            fields: {
                                startDate: string;
                                duration: string;
                                unit: string;
                            };
                            units: {
                                months: string;
                                years: string;
                            };
                            placeholders: {
                                duration: string;
                                datePlaceholder: string;
                            };
                            question: {
                                title: string;
                                subtitle: string;
                            };
                            options: {
                                now: {
                                    title: string;
                                    description: string;
                                };
                                future: {
                                    title: string;
                                    description: string;
                                };
                            };
                        };
                    };
                    actions: {
                        back: string;
                        continue: string;
                        save: string;
                        cancel: string;
                    };
                };
                progress: {
                    stepper: {
                        optional: string;
                        labels: {
                            category: string;
                            intent: string;
                            transactionType: string;
                            employmentType: string;
                            availability: string;
                            availabilityDetails: string;
                            location: string;
                            layout: string;
                            details: string;
                            complete: string;
                        };
                        descriptions: {
                            category: string;
                            intent: string;
                            transactionType: string;
                            employmentType: string;
                            availability: string;
                            availabilityDetails: string;
                            location: string;
                            layout: string;
                            details: string;
                            complete: string;
                        };
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
                map: {
                    title: string;
                    loading: string;
                    center: string;
                    zoom: string;
                    fullscreen: string;
                    layers: string;
                    drawing: string;
                };
                buttons: {
                    save: string;
                    cancel: string;
                    delete: string;
                    edit: string;
                    create: string;
                    update: string;
                    close: string;
                    open: string;
                    search: string;
                    filter: string;
                    export: string;
                    import: string;
                    download: string;
                    upload: string;
                    submit: string;
                    reset: string;
                    clear: string;
                    apply: string;
                    confirm: string;
                    reject: string;
                };
                alerts: {
                    success: string;
                    error: string;
                    warning: string;
                    info: string;
                    loading: string;
                    saving: string;
                    deleting: string;
                    updating: string;
                    processing: string;
                    completed: string;
                    failed: string;
                };
                forms: {
                    required: string;
                    invalid: string;
                    tooShort: string;
                    tooLong: string;
                    invalidEmail: string;
                    invalidPhone: string;
                    passwordMismatch: string;
                    weakPassword: string;
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
                realEstate: {
                    newListing: string;
                    categorySelection: string;
                    properties: string;
                    propertyDescription: string;
                    jobs: string;
                    jobDescription: string;
                    wantToOffer: string;
                    offerDescription: string;
                    wantToSearch: string;
                    searchDescription: string;
                    transactionType: string;
                    sale: string;
                    saleDescription: string;
                    rental: string;
                    rentalDescription: string;
                };
                availability: {
                    whenAvailable: string;
                    selectPeriod: string;
                    now: string;
                    nowDescription: string;
                    future: string;
                    futureDescription: string;
                    details: string;
                    pleaseSetDateAndDuration: string;
                    startDate: string;
                    datePlaceholder: string;
                    duration: string;
                    durationExample: string;
                    unit: string;
                    months: string;
                };
                location: {
                    locationAndFloorplan: string;
                    uploadFloorplan: string;
                    selectFile: string;
                    clickToUpload: string;
                    or: string;
                    searchLocation: string;
                    locationExample: string;
                    placementTools: string;
                    toolsDescription: string;
                    rotation: string;
                    scale: string;
                    cmToM: string;
                    mmToM: string;
                    mToM: string;
                };
                jobs: {
                    listingType: string;
                    wantToOfferPosition: string;
                    offerPositionDescription: string;
                    lookingForWork: string;
                    lookingForWorkDescription: string;
                    employmentType: string;
                    fullTime: string;
                    fullTimeDescription: string;
                    partTime: string;
                    partTimeDescription: string;
                    freelance: string;
                    freelanceDescription: string;
                    seasonal: string;
                    seasonalDescription: string;
                    whenAvailable: string;
                    selectAvailabilityPeriod: string;
                    now: string;
                    nowDescription: string;
                    future: string;
                    futureDescription: string;
                    locationAndMap: string;
                    drawPropertyArea: string;
                    drawingSearchArea: string;
                    openDrawingTool: string;
                    clickToDrawOnMap: string;
                    jobDetails: string;
                    fillJobSearchDetails: string;
                    title: string;
                    titleExample: string;
                    description: string;
                    describeDetailed: string;
                    salary: string;
                    salaryExample: string;
                    contactInfo: string;
                    contactExample: string;
                };
                common: {
                    error: string;
                    processing: string;
                    addressDetails: string;
                    showOnMap: string;
                    clickToShowBoundary: string;
                    title: string;
                    subtitle: string;
                    realEstate: string;
                    job: string;
                    marker: string;
                    polygon: string;
                    clear: string;
                    auto: string;
                    mobile: string;
                    tablet: string;
                    desktop: string;
                    overrideActive: string;
                };
                addressDetails: string;
                showOnMap: string;
                clickToShowBoundary: string;
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
                            property: {
                                title: string;
                                description: string;
                            };
                            job: {
                                title: string;
                                description: string;
                            };
                        };
                        search: {
                            property: {
                                title: string;
                                description: string;
                            };
                            job: {
                                title: string;
                                description: string;
                            };
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
                pipelines: {
                    steps: {
                        details: {
                            title: string;
                            subtitle: string;
                            property: string;
                            job: string;
                            offer: string;
                            search: string;
                            fields: {
                                title: string;
                                description: string;
                                price: string;
                                salary: string;
                                contactInfo: string;
                            };
                            placeholders: {
                                propertyTitle: string;
                                jobTitle: string;
                                description: string;
                                price: string;
                                salary: string;
                                contact: string;
                            };
                        };
                        layout: {
                            title: string;
                            findMyLocation: string;
                            or: string;
                            searchLocation: string;
                            locationPlaceholder: string;
                            results: string;
                            locationPin: string;
                            placementTools: {
                                title: string;
                                description: string;
                                rotation: string;
                                scale: string;
                                units: {
                                    cmToM: string;
                                    mmToM: string;
                                    mToM: string;
                                };
                            };
                            actions: {
                                back: string;
                                saveLocation: string;
                            };
                        };
                        transaction: {
                            title: string;
                            sale: {
                                title: string;
                                description: string;
                            };
                            rent: {
                                title: string;
                                description: string;
                            };
                        };
                        employmentType: {
                            title: string;
                            fullTime: {
                                title: string;
                                description: string;
                            };
                            partTime: {
                                title: string;
                                description: string;
                            };
                            freelance: {
                                title: string;
                                description: string;
                            };
                            seasonal: {
                                title: string;
                                description: string;
                            };
                        };
                        availability: {
                            title: string;
                            subtitle: string;
                            fields: {
                                startDate: string;
                                duration: string;
                                unit: string;
                            };
                            units: {
                                months: string;
                                years: string;
                            };
                            placeholders: {
                                duration: string;
                                datePlaceholder: string;
                            };
                            question: {
                                title: string;
                                subtitle: string;
                            };
                            options: {
                                now: {
                                    title: string;
                                    description: string;
                                };
                                future: {
                                    title: string;
                                    description: string;
                                };
                            };
                        };
                    };
                    actions: {
                        back: string;
                        continue: string;
                        save: string;
                    };
                };
                progress: {
                    stepper: {
                        optional: string;
                        labels: {
                            category: string;
                            intent: string;
                            transactionType: string;
                            employmentType: string;
                            availability: string;
                            availabilityDetails: string;
                            location: string;
                            layout: string;
                            details: string;
                            complete: string;
                        };
                        descriptions: {
                            category: string;
                            intent: string;
                            transactionType: string;
                            employmentType: string;
                            availability: string;
                            availabilityDetails: string;
                            location: string;
                            layout: string;
                            details: string;
                            complete: string;
                        };
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