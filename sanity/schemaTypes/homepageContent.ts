import { defineField, defineType } from "sanity";

export const homepageContent = defineType({
  name: "homepageContent",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroTitleLineOne", title: "Hero title line one", type: "string" }),
    defineField({ name: "heroTitleLineTwo", title: "Hero title line two", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 3 }),
    defineField({
      name: "contentSections",
      title: "Content sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "eyebrow", title: "Eyebrow", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 5 },
          ],
        },
      ],
    }),
    defineField({ name: "featuredArticles", title: "Featured articles", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),
    defineField({ name: "featuredPosters", title: "Featured posters", type: "array", of: [{ type: "reference", to: [{ type: "scientificPoster" }] }] }),
  ],
});
