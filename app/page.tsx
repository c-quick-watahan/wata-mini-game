"use client";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import CareerWrapper from "./ui/CareerWrapper";
import { useEffect, useState } from "react";
import { firebaseConfig } from "@/lib/firebase/config";
import SignIn from "@/lib/firebase/components/signin";
// import SignIn from "./components/lib/firebase/components/signin";
// import { firebaseConfig } from "./components/lib/firebase/config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export default function Home() {
  const [user, loading] = useAuthState(auth); // `loading` indicates if auth state is still being checked
  const [isInitialized, setIsInitialized] = useState(false); // Track if Firebase auth is initialized

  useEffect(() => {
    // Ensure Firebase auth is initialized
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  if (loading || !isInitialized) {
    // Show a loading spinner or placeholder while checking auth state
    return <div>Loading...</div>;
  }

  return <div>{user ? <CareerWrapper /> : <SignIn />}</div>;
}
