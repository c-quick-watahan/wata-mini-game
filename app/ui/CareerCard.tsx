import React from "react";
import { careers } from "../interfaces/Game";
import Link from "next/link";
import { Id } from "../interfaces/types";

export default function CareerCard({ careerGuid }: { careerGuid: Id }) {
  const career = careers.find((career) => career.careerGuid === careerGuid);
  return (
    <div
      key={careerGuid}
      className="card bg-base-100 w-auto sm:w-96 shadow-xl flex items-center justify-center"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-0 text-center">
        <h2 className="card-title">{career?.careerName}</h2>
        <div className="card-actions"></div>
      </div>
      <Link href={`/${careerGuid}`}>Play {career?.careerName}</Link>
    </div>
  );
}
