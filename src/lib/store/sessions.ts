/**
 * Manages the currently active session, stored in localStorage.
 * When signing out we need to clear it using removeActiveSession(). 
 */
import { PUBLIC_API_HOST, PUBLIC_API_PORT, PUBLIC_API_PROTOCOL } from '$env/static/public';
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
  host: PUBLIC_API_HOST, // "localhost"
  protocol: PUBLIC_API_PROTOCOL as 'http' | 'https', // localhost uses "http"
  port: Number(PUBLIC_API_PORT), // locahost uses 3080
  authorization: "",
  key: ""
};

function getCurrentSession(): Session | null {
  const data = localStorage.getItem(STORE_KEY);
  return data && JSON.parse(data) || null; 
};

function getDefaultSession(): Session {
  console.log("store/sessions/getDefaultSession", DEFAULT_SESSION);
  return DEFAULT_SESSION; 
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
