import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const fns = getFunctions(app, "europe-west1");

export async function callSetRole(payload) {
  const fn = httpsCallable(fns, "setRole");
  const res = await fn(payload);
  return res.data;
}

export async function callRefreshMfaClaim(payload) {
  const fn = httpsCallable(fns, "refreshMfaClaim");
  const res = await fn(payload);
  return res.data;
}