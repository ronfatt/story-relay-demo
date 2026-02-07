import PlayClient from "./PlayClient";

export const dynamic = "force-dynamic";

export default function PlayPage({
  searchParams
}: {
  searchParams?: { name?: string };
}) {
  return <PlayClient initialName={searchParams?.name ?? ""} />;
}
