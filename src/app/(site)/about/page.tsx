import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, DownloadSimple, Trophy } from "@phosphor-icons/react/dist/ssr";
import { Timeline } from "@/components/about/Timeline";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";
import { PageHero } from "@/components/site/PageHero";
import { Sticker } from "@/components/site/Sticker";
import { achievements, education, experience, profile, stats, tools } from "@/lib/seed/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Erik Prayoga is a brand and social media designer from Surabaya with seven years of agency, in-house and remote work.",
  alternates: { canonical: "/about" },
};

const SOFT = ["Creative thinking", "Fast learner", "Visual strategy", "Brief interpretation", "Team coordination"];

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 id={id} className="display text-[clamp(2rem,4.6vw,3.6rem)]">
        {children}
      </h2>
      <Doodle name="underline" intro={false} strokeWidth={7} className="mt-2 w-36 text-orange md:w-44" />
    </div>
  );
}

export default function AboutPage() {
  const current = experience[0];
  const facts = [
    { k: "Based in", v: profile.city },
    { k: "Now", v: `${current.role}, ${current.company}` },
    { k: "Experience", v: `${stats[0].value}+ years, ${experience.length} roles` },
    { k: "Languages", v: "Bahasa Indonesia, English" },
  ];

  return (
    <>
      <PageHero
        eyebrow={<span className="bubble text-sm">About</span>}
        lines={["Halo, it's", "me, Erik"]}
        intro="Graphic designer from Surabaya. I've spent about seven years making brands look good on social media, in-house, at agencies and remotely."
        aside={
          <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:-mb-6 lg:max-w-[340px]">
            <div data-pop data-intro>
              <Image
                src="/brand/avatar.webp"
                alt="Illustrated portrait of Erik with blue hair and round glasses"
                width={890}
                height={1200}
                priority
                unoptimized
                sizes="340px"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -left-4 bottom-[10%]">
              <Sticker intro className="w-24 md:w-28" />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a href={profile.cvPath} download className="btn btn-light">
            <DownloadSimple size={18} weight="bold" aria-hidden /> Download CV
          </a>
          <TransitionLink href="/contact" className="btn btn-outline-light">
            Let&apos;s talk
          </TransitionLink>
        </div>
      </PageHero>

      <div className="relative z-10 -mt-8 px-2.5 md:-mt-12 md:px-4">
        <div className="mx-auto max-w-[1520px] rounded-card bg-white px-4 py-6 md:rounded-panel md:px-10 md:py-10">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} data-reveal="pop" className="rounded-card bg-surface-2 p-5">
                <dt className="label text-muted">{f.k}</dt>
                <dd className="mt-2 text-lg font-extrabold leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>

          <section className="mx-auto mt-16 grid max-w-[1200px] gap-10 md:mt-20 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed" data-reveal="up">
              <p>
                I&apos;m a graphic designer from Surabaya, and for about seven years I&apos;ve mostly been making brands look
                good on social media. Brand identities, feeds, campaign key visuals, the occasional app screen or website,
                and motion when a still image won&apos;t cut it.
              </p>
              <p>
                I&apos;ve worked in-house, at agencies, and remotely for clients in Singapore, Malaysia and Australia. Along the
                way I learned to run a lot of brands at once without letting them blur into each other. Right now I lead a
                small design team at an FMCG company in Surabaya.
              </p>
              <p>
                My motto is <span className="script text-[1.6em] text-orange-text">Berkarya untuk Bercanda</span>. Making things
                should be fun. If it isn&apos;t, it usually shows in the work.
              </p>
            </div>
            <div className="space-y-3" data-reveal="up">
              <div className="rounded-card bg-surface-2 p-6">
                <h3 className="text-lg font-extrabold">Also good at</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {SOFT.map((s) => (
                    <li key={s} className="chip bg-white">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card bg-surface-2 p-6">
                <h3 className="text-lg font-extrabold">School</h3>
                <ul className="mt-3 space-y-3">
                  {education.map((e) => (
                    <li key={e.school}>
                      <p className="font-bold">{e.school}</p>
                      <p className="text-sm text-muted">
                        {e.detail}, {e.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="experience" aria-labelledby="experience-title" className="mx-auto mt-16 max-w-[1200px] scroll-mt-28 md:mt-24">
            <SectionTitle id="experience-title">Where I&apos;ve worked</SectionTitle>
            <Timeline items={experience} />
          </section>

          <section aria-labelledby="toolbox-title" className="mx-auto mt-16 grid max-w-[1200px] gap-10 md:mt-24 lg:grid-cols-2">
            <div>
              <SectionTitle id="toolbox-title">Toolbox</SectionTitle>
              <ul className="mt-8 space-y-2.5">
                {tools.map((t, i) => (
                  <li
                    key={t.name}
                    data-reveal="up"
                    className={`flex min-h-14 items-center justify-between gap-4 rounded-full px-5 ${
                      i < 2 ? "bg-cobalt text-white" : "bg-surface-2"
                    }`}
                  >
                    <span className="font-extrabold">{t.name}</span>
                    <span className={`chip text-xs ${i < 2 ? "bg-orange text-on-orange" : "bg-white"}`}>{t.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle id="trophies-title">Trophy shelf</SectionTitle>
              <ul className="mt-8 space-y-2.5">
                {achievements.map((a, i) => (
                  <li
                    key={a}
                    data-reveal="up"
                    className={`flex min-h-14 items-center gap-3 rounded-full px-5 font-bold ${
                      i === 0 ? "bg-orange text-on-orange" : "bg-surface-2"
                    }`}
                  >
                    <Trophy size={20} weight="bold" aria-hidden className="shrink-0" /> {a}
                  </li>
                ))}
              </ul>
              <TransitionLink
                href="/side-quests"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-cobalt hover:text-orange-text"
              >
                See the side quests <ArrowRight size={17} weight="bold" aria-hidden />
              </TransitionLink>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
