"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Plays the entrance for a cobalt panel and everything marked inside it:
 *   [data-line]   headline lines rise out of a masked row
 *   [data-pop]    stickers and frosted cards pop in with a little overshoot
 *   [data-draw]   doodle paths draw themselves
 *   [data-fade]   copy and buttons slide up
 * On scroll, [data-speed] elements drift at their own pace (parallax), and
 * with a fine pointer, [data-float] elements lean toward the cursor.
 * Under reduced motion none of this runs and everything is simply visible.
 */
export function IntroScope({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header";
} & React.HTMLAttributes<HTMLElement>) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const lines = q("[data-line]");
        const pops = q("[data-pop]");
        const draws = q("[data-draw] path");
        const fades = q("[data-fade]");

        gsap.set(q("[data-intro]"), { opacity: 1 });
        if (lines.length) gsap.set(lines, { yPercent: 105 });
        if (pops.length) gsap.set(pops, { scale: 0.4, opacity: 0, rotate: (i) => (i % 2 ? 14 : -14) });
        if (draws.length) gsap.set(draws, { strokeDasharray: 1, strokeDashoffset: 1 });
        if (fades.length) gsap.set(fades, { y: 24, opacity: 0 });

        const tl = gsap.timeline({ delay: 0.05 });
        if (lines.length) tl.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "expo.out" }, 0);
        if (pops.length)
          tl.to(
            pops,
            { scale: 1, opacity: 1, rotate: (_, el) => Number((el as HTMLElement).dataset.rotate ?? 0), duration: 0.9, stagger: 0.09, ease: "back.out(1.9)" },
            0.35,
          );
        if (draws.length) tl.to(draws, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: "power2.inOut" }, 0.6);
        if (fades.length) tl.to(fades, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0.45);

        // Scroll parallax: each element drifts by its own data-speed (in % of its height).
        q("[data-speed]").forEach((el) => {
          const speed = Number((el as HTMLElement).dataset.speed);
          gsap.to(el, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
          });
        });

        // Pointer lean, desktop only.
        const floats = q("[data-float]") as HTMLElement[];
        if (floats.length && window.matchMedia("(pointer: fine)").matches) {
          const movers = floats.map((el) => ({
            depth: Number(el.dataset.float || 1),
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => {
              m.x(nx * 26 * m.depth);
              m.y(ny * 18 * m.depth);
            });
          };
          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        }
      });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <Tag ref={root as React.Ref<HTMLDivElement>} className={className} {...rest}>
      {children}
    </Tag>
  );
}
