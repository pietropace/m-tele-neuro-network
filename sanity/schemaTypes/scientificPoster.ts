import { defineField, defineType } from "sanity";

export const scientificPoster = defineType({
  name: "scientificPoster",
  title: "Scientific Poster",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "abstract", title: "Abstract", type: "text", rows: 6 }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "posterImage", title: "Poster image", type: "image", options: { hotspot: true } }),
    defineField({ name: "authors", title: "Authors", type: "array", of: [{ type: "reference", to: [{ type: "author" }] }] }),
    defineField({ name: "hospitalCenter", title: "Hospital center", type: "reference", to: [{ type: "hospitalCenter" }] }),
  ],
});
