import { useTranslations } from "next-intl";
import { getProjects } from "@/sanity/fetch";
import { ProjectCard } from "./ProjectCard";

// Server Component async: carica progetti da Sanity (con fallback a dati statici)
export async function ProjectGrid() {
  const projects = await getProjects();
  return <ProjectGridView projects={projects} />;
}

function ProjectGridView({
  projects,
}: {
  projects: Awaited<ReturnType<typeof getProjects>>;
}) {
  const t = useTranslations("Stories");

  return (
    <section id="work" className="relative bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-teal">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-ink/65 md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
