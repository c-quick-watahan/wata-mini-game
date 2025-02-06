"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInAnonymously } from "@/lib/firebase/firebase";
import CareerWrapper from "./ui/CareerWrapper";
import Spinner from "./ui/Spinner";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user && !loading) {
      signInAnonymously(auth)
        .then((userCredential) => {
          console.log("User", userCredential.user);
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          setError(error);
        });
    }
  }, [user, loading]);
  if (error) return <p>Error: {error}</p>;
  return <div>{user ? <CareerWrapper /> : <Spinner />}</div>;
}
