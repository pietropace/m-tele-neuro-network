import Hero from "@/components/sections/Hero";
import CongressSections from "@/components/sections/CongressSections";
import NetworkSection from "@/components/sections/NetworkSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <NetworkSection />
      <CongressSections />
    </main>
  );
}
