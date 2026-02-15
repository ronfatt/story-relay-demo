import PlayClient from "./PlayClient";

export const dynamic = "force-dynamic";

export default function PlayPage({
  searchParams
}: {
  searchParams?: {
    name?: string;
    theme?: string;
    world?: string;
    branch?: string;
    lang?: "en" | "zh" | "ms";
  };
}) {
  return (
    <PlayClient
      initialName={searchParams?.name ?? ""}
      initialTheme={searchParams?.theme ?? ""}
      initialWorld={searchParams?.world ?? ""}
      initialBranch={searchParams?.branch ?? ""}
      initialLang={(searchParams?.lang as "en" | "zh" | "ms") ?? "en"}
    />
  );
}
