import { defineField, defineType } from "sanity";

export const hospitalCenter = defineType({
  name: "hospitalCenter",
  title: "Hospital Center",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
});
