/**
 * Manages the currently active user, stored in localStorage.
 * When signing out we need to clear it using removeActiveSession(). 
 */
import type { User } from "$lib/types";

export { 
  getCurrentUser, 
  saveActiveUser, 
  removeActiveUser
} ;

const STORE_KEY = "current-user";

function getCurrentUser(): User | null {
  const data = localStorage.getItem(STORE_KEY);
  return data && JSON.parse(data) || null; 
};

function saveActiveUser(user: User) {
  if (! user)
    throw Error("profile/setActiveUser: Invalid user profile");
  localStorage.setItem(STORE_KEY, JSON.stringify(user));
  return user;
};

function removeActiveUser() {
  localStorage.removeItem(STORE_KEY);
};
