import { useId } from "react";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";

/**
 * Round orange sticker with text running around the edge, like the
 * "Get started for free" badge in the reference. The ring of text turns
 * slowly; the arrow in the middle stays put. Links to the contact page.
 */
export function Sticker({
  text = "Open for work • Let's talk • ",
  href = "/contact",
  className = "",
  label = "Let's talk",
  intro = false,
}: {
  text?: string;
  href?: string;
  className?: string;
  label?: string;
  /** Pop in with the surrounding IntroScope. */
  intro?: boolean;
}) {
  const ring = `ring-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <TransitionLink
      href={href}
      aria-label={label}
      {...(intro ? { "data-pop": "", "data-intro": "" } : {})}
      className={`group relative grid aspect-square place-items-center rounded-full bg-orange text-on-orange shadow-[0_18px_40px_-18px_rgba(0,20,90,0.6)] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id={ring} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="fill-current" style={{ fontSize: 19.5, fontWeight: 900, letterSpacing: "0.12em", fontStretch: "112%" }}>
          <textPath href={`#${ring}`} textLength="448">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <Doodle
        name="swirl"
        intro={false}
        strokeWidth={5}
        className="relative w-[34%] transition-transform duration-500 group-hover:rotate-12"
      />
    </TransitionLink>
  );
}
