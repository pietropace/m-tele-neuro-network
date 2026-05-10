import Hero from "@/components/sections/Hero";
import CongressSections from "@/components/sections/CongressSections";
import NetworkSection from "@/components/sections/NetworkSection";
import TeamSection from "@/components/sections/TeamSection";
import SanityEditorialSection from "@/components/sections/SanityEditorialSection";
import FooterSection from "@/components/sections/FooterSection";
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
    <main>
      <Hero content={homepageContent} />
      <NetworkSection />
      <TeamSection />
      <SanityEditorialSection content={homepageContent} />
      <CongressSections />
      <FooterSection />
    </main>
  );
}
