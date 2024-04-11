/**
 * Manages the currently active session, stored in localStorage.
 * When signing out we need to clear it using removeActiveSession(). 
 */
import type { Session } from "../types";
import { removeActiveUser } from "./profiles";

export { 
  getCurrentSession, 
  getDefaultSession,
  saveActiveSession, 
  removeActiveSession 
} ;

const STORE_KEY = "current-session";

const DEFAULT_SESSION: Session = {
  host: "api.socialcap.app", // "localhost"
  protocol: "https", // localhost uses "http"
  port: 443, // locahost uses 3080
  authorization: "",
  key: ""
};

function getCurrentSession(): Session | null {
  const data = localStorage.getItem(STORE_KEY);
  return data && JSON.parse(data) || null; 
};

function getDefaultSession(): Session {
  return DEFAULT_SESSION; 
};

function saveActiveSession(session: Session) {
  if (! session)
    throw Error("session/setActiveSession: Invalid session");
  localStorage.setItem(STORE_KEY, JSON.stringify(session));
  return session;
};

function removeActiveSession(): Session {
  localStorage.removeItem(STORE_KEY);
  removeActiveUser();
  return getDefaultSession();
};
