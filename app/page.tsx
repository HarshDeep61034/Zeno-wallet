import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <div className="mt-24">
        <Hero />
      </div>
    </main>
  );
}
