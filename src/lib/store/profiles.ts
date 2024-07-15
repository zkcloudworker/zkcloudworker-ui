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
let activeUser: User | null = null; // cached

function getCurrentUser(): User | null {
  if (activeUser) return activeUser;
  const data = localStorage.getItem(STORE_KEY);
  activeUser = data && JSON.parse(data) || null; 

  /// TO FIXXX AFTER DEMO ///
  activeUser!.accountId = "B62qo69VLUPMXEC6AFWRgjdTEGsA3xKvqeU5CgYm3jAbBJL7dTvaQkv";
  activeUser!.alias = 'DFST';
  
  return activeUser;
};

function saveActiveUser(user: User) {
  if (! user)
    throw Error("profile/setActiveUser: Invalid user profile");
  localStorage.setItem(STORE_KEY, JSON.stringify(user));
  activeUser = user;
  return user;
};

function removeActiveUser() {
  localStorage.removeItem(STORE_KEY);
  activeUser = null;
};
