import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  return <div className="flex flex-col items-center">{title}</div>;
}
