import React from "react";
import { Career, careers, Id } from "../interfaces/Game";
import Link from "next/link";
import { Guid } from "guid-typescript";

export default function gameCard({ careerGuid }: { careerGuid: Guid }) {
  const career = careers.find((career) => career.careerGuid === careerGuid);
  return (
    <div
      key={careerGuid.toString()}
      className="card bg-base-100 w-auto sm:w-96 shadow-xl flex items-center justify-center"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-0 text-center">
        <h2 className="card-title">{career?.careerName}</h2>
        {/* <h3>{url}</h3> */}
        <div className="card-actions"></div>
      </div>
      <Link href={`/${careerGuid.toString()}`}>Play {career?.careerName}</Link>
    </div>
  );
}
