import { careers } from "@/app/interfaces/Game";
import React from "react";
import { Id } from "../d-sort/types";

export default async function Page({
  params,
}: {
  params: Promise<{ careerId: Id }>;
}) {
  const { careerId } = await params;
  const career = careers.find((career) => career.careerId === careerId);
  return (
    <>
      <GameWrapper careerId={careerId} games={career?.games || []} />
    </>
  );
}
