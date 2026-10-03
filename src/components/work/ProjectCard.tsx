import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { TransitionLink } from "@/components/motion/PageTransition";
import { imageUrl } from "@/lib/images";
import { CATEGORIES, type Project } from "@/lib/types";

/**
 * The cover is always shown whole, at its own aspect ratio (no object-cover),
 * so nothing in the work gets cut off. Use it inside a masonry column layout.
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const cat = CATEGORIES.find((c) => c.id === project.category);
  const short = cat?.short ?? project.category;
  return (
    <TransitionLink href={`/work/${project.slug}`} className="group block" aria-label={`${project.title}, ${cat?.label ?? short}`}>
      <div className="relative" style={{ "--accent": project.accent } as React.CSSProperties}>
        <div className="overflow-hidden rounded-card bg-surface-2 shadow-[0_18px_40px_-28px_rgba(0,30,110,0.45)] ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-1.5 group-hover:-rotate-[0.6deg] group-hover:shadow-[0_28px_50px_-24px_rgba(0,30,110,0.5)] group-hover:ring-4 group-hover:ring-[var(--accent)] group-focus-visible:ring-4 group-focus-visible:ring-[var(--accent)]">
          {project.cover ? (
            <Image
              src={imageUrl(project.cover.path)}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              priority={priority}
              sizes="(min-width: 1280px) 420px, (min-width: 768px) 46vw, 100vw"
              className="h-auto w-full"
            />
          ) : (
            <div className="aspect-[16/9]" />
          )}
        </div>
        <span
          aria-hidden
          className="absolute right-3 top-3 grid h-11 w-11 scale-75 place-items-center rounded-full bg-orange text-on-orange opacity-0 transition duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight size={20} weight="bold" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="text-xl font-extrabold leading-tight [font-stretch:112%]">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.summary.split(". ")[0].replace(/\.$/, "")}.</p>
        </div>
        <span className="chip mt-0.5 shrink-0 bg-cobalt-soft text-xs text-cobalt">{short}</span>
      </div>
    </TransitionLink>
  );
}
