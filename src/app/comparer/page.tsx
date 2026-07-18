import { Header } from "@/components/Header";
import { ComparePageClient } from "@/components/ComparePageClient";

export default function ComparePage() {
  return (
    <>
      <Header active="compare" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <ComparePageClient />
      </main>
    </>
  );
}
