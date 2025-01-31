import React from "react";
import { careers } from "../interfaces/Game";
import Link from "next/link";
import { Id } from "../interfaces/types";

export default function CareerCard({ careerId }: { careerId: Id }) {
  const career = careers.find((career) => career.careerId === careerId);
  return (
    <div
      key={careerId}
      className="card 
      bg-cyan-200 
      shadow-cyan-500/50 
      w-auto sm:w-96 shadow-xl 
      flex 
      items-center 
      justify-center 
      text-black 
      hover:bg-cyan-300
      transition-shadow 
      duration-300 
      ease-in-out"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-4 text-center">
        <h2 className="card-title">{career?.careerName}</h2>
        {/* <div className="card-actions"></div> */}
      </div>
      <div className="pb-2">
        <button className="btn btn-primary p-">
          <Link href={`/${careerId}`}>Play</Link>
        </button>
      </div>
    </div>
  );
}
