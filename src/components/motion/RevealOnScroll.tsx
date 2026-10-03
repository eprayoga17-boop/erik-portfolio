"use client";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Site-wide scroll reveals for anything marked with data-reveal.
 *   data-reveal="up"    rise + fade (default)
 *   data-reveal="pop"   scale up with a soft overshoot, for cards and images
 * Batched so a row of cards enters as a staggered group.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const ups = gsap.utils.toArray<HTMLElement>('[data-reveal="up"], [data-reveal=""]');
        const pops = gsap.utils.toArray<HTMLElement>('[data-reveal="pop"]');
        if (ups.length) gsap.set(ups, { y: 40, opacity: 0 });
        if (pops.length) gsap.set(pops, { y: 30, scale: 0.94, opacity: 0 });

        if (ups.length) ScrollTrigger.batch(ups, {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9 }),
        });
        if (pops.length) ScrollTrigger.batch(pops, {
          start: "top 98%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, scale: 1, opacity: 1, stagger: 0.08, duration: 0.9, ease: "back.out(1.4)" }),
        });
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
