import type { Metadata } from "next";
import { FannedCards } from "@/components/site/FannedCards";
import { PageHero } from "@/components/site/PageHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getPublishedProjects } from "@/lib/data/projects";
import { imageUrl } from "@/lib/images";
import { CATEGORIES, type CategoryId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work",
  description: "Brand identity and social media work for clinics, beauty brands, F&B and service companies.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage({ searchParams }: PageProps<"/work">) {
  const { c } = await searchParams;
  const projects = (await getPublishedProjects()).filter((p) => p.category !== "side");
  const valid = CATEGORIES.map((x) => x.id as string);
  const initial = (typeof c === "string" && valid.includes(c) ? c : "all") as CategoryId | "all";

  const filters = [
    { id: "all" as const, label: "All", count: projects.length },
    ...CATEGORIES.filter((x) => x.id !== "side").map((x) => ({
      id: x.id,
      label: x.label,
      count: projects.filter((p) => p.category === x.id).length,
    })),
  ];

  const fan = projects
    .filter((p) => p.cover && p.cover.width > p.cover.height)
    .slice(0, 3)
    .map((p) => ({ src: imageUrl(p.cover!.path), alt: p.cover!.alt, width: p.cover!.width, height: p.cover!.height }));

  return (
    <>
      <PageHero
        compact
        aside={<FannedCards images={fan} />}
        eyebrow={<span className="bubble text-sm">{projects.length} client projects</span>}
        accent="#"
        lines={["Selected", "work"]}
        intro="Feeds, identities, campaigns and the odd app. Mostly health, beauty and food brands across Indonesia, Singapore and Malaysia."
      />
      <div className="relative z-10 -mt-8 px-2.5 md:-mt-12 md:px-4">
        <div className="mx-auto max-w-[1520px] rounded-card bg-white px-4 py-6 md:rounded-panel md:px-10 md:py-10">
          <WorkGrid projects={projects} filters={filters} initial={initial} />
        </div>
      </div>
    </>
  );
}
