import Hero from "@/components/sections/Hero";
import CongressSections from "@/components/sections/CongressSections";
import NetworkSection from "@/components/sections/NetworkSection";
import TeamSection from "@/components/sections/TeamSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <NetworkSection />
      <TeamSection />
      <CongressSections />
    </main>
  );
}
