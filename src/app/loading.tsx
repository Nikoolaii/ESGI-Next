import { PageSkeleton } from "@/components/LoadingSkeleton";
import { Header } from "@/components/Header";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <PageSkeleton />
      </main>
    </>
  );
}
