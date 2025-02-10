"use client";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInAnonymously, db } from "@/lib/firebase/firebase";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import CareerWrapper from "./ui/CareerWrapper";
import Spinner from "./ui/Spinner";
import { UserCredential } from "firebase/auth";
import { Career } from "./interfaces/Game";
import StartButtonModal from "./ui/StartButtonModal";

async function addStuff(userCredential: UserCredential) {
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
  const [startModalVisible, setStartModalVisible] = useState(true);

  function flipModal() {
    setStartModalVisible(!startModalVisible);
  }

  const [careers, setCareers] = useState<Career[]>([]);
  useEffect(() => {
    async function getCareers() {
      const querySnapshot = await getDocs(collection(db, "careers"));
      const careersList: Career[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Career;
        careersList.push(data);
      });
      setCareers(careersList);
    }
    getCareers();
  }, []);

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
  return (
    <div>
      {startModalVisible && <StartButtonModal flipModal={flipModal} />}
      {user ? <CareerWrapper key={0} careers={careers} /> : <Spinner />}
    </div>
  );
}
