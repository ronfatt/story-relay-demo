import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const ReplayClient = dynamic(() => import("./ReplayClient"), {
  ssr: false,
  loading: () => <main className="card">Loading...</main>
});

export default function ReplayPage() {
  return <ReplayClient />;
}
