/**
 * Manages the currently active session, stored in localStorage.
 * When signing out we need to clear it using removeActiveSession(). 
 */
import type { Session } from "../types";
import { getDefaultAPISessionFromEnv } from "./api";
import { removeActiveUser } from "./profiles";
import { removeActiveChain } from "./chains";

export { 
  getCurrentSession, 
  getDefaultSession,
  saveActiveSession, 
  removeActiveSession 
} ;

const STORE_KEY = "current-session";
let activeSession: Session | null = null;

function getCurrentSession(): Session | null {
  if (activeSession) return activeSession; // use cache
  const data = localStorage.getItem(STORE_KEY);
  activeSession = data && JSON.parse(data) || null; 
  return activeSession;
};

function getDefaultSession(): Session {
  return getDefaultAPISessionFromEnv(); 
};

function saveActiveSession(session: Session) {
  if (! session)
    throw Error("store/sessions/setActiveSession: Invalid session");
  localStorage.setItem(STORE_KEY, JSON.stringify(session));
  activeSession = session;
  return session;
};

function removeActiveSession(): Session {
  localStorage.removeItem(STORE_KEY);
  activeSession = null;
  removeActiveUser();
  removeActiveChain();
  return getDefaultSession();
};
