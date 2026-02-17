import PlayClient from "./PlayClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function pickParam(input?: string | string[]) {
  if (!input) return "";
  return Array.isArray(input) ? input[0] ?? "" : input;
}

export default async function PlayPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const initialWorld = pickParam(params?.world);
  const initialBranch = pickParam(params?.branch);
  const initialDifficulty = pickParam(params?.difficulty);
  const initialName = pickParam(params?.name);

  if (!initialWorld || !initialBranch) {
    redirect("/setup");
  }

  return (
    <PlayClient
      initialName={initialName}
      initialWorld={initialWorld}
      initialBranch={initialBranch}
      initialDifficulty={initialDifficulty}
    />
  );
}
