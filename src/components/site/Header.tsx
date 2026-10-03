"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DownloadSimple, List, X } from "@phosphor-icons/react";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";
import { Wordmark } from "@/components/site/Wordmark";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis-store";
import { profile } from "@/lib/seed/site";
import type Lenis from "lenis";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/side-quests", label: "Side quests" },
];

/**
 * Every page starts on a cobalt panel, so the header starts transparent with
 * white pills. Once you scroll it becomes a white floating pill bar.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up. Uses Lenis' own scroll event when it runs.
  useEffect(() => {
    let last = 0;
    let bound: Lenis | null = null;
    const apply = (y: number) => {
      setHidden(y > 160 && y > last);
      setScrolled(y > 40);
      last = y;
    };
    const onLenis = ({ scroll }: { scroll: number }) => apply(scroll);
    const onWindow = () => apply(window.scrollY);
    window.addEventListener("scroll", onWindow, { passive: true });
    const unsubscribe = lenisStore.subscribe((lenis) => {
      bound?.off("scroll", onLenis);
      bound = lenis;
      lenis?.on("scroll", onLenis);
    });
    return () => {
      unsubscribe();
      bound?.off("scroll", onLenis);
      window.removeEventListener("scroll", onWindow);
    };
  }, []);

  // Close the menu on navigation (render-time state adjustment, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const lenis = lenisStore.get();
    if (open) lenis?.stop();
    else lenis?.start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(menu.current, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: "expo.out" });
      gsap.from("[data-menu-item]", { yPercent: 110, stagger: 0.06, duration: 0.8, delay: 0.15 });
    },
    { dependencies: [open], scope: menu },
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const solid = scrolled && !open;

  const pill = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full px-4 text-sm font-bold transition-colors duration-300 ${
      solid
        ? active
          ? "bg-cobalt text-white"
          : "text-ink ring-1 ring-line hover:bg-cobalt-soft"
        : active
          ? "bg-white text-cobalt"
          : "text-white ring-1 ring-white/50 hover:bg-white/15"
    }`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-orange focus:px-4 focus:py-2 focus:text-on-orange"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-40 px-2.5 pt-2.5 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:px-4 md:pt-4 ${
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <div
          className={`mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 rounded-full px-3 transition-[background-color,box-shadow,padding] duration-300 md:h-[72px] md:px-6 ${
            solid ? "bg-white/90 shadow-[0_10px_30px_-12px_rgba(0,30,110,0.25)] ring-1 ring-line backdrop-blur-md md:px-3" : ""
          }`}
        >
          <TransitionLink href="/" aria-label="Erik Prayoga, home" className="shrink-0 pl-1">
            <Wordmark tone={solid ? "dark" : "light"} />
          </TransitionLink>

          <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
            {NAV.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={pill(isActive(item.href))}
              >
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvPath}
              download
              className={`hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors lg:inline-flex ${
                solid ? "text-ink hover:bg-cobalt-soft" : "text-white hover:bg-white/15"
              }`}
            >
              <DownloadSimple size={18} weight="bold" aria-hidden /> CV
            </a>
            <TransitionLink
              href="/contact"
              className={`btn hidden min-h-11 md:inline-flex ${solid ? "btn-primary" : "btn-outline-light"}`}
            >
              Let&apos;s talk
            </TransitionLink>
            <button
              ref={toggleBtn}
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-full md:hidden ${
                solid ? "bg-cobalt text-white" : "bg-white text-cobalt"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={menu}
          id="mobile-menu"
          className="panel-cobalt fixed inset-2.5 z-50 flex flex-col justify-between px-6 pb-8 pt-24 md:hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-cobalt"
            aria-label="Close menu"
          >
            <X size={22} weight="bold" />
          </button>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {[...NAV, { href: "/contact", label: "Let's talk" }].map((item) => (
              <div key={item.href} className="overflow-hidden">
                <TransitionLink
                  data-menu-item
                  href={item.href}
                  className="display block py-1.5 text-[10.5vw] hover:text-orange"
                >
                  {item.label}
                </TransitionLink>
              </div>
            ))}
          </nav>
          <div className="flex items-end justify-between gap-4">
            <a href={profile.cvPath} download className="btn btn-light">
              <DownloadSimple size={18} weight="bold" aria-hidden /> Download CV
            </a>
            <Doodle name="loop" intro={false} className="w-20 text-orange" />
          </div>
        </div>
      )}
    </>
  );
}
