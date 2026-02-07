import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export default function ResultPage({
  searchParams
}: {
  searchParams?: { sessionId?: string };
}) {
  return <ResultClient sessionId={searchParams?.sessionId} />;
}
