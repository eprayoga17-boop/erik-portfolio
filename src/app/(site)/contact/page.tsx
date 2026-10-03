import type { Metadata } from "next";
import { DownloadSimple, EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { Doodle } from "@/components/site/Doodle";
import { PageHero } from "@/components/site/PageHero";
import { Sticker } from "@/components/site/Sticker";
import { profile } from "@/lib/seed/site";

export const metadata: Metadata = {
  title: "Let's talk",
  description: "Hire Erik Prayoga for a full-time role or a freelance brand and social media project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const direct = [
    { href: `https://wa.me/${profile.whatsapp}`, label: profile.whatsappDisplay, note: "Fastest", Icon: WhatsappLogo, external: true },
    { href: `mailto:${profile.email}`, label: profile.email, note: "Email", Icon: EnvelopeSimple, external: false },
    { href: `https://instagram.com/${profile.instagram}`, label: `@${profile.instagram}`, note: "Instagram", Icon: InstagramLogo, external: true },
  ];
  return (
    <>
      <PageHero
        compact
        eyebrow={<span className="bubble text-sm">Open to full-time & freelance</span>}
        lines={["Let's", "talk"]}
        intro="Hiring for a design role, or got a brand that needs a face? Send a note. I reply within a couple of days."
        aside={
          <div className="relative mx-auto hidden h-[320px] w-full max-w-[420px] lg:block">
            <div data-pop data-intro data-float="1" className="absolute left-[8%] top-[6%] w-[230px]">
              <div className="frost rotate-[-5deg] p-5 text-center">
                <Image
                  src="/brand/face.webp"
                  alt=""
                  width={480}
                  height={480}
                  unoptimized
                  className="mx-auto h-auto w-[88px] rounded-full ring-4 ring-white/70"
                />
                <p className="mt-3 text-lg font-extrabold leading-tight">{profile.name}</p>
                <p className="mt-1 text-sm text-white/80">Usually replies in 1–2 days</p>
              </div>
            </div>
            <Doodle name="zig" className="absolute bottom-[4%] left-[0%] w-24 text-orange" />
            <div data-float="1.6" className="absolute bottom-[0%] right-[4%]">
              <Sticker intro text="Say halo • Let's talk • " className="w-32" />
            </div>
          </div>
        }
      />
      <div className="relative z-10 -mt-8 px-2.5 md:-mt-12 md:px-4">
        <div className="mx-auto grid max-w-[1520px] gap-10 rounded-card bg-white px-4 py-6 md:rounded-panel md:px-10 md:py-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 className="text-xl font-extrabold">Reach me directly</h2>
            <ul className="mt-5 space-y-2.5">
              {direct.map(({ href, label, note, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-16 items-center gap-4 rounded-full bg-surface-2 py-2 pl-2 pr-5 transition-colors hover:bg-cobalt hover:text-white"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cobalt text-white group-hover:bg-orange group-hover:text-on-orange">
                      <Icon size={22} weight="bold" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-muted group-hover:text-white/75">{note}</span>
                      <span className="block truncate font-bold">{label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href={profile.cvPath} download className="btn btn-ghost mt-6">
              <DownloadSimple size={18} weight="bold" aria-hidden /> Download CV
            </a>
          </div>
          <div className="rounded-card bg-surface-2/60 p-5 ring-1 ring-line md:p-8">
            <h2 className="mb-6 text-xl font-extrabold">Or send a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
