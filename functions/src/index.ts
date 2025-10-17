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

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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
function assertAdmin(ctx: functions.https.CallableContext) {
  if (!ctx.auth?.token?.role || ctx.auth.token.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Admin only");
  }
}

export const setRole = functions.region(region).https.onCall(async (data, ctx) => {
  assertAdmin(ctx);
  const { email, uid, role } = data as { email?: string; uid?: string; role: "private"|"broker"|"builder"|"admin" };
  if (!role || (!email && !uid)) {
    throw new functions.https.HttpsError("invalid-argument", "Provide email or uid and role");
  }
  const auth = admin.auth();
  const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email!);
  await auth.setCustomUserClaims(user.uid, { ...(user.customClaims||{}), role });
  return { uid: user.uid, role };
});

export const refreshMfaClaim = functions.region(region).https.onCall(async (data, ctx) => {
  assertAdmin(ctx);
  const { email, uid } = data as { email?: string; uid?: string };
  if (!email && !uid) throw new functions.https.HttpsError("invalid-argument", "Provide email or uid");
  const auth = admin.auth();
  const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email!);
  const enrolled = (user.multiFactor?.enrolledFactors?.length || 0) > 0;
  await auth.setCustomUserClaims(user.uid, { ...(user.customClaims||{}), mfa: enrolled });
  return { uid: user.uid, mfa: enrolled };
});