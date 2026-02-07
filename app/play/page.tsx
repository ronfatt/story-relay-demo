import PlayClient from "./PlayClient";

export const dynamic = "force-dynamic";

export default function PlayPage({
  searchParams
}: {
  searchParams?: { name?: string; theme?: string; lang?: "en" | "zh" | "ms" };
}) {
  return (
    <PlayClient
      initialName={searchParams?.name ?? ""}
      initialTheme={searchParams?.theme ?? ""}
      initialLang={(searchParams?.lang as "en" | "zh" | "ms") ?? "en"}
    />
  );
}
