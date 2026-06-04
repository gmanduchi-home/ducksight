import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project" && featured == true] | order(coalesce(order, 9999) asc, year desc) {
    _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    year,
    duration,
    cover,
    videoUrl,
    accent
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 9999) asc, year desc) {
    _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    year,
    duration,
    cover,
    videoUrl,
    accent
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    year,
    duration,
    cover,
    videoUrl,
    accent,
    body
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    key,
    title,
    body
  }
`;

export const videosQuery = groq`
  *[_type == "video"] | order(coalesce(order, 9999) asc, year desc) {
    _id,
    youtubeId,
    type,
    title,
    year
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    heroEyebrow,
    heroTitle,
    heroTitleAccent,
    heroLede,
    aboutBody,
    portrait,
    showreel,
    email,
    instagram,
    linktree
  }
`;
