import type { Experience } from "@/lib/seed/site";
import { shortPeriod } from "@/lib/seed/site";

const COUNTRY: Record<Experience["country"], string> = {
  ID: "Indonesia",
  SG: "Singapore",
  MY: "Malaysia",
  AU: "Australia",
};

/**
 * Career as a plain vertical list: newest first, dates on the left, one line
 * of what the job actually was. Skimmable in a few seconds, no scroll tricks.
 */
export function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative mt-10 space-y-4 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-[2px] before:bg-cobalt-soft md:before:left-[159px]">
      {items.map((e, i) => (
        <li key={e.company + e.period} data-reveal="up" className="relative grid gap-3 pl-8 md:grid-cols-[136px_1fr] md:gap-12 md:pl-0">
          <span
            aria-hidden
            className={`absolute left-0 top-6 h-4 w-4 rounded-full ring-4 ring-white md:left-[152px] ${i === 0 ? "bg-orange" : "bg-cobalt"}`}
          />
          <p className="pt-4 md:text-right">
            <span className={`chip text-sm ${i === 0 ? "bg-orange text-on-orange" : "bg-cobalt-soft text-cobalt"}`}>
              {shortPeriod(e.period)}
            </span>
          </p>
          <div className={`rounded-card p-5 md:p-6 ${i === 0 ? "bg-cobalt text-white" : "bg-surface-2"}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-extrabold leading-tight [font-stretch:112%]">{e.company}</h3>
              <p className={`text-sm font-semibold ${i === 0 ? "text-white/75" : "text-muted"}`}>{e.period}</p>
            </div>
            <p className="mt-1 font-bold">
              {e.role}
              <span className={`font-normal ${i === 0 ? "text-white/80" : "text-muted"}`}>
                {" "}
                · {e.type} · {e.location}
                {e.location.includes(COUNTRY[e.country]) ? "" : `, ${COUNTRY[e.country]}`}
              </span>
            </p>
            <p className={`mt-3 leading-relaxed ${i === 0 ? "text-white/90" : ""}`}>{e.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
