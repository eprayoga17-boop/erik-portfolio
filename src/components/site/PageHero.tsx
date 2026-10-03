import { IntroScope } from "@/components/motion/IntroScope";
import { Doodle } from "@/components/site/Doodle";

/**
 * Every inner page opens with the same cobalt panel as the home page,
 * so the header always starts on cobalt and the site reads as one piece.
 * `lines` are the big display lines; `accent` is an optional orange word
 * prefix (like the reference's "#").
 */
export function PageHero({
  eyebrow,
  lines,
  accent,
  intro,
  children,
  aside,
  compact = false,
  size = "lg",
}: {
  eyebrow?: React.ReactNode;
  lines: string[];
  accent?: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  compact?: boolean;
  /** "md" for project names, "sm" for names with a very long word. */
  size?: "lg" | "md" | "sm";
}) {
  return (
    <div className="px-2.5 pt-2.5 md:px-4 md:pt-4">
      <IntroScope
        as="header"
        className={`panel-cobalt mx-auto max-w-[1600px] px-5 md:px-10 ${compact ? "pb-14 pt-28 md:pb-16 md:pt-32" : "pb-16 pt-28 md:pb-24 md:pt-36"}`}
      >
        <div className={`mx-auto grid max-w-[1280px] items-end gap-10 ${aside ? "lg:grid-cols-[1.35fr_0.65fr]" : ""}`}>
          <div className="relative">
            {eyebrow && (
              <p data-fade data-intro className="mb-6">
                {eyebrow}
              </p>
            )}
            <h1
              className={`display leading-[0.9] ${
                size === "sm"
                  ? "text-[clamp(1.7rem,6.4vw,4.8rem)] [overflow-wrap:anywhere]"
                  : size === "md"
                    ? "text-[clamp(2.1rem,8vw,5.4rem)] [overflow-wrap:anywhere]"
                    : aside
                      ? "text-[clamp(2.7rem,8.4vw,7.6rem)] lg:text-[clamp(3rem,6.2vw,6rem)]"
                      : "text-[clamp(2.7rem,8.4vw,7.6rem)]"
              }`}
            >
              {lines.map((l, i) => (
                <span key={l + i} className="block overflow-hidden pb-[0.06em]">
                  <span data-line className="block">
                    {i === 0 && accent && <span className="text-orange">{accent}</span>}
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            {intro && (
              <div data-fade data-intro className="mt-7 max-w-[56ch] text-lg leading-relaxed text-white/85 md:text-xl">
                {intro}
              </div>
            )}
            {children && (
              <div data-fade data-intro className="mt-8">
                {children}
              </div>
            )}
            <Doodle name="underline" className="mt-6 w-44 text-orange md:w-56" strokeWidth={8} />
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </IntroScope>
    </div>
  );
}
