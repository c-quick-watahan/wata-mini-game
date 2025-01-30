import { careers } from "@/app/interfaces/Game";
import React from "react";
import { Id } from "../d-sort/types";
import GameWrapper from "@/app/ui/GameWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ careerGuid: Id }>;
}) {
  const { careerGuid } = await params;
  console.log("Page", careerGuid);
  const career = careers.find((career) => career.careerGuid === careerGuid);
  return (
    <>
      <GameWrapper careerGuid={careerGuid} games={career?.games || []} />
    </>
  );
}
