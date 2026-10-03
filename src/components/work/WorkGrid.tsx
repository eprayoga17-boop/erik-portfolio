"use client";
import { useRef, useState } from "react";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import type { CategoryId, Project } from "@/lib/types";
import { ProjectCard } from "@/components/work/ProjectCard";

type Filter = { id: CategoryId | "all"; label: string; count: number };

/**
 * Filterable work index as a masonry of whole, uncropped covers.
 * Filtering reflows with GSAP Flip so cards slide to their new spots,
 * and the URL keeps the filter (?c=) so a filtered view can be shared.
 */
export function WorkGrid({
  projects,
  filters,
  initial,
}: {
  projects: Project[];
  filters: Filter[];
  initial: CategoryId | "all";
}) {
  const [active, setActive] = useState<CategoryId | "all">(initial);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const visible = projects.filter((p) => active === "all" || p.category === active);

  const choose = (id: CategoryId | "all") => {
    if (id === active) return;
    if (grid.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flipState.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]"));
    }
    setActive(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("c");
    else url.searchParams.set("c", id);
    window.history.replaceState(window.history.state, "", url);
  };

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.7,
        ease: "expo.inOut",
        absolute: true,
        stagger: 0.03,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.4 }),
      });
      flipState.current = null;
    },
    { dependencies: [active], scope: grid },
  );

  return (
    <>
      <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => choose(f.id)}
            aria-pressed={active === f.id}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors ${
              active === f.id ? "bg-cobalt text-white" : "bg-white text-ink ring-1 ring-line hover:bg-orange hover:text-on-orange hover:ring-orange"
            }`}
          >
            {f.label}
            <span
              className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs ${
                active === f.id ? "bg-orange text-on-orange" : "bg-surface-2"
              }`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <ul ref={grid} className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
        {visible.map((p, i) => (
          <li key={p.slug} data-flip-id={p.slug} className="mb-10 break-inside-avoid">
            <ProjectCard project={p} priority={i < 3} />
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="mt-12 text-muted">Nothing here yet. Try another filter.</p>}
    </>
  );
}
