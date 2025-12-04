import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase"; // from your firebase.js

// SIGN UP – create user in Firebase Auth + Firestore "users" doc
export const signUpUser = async (email, password) => {
  try {
    console.log("Creating Firebase user account...");

    // Step 1: Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Firebase user created:", user.uid);
    console.log("Storing user in Firestore...");

    // Step 2: Store user in Firestore 
    // You can add whatever fields you want here
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    console.log("User stored in Firestore!");
    console.log("Sign up complete!");

    return user;
  } catch (error) {
    console.error("Signup error", error.code, error.message);
    throw error;
  }
};

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