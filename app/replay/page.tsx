import ReplayClient from "./ReplayClient";

export const dynamic = "force-dynamic";

export default function ReplayPage({
  searchParams
}: {
  searchParams?: { sessionId?: string };
}) {
  return <ReplayClient sessionId={searchParams?.sessionId} />;
}
