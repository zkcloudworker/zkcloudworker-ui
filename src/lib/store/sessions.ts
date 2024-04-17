/**
 * Manages the currently active session, stored in localStorage.
 * When signing out we need to clear it using removeActiveSession(). 
 */
import type { Session } from "../types";
import { getDefaultAPISessionFromEnv } from "./api";
import { removeActiveUser } from "./profiles";

export { 
  getCurrentSession, 
  getDefaultSession,
  saveActiveSession, 
  removeActiveSession 
} ;

const STORE_KEY = "current-session";

function getCurrentSession(): Session | null {
  const data = localStorage.getItem(STORE_KEY);
  return data && JSON.parse(data) || null; 
};

function getDefaultSession(): Session {
  return getDefaultAPISessionFromEnv(); 
};

function saveActiveSession(session: Session) {
  if (! session)
    throw Error("store/sessions/setActiveSession: Invalid session");
  localStorage.setItem(STORE_KEY, JSON.stringify(session));
  return session;
};

function removeActiveSession(): Session {
  localStorage.removeItem(STORE_KEY);
  removeActiveUser();
  return getDefaultSession();
};
