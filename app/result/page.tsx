import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const ResultClient = dynamic(() => import("./ResultClient"), {
  ssr: false,
  loading: () => <main className="card">Loading...</main>
});

export default function ResultPage() {
  return <ResultClient />;
}
