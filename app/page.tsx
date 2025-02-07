"use client";
import { use, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInAnonymously, db } from "@/lib/firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import CareerWrapper from "./ui/CareerWrapper";
import Spinner from "./ui/Spinner";
import { UserCredential } from "firebase/auth";

async function addStuff(userCredential: UserCredential) {
  console.log("User", userCredential.user);
  try {
    const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {
      id: userCredential.user.uid,
      gamesComplete: [],
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      return;
    } else if (!user) {
      signInAnonymously(auth).then((userCredential) => {
        addStuff(userCredential);
      });
    } else {
      return;
    }
  }, [loading]);
  if (error) return <p>Error: {error}</p>;
  return <div>{user ? <CareerWrapper /> : <Spinner />}</div>;
}
