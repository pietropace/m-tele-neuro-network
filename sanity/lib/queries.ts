import { defineQuery } from "next-sanity";

export const HOMEPAGE_CONTENT_QUERY = defineQuery(`*[_type == "homepageContent"][0]{
  heroEyebrow,
  heroTitleLineOne,
  heroTitleLineTwo,
  heroSubtitle,
  contentSections[]{title, eyebrow, body},
  featuredArticles[]->{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    authors[]->{name},
    coverImage
  },
  featuredPosters[]->{
    _id,
    title,
    abstract,
    year,
    authors[]->{name}
  }
}`);

export const ARTICLES_QUERY = defineQuery(`*[_type == "article" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  authors[]->{name},
  hospitalCenter->{name, city},
  coverImage
}`);

export const HOSPITAL_CENTERS_QUERY = defineQuery(`*[_type == "hospitalCenter"]|order(name asc){
  _id,
  name,
  city,
  region,
  description,
  image
}`);

export const SCIENTIFIC_POSTERS_QUERY = defineQuery(`*[_type == "scientificPoster"]|order(year desc, title asc)[0...12]{
  _id,
  title,
  abstract,
  year,
  authors[]->{name},
  hospitalCenter->{name, city},
  posterImage
}`);
