import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  return <div className="flex flex-col items-center">{gameId}</div>;
}
