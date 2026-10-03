import type { Metadata } from "next";
import { Trophy } from "@phosphor-icons/react/dist/ssr";
import { FannedCards } from "@/components/site/FannedCards";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getPublishedProjects } from "@/lib/data/projects";
import { imageUrl } from "@/lib/images";
import { achievements } from "@/lib/seed/site";

export const metadata: Metadata = {
  title: "Side quests",
  description: "Personal projects and design competitions: a food stall, a galaxy-themed shop, and a logo that won first place.",
  alternates: { canonical: "/side-quests" },
};

export default async function SideQuestsPage() {
  const projects = (await getPublishedProjects()).filter((p) => p.category === "side");

  const fan = projects
    .filter((p) => p.cover)
    .map((p) => ({ src: imageUrl(p.cover!.path), alt: p.cover!.alt, width: p.cover!.width, height: p.cover!.height }));

  return (
    <>
      <PageHero
        compact
        aside={<FannedCards images={fan} />}
        eyebrow={<span className="bubble text-sm">Personal projects & competitions</span>}
        lines={["Side", "quests"]}
        intro="Stuff I do when nobody's paying me. A rice stall, a little shop full of stars, and a habit of entering design competitions. It's where I learn what client briefs don't teach."
      />
      <div className="relative z-10 -mt-8 px-2.5 md:-mt-12 md:px-4">
        <div className="mx-auto max-w-[1520px] rounded-card bg-white px-4 py-6 md:rounded-panel md:px-10 md:py-10">
          <section aria-labelledby="trophies">
            <h2 id="trophies" className="text-xl font-extrabold">
              Trophy shelf
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {achievements.map((a, i) => (
                <li
                  key={a}
                  data-reveal="pop"
                  className={`inline-flex min-h-12 items-center gap-2.5 rounded-full px-5 font-bold ${
                    i === 0 ? "bg-orange text-on-orange" : "bg-surface-2"
                  }`}
                >
                  <Trophy size={20} weight="bold" aria-hidden className="shrink-0" /> {a}
                </li>
              ))}
            </ul>
          </section>

          <ul className="mt-12 columns-1 gap-6 md:columns-2 xl:columns-3">
            {projects.map((p, i) => (
              <li key={p.slug} data-reveal="pop" className="mb-10 break-inside-avoid">
                <ProjectCard project={p} priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
