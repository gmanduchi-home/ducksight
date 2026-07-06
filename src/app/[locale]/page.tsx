import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ServicesSection } from "@/components/ServicesSection";
import { AreasSection } from "@/components/AreasSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { getVideos } from "@/sanity/fetch";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const videos = await getVideos();

  return (
    <>
      <Hero />
      {/* Portfolio (video) — sezione più importante, subito dopo l'Hero */}
      <VideoSection videos={videos} />
      {/* Foto selezionate */}
      <ProjectGrid />
      <ServicesSection />
      <AreasSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
