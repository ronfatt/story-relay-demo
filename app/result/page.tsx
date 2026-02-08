import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export default function ResultPage({
  searchParams
}: {
  searchParams?: { sessionId?: string; storyId?: string; lang?: "en" | "zh" | "ms" };
}) {
  return (
    <ResultClient
      sessionId={searchParams?.sessionId}
      storyId={searchParams?.storyId}
      lang={(searchParams?.lang as "en" | "zh" | "ms") ?? "en"}
    />
  );
}
