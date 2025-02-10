import React from "react";
import Link from "next/link";
import { Career } from "../interfaces/Game";

export default function CareerCard({ career }: { career: Career | undefined }) {
  if (!career) return null;
  return (
    <div
      key={career.careerId}
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
      </div>
      <div className="pb-2">
        <Link href={`/${career.careerId}`}>
          <button className="btn btn-primary p-">Play</button>
        </Link>
      </div>
    </div>
  );
}
