import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Container from "../ui/Container";

type HomepageContent = {
  contentSections?: { title?: string; eyebrow?: string; body?: string }[];
  featuredArticles?: {
    _id: string;
    title?: string;
    excerpt?: string;
    publishedAt?: string;
    authors?: { name?: string }[];
    coverImage?: unknown;
  }[];
  featuredPosters?: {
    _id: string;
    title?: string;
    abstract?: string;
    year?: number;
    authors?: { name?: string }[];
    posterImage?: unknown;
  }[];
};

export default function SanityEditorialSection({ content }: { content: HomepageContent | null }) {
  const sections = content?.contentSections ?? [];
  const articles = content?.featuredArticles ?? [];
  const posters = content?.featuredPosters ?? [];

  if (!sections.length && !articles.length && !posters.length) {
    return null;
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#377082]">
              Scientific updates
            </p>
            <h2 className="mt-5 font-serif text-[3.4rem] leading-[0.92] tracking-[-0.035em] text-[#1F2F35] md:text-[5rem]">
              Editorial content
            </h2>
          </div>

          <div className="grid gap-5 lg:col-span-8">
            {sections.map((section) => (
              <article key={`${section.eyebrow}-${section.title}`} className="thin-border p-7">
                {section.eyebrow && (
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A8E95]">
                    {section.eyebrow}
                  </p>
                )}
                {section.title && (
                  <h3 className="mt-4 text-2xl font-light text-[#1F2F35]">{section.title}</h3>
                )}
                {section.body && (
                  <p className="mt-4 text-sm leading-7 text-[#4F5E64]">{section.body}</p>
                )}
              </article>
            ))}

            {articles.map((article) => (
              <article key={article._id} className="thin-border p-7">
                {article.coverImage ? (
                  <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-[#D9E5E8]">
                    <Image
                      src={urlFor(article.coverImage)?.width(1200).height(675).fit("crop").url() ?? ""}
                      alt={article.title ?? "Article cover image"}
                      fill
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A8E95]">
                  Article
                </p>
                <h3 className="mt-4 text-2xl font-light text-[#1F2F35]">{article.title}</h3>
                {article.excerpt && (
                  <p className="mt-4 text-sm leading-7 text-[#4F5E64]">{article.excerpt}</p>
                )}
              </article>
            ))}

            {posters.map((poster) => (
              <article key={poster._id} className="thin-border p-7">
                {poster.posterImage ? (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-[#D9E5E8]">
                    <Image
                      src={urlFor(poster.posterImage)?.width(1000).height(750).fit("crop").url() ?? ""}
                      alt={poster.title ?? "Scientific poster image"}
                      fill
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A8E95]">
                  Scientific poster {poster.year ? ` / ${poster.year}` : ""}
                </p>
                <h3 className="mt-4 text-2xl font-light text-[#1F2F35]">{poster.title}</h3>
                {poster.abstract && (
                  <p className="mt-4 text-sm leading-7 text-[#4F5E64]">{poster.abstract}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
