import { Id } from "@/app/interfaces/types";
import GameWrapper from "@/app/ui/GameWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ careerId: Id }>;
}) {
  const { careerId } = await params;

  return (
    <>
      <GameWrapper key={careerId} careerId={careerId} />
    </>
  );
}
