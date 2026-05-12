import Hero from "@/components/sections/Hero";
import CongressSections from "@/components/sections/CongressSections";
import NetworkSection from "@/components/sections/NetworkSection";
import TeamSection from "@/components/sections/TeamSection";
import SanityEditorialSection from "@/components/sections/SanityEditorialSection";
import FooterSection from "@/components/sections/FooterSection";
import ObservatoryPlaySection from "@/components/sections/ObservatoryPlaySection";
import TrainingPortalSection from "@/components/sections/TrainingPortalSection";
import ScrollGuide from "@/components/ui/ScrollGuide";
import { sanityFetch } from "@/sanity/lib/client";
import { HOMEPAGE_CONTENT_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const homepageContent = await sanityFetch<{
    heroEyebrow?: string | null;
    heroTitleLineOne?: string | null;
    heroTitleLineTwo?: string | null;
    heroSubtitle?: string | null;
    contentSections?: { title?: string; eyebrow?: string; body?: string }[];
    featuredArticles?: {
      _id: string;
      title?: string;
      excerpt?: string;
      publishedAt?: string;
      authors?: { name?: string }[];
    }[];
    featuredPosters?: {
      _id: string;
      title?: string;
      abstract?: string;
      year?: number;
      authors?: { name?: string }[];
    }[];
  }>({ query: HOMEPAGE_CONTENT_QUERY });

  return (
    <main id="top">
      <ScrollGuide />
      <Hero content={homepageContent} />
      <div id="network">
        <NetworkSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="updates">
        <SanityEditorialSection content={homepageContent} />
      </div>
      <CongressSections />
      <TrainingPortalSection />
      <ObservatoryPlaySection />
      <div id="contact">
        <FooterSection />
      </div>
    </main>
  );
}
