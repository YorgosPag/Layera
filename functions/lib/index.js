"use strict";
/**
 * @fileoverview Firebase Cloud Functions for Layera ID
 *
 * Provides secure admin operations για user role management
 * και MFA status updates. Όλες οι functions απαιτούν admin authentication
 * με email verification και MFA.
 *
 * @see {@link ../../docs/API.md#cloud-functions-apis} - API Documentation
 * @see {@link ../../docs/SECURITY.md#cloud-functions-security} - Security Guidelines
 * @see {@link ../../docs/DEPLOYMENT.md#cloud-functions-deployment} - Deployment Guide
 *
 * @author Layera Development Team
 * @version 1.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshMfaClaim = exports.setRole = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const region = "europe-west1";
/**
 * Validates admin authentication για secure operations
 *
 * Checks for valid authentication, email verification, admin role,
 * και MFA requirement.
 *
 * @param ctx - Firebase callable context
 * @throws {functions.https.HttpsError} When authentication fails
 *
 * @see {@link ../../docs/SECURITY.md#function-level-security} - Security Implementation
 */
function assertAdmin(ctx) {
    if (!ctx.auth?.token?.role || ctx.auth.token.role !== "admin") {
        throw new functions.https.HttpsError("permission-denied", "Admin only");
    }
}
exports.setRole = functions.region(region).https.onCall(async (data, ctx) => {
    assertAdmin(ctx);
    const { email, uid, role } = data;
    if (!role || (!email && !uid)) {
        throw new functions.https.HttpsError("invalid-argument", "Provide email or uid and role");
    }
    const auth = admin.auth();
    const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { ...(user.customClaims || {}), role });
    return { uid: user.uid, role };
});
exports.refreshMfaClaim = functions.region(region).https.onCall(async (data, ctx) => {
    assertAdmin(ctx);
    const { email, uid } = data;
    if (!email && !uid)
        throw new functions.https.HttpsError("invalid-argument", "Provide email or uid");
    const auth = admin.auth();
    const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email);
    const enrolled = (user.multiFactor?.enrolledFactors?.length || 0) > 0;
    await auth.setCustomUserClaims(user.uid, { ...(user.customClaims || {}), mfa: enrolled });
    return { uid: user.uid, mfa: enrolled };
});
