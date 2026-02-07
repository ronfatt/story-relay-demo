import ReplayClient from "./ReplayClient";

export const dynamic = "force-dynamic";

export default function ReplayPage({
  searchParams
}: {
  searchParams?: { sessionId?: string; lang?: "en" | "zh" | "ms" };
}) {
  return (
    <ReplayClient
      sessionId={searchParams?.sessionId}
      lang={(searchParams?.lang as "en" | "zh" | "ms") ?? "en"}
    />
  );
}
