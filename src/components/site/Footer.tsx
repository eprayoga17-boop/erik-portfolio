import Image from "next/image";
import { DownloadSimple, EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";
import { Sticker } from "@/components/site/Sticker";
import { Wordmark } from "@/components/site/Wordmark";
import { profile } from "@/lib/seed/site";

/** Every page ends on the same cobalt panel: the ask, the ways to reach Erik, and the links. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 px-2.5 pb-2.5 md:mt-28 md:px-4 md:pb-4">
      <div className="panel-cobalt mx-auto max-w-[1600px] px-5 pt-14 md:px-10 md:pt-20">
        <div className="mx-auto grid max-w-[1280px] items-end gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="pb-6 lg:pb-16" data-reveal="up">
            <p className="bubble mb-6 text-sm">Open to full-time & freelance</p>
            <h2 className="display text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.9]">
              Your brand,
              <br />
              on my desk<span className="text-orange">?</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg text-white/85">
              Tell me what you&apos;re working on. I usually reply within a couple of days, faster on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TransitionLink href="/contact" className="btn btn-orange">
                Let&apos;s talk
              </TransitionLink>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                <WhatsappLogo size={20} weight="bold" aria-hidden /> WhatsApp
              </a>
              <a href={profile.cvPath} download className="btn btn-outline-light">
                <DownloadSimple size={18} weight="bold" aria-hidden /> Download CV
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[400px] self-end">
            <Image
              src="/brand/avatar.webp"
              unoptimized
              alt="Erik's illustrated avatar: blue hair, round glasses, a wink"
              width={890}
              height={1200}
              sizes="400px"
              className="relative h-auto w-full"
            />
            <span
              aria-hidden
              className="script absolute -left-[8%] top-[4%] -rotate-[10deg] text-[clamp(3.4rem,6vw,5rem)] text-white [text-shadow:3px_3px_0_var(--orange)]"
            >
              Halo!
            </span>
            <Doodle name="hop" intro={false} className="absolute left-[2%] top-[19%] w-14 rotate-[35deg] text-orange" />
            <div className="absolute bottom-[8%] right-0">
              <Sticker className="w-28 md:w-32" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-2 grid max-w-[1280px] gap-8 border-t border-white/20 py-10 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-10">
          <TransitionLink href="/" aria-label="Erik Prayoga, home" className="w-fit">
            <Wordmark tone="light" />
          </TransitionLink>
          <nav aria-label="Footer" className="flex flex-wrap gap-2">
            {[
              ["/work", "Work"],
              ["/about", "About"],
              ["/side-quests", "Side quests"],
              ["/privacy", "Privacy"],
            ].map(([href, label]) => (
              <TransitionLink
                key={href}
                href={href}
                className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-bold ring-1 ring-white/40 hover:bg-white hover:text-cobalt"
              >
                {label}
              </TransitionLink>
            ))}
          </nav>
          <ul className="flex flex-wrap gap-2">
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/15 hover:bg-orange hover:text-on-orange"
              >
                <EnvelopeSimple size={20} weight="bold" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram @${profile.instagram}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/15 hover:bg-orange hover:text-on-orange"
              >
                <InstagramLogo size={20} weight="bold" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
        <p className="mx-auto max-w-[1280px] pb-8 text-sm text-white/70">
          © {year} {profile.name}. Made in {profile.city}.
        </p>
      </div>
    </footer>
  );
}
