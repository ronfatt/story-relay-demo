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
    difficulty?: string;
  };
}) {
  return (
    <PlayClient
      initialName={searchParams?.name ?? ""}
      initialTheme={searchParams?.theme ?? ""}
      initialWorld={searchParams?.world ?? ""}
      initialBranch={searchParams?.branch ?? ""}
      initialDifficulty={searchParams?.difficulty ?? ""}
    />
  );
}
