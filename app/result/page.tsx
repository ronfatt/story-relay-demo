import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export default function ResultPage({
  searchParams
}: {
  searchParams?: { sessionId?: string; lang?: "en" | "zh" | "ms" };
}) {
  return (
    <ResultClient
      sessionId={searchParams?.sessionId}
      lang={(searchParams?.lang as "en" | "zh" | "ms") ?? "en"}
    />
  );
}
