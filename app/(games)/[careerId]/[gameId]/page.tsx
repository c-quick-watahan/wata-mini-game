"use client";
import Board from "@/app/components/Board";
import { Game } from "@/app/interfaces/Game";
import StartButtonModal from "@/app/ui/StartButtonModal";
import { db } from "@/lib/firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { careerId, gameId } = useParams();
  const [game, setGame] = useState<Game>();
  const [startModalVisible, setStartModalVisible] = useState(true);

  function flipModal() {
    setStartModalVisible(!startModalVisible);
  }
  useEffect(() => {
    async function getCareers() {
      if (!careerId) return;
      const careerRef = doc(collection(db, "careers"), careerId.toString());
      const docSnap = await getDoc(careerRef);

      const careerData = docSnap.data();
      const gameData = careerData?.games.find(
        (game: { gameId: string | string[] | undefined }) =>
          game.gameId === gameId
      );
      if (!gameData) return;
      setGame(gameData);
    }

    getCareers();
  }, []);

  return (
    <>
      {startModalVisible && <StartButtonModal flipModal={flipModal} />}
      <div id="page" className=" flex justify-center">
        {game && <Board game={game} />}
      </div>
    </>
  );
}
