import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CATEGORIES, type Project } from "@/lib/types";

/** Six picks, whole covers in a masonry, plus shortcuts into each industry. */
export function FeaturedWork({ featured, all }: { featured: Project[]; all: Project[] }) {
  const client = all.filter((p) => p.category !== "side");
  const doors = CATEGORIES.filter((c) => c.id !== "side").map((c) => ({
    ...c,
    count: client.filter((p) => p.category === c.id).length,
  }));

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 pt-16 md:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="bubble mb-5 text-sm">{client.length} client projects</p>
          <h2 id="work-title" className="display text-[clamp(2.4rem,6vw,5rem)]">
            Selected <span className="text-cobalt">work</span>
          </h2>
          <Doodle name="underline" className="mt-3 w-40 text-orange md:w-52" strokeWidth={7} intro={false} />
        </div>
        <TransitionLink href="/work" className="btn btn-primary">
          See all {client.length} <ArrowRight size={18} weight="bold" aria-hidden />
        </TransitionLink>
      </div>

      <nav aria-label="Work by industry" className="mt-8 flex flex-wrap gap-2">
        {doors.map((d) => (
          <TransitionLink
            key={d.id}
            href={`/work?c=${d.id}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-surface-2 px-4 text-sm font-bold hover:bg-orange hover:text-on-orange"
          >
            {d.label}
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs">{d.count}</span>
          </TransitionLink>
        ))}
      </nav>

      <ul className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
        {featured.map((p) => (
          <li key={p.slug} data-reveal="pop" className="mb-10 break-inside-avoid">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
