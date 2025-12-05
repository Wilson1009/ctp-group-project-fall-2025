import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


import { auth, db } from "./firebase"; // from your firebase.js

// LOGIN – authenticate existing user
export const loginUser = async (email, password) => {
  try {
    console.log("Logging in user...");

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Login successful:", user.email);

    return user;
  } catch (error) {
    console.error("Login error", error.code, error.message);
    throw error;
  }
};

// LOGOUT – sign out current user
export const logoutUser = async () => {
  try {
    console.log("Logging out...");
    await signOut(auth);
    console.log("Logged out.");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// AUTH STATE LISTENER – monitor login/logout
// callback gets either a Firebase user object or null
export const subscribeToAuthChanges = (callback) => {
  // Returns an unsubscribe function
  return onAuthStateChanged(auth, callback);
};

// GET CURRENT USER – synchronous snapshot of current user
export const getCurrentUser = () => {
  return auth.currentUser;
};