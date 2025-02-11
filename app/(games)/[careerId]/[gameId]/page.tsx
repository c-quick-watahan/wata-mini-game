"use client";
import Board from "@/app/components/Board";
import { Game } from "@/app/interfaces/Game";
import StartButtonModal from "@/app/ui/StartButtonModal";
import MyStopWatch from "@/app/ui/StopWatch";
import TimeoutModal from "@/app/ui/TimeoutModal";
import { db } from "@/lib/firebase/firebase";

import { collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

export default function Page() {
  const { careerId, gameId } = useParams();
  const [game, setGame] = useState<Game>();
  const [startModalVisible, setStartModalVisible] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeoutModalVisible, setTimeoutModalVisible] = useState(false);

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  function flipStartButtonModal() {
    setStartModalVisible(!startModalVisible);
    setStartTime(Date.now());
    start(); // StopWatch

    // Start the inactivity timer
    setTimeout(() => {
      setTimeoutModalVisible(true); // Show timeout modal
      setEndTime(Date.now()); // Stop collecting time
      pause(); // Stop the timer
    }, 60000); // 60 seconds
  }
  function closeTimeoutModal() {
    setTimeoutModalVisible(false);
    window.location.reload(); // Refresh the page
  }

  // Timer functions
  function end() {
    setEndTime(Date.now());
  }
  useEffect(() => {
    console.log("Start Time: ", startTime);
  }, [startTime]);
  useEffect(() => {
    console.log("End Time: ", endTime);
    setTimeElapsed(Math.abs(endTime - startTime) / 1000); // gotta be positive
  }, [endTime]);
  useEffect(() => {
    console.log("Elapsed: ", timeElapsed);
  }, [timeElapsed]);

  // Get the game data
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
      {startModalVisible && (
        <StartButtonModal flipStartButtonModal={flipStartButtonModal} />
      )}
      {timeoutModalVisible && (
        <>
          <TimeoutModal closeTimeoutModal={closeTimeoutModal} />
        </>
      )}
      <MyStopWatch seconds={seconds} minutes={minutes} />
      <div id="page" className=" flex justify-center">
        {game && <Board game={game} end={end} />}
      </div>
    </>
  );
}
