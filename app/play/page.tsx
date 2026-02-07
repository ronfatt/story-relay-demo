import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const PlayClient = dynamic(() => import("./PlayClient"), {
  ssr: false,
  loading: () => <main className="card">Loading...</main>
});

export default function PlayPage() {
  return <PlayClient />;
}
