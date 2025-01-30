import { Guid } from "guid-typescript";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ careerGuid: Guid }>;
}) {
  const { careerGuid } = await params;
  return (
    <div className="flex flex-col items-center">{careerGuid.toString()}</div>
  );
}
