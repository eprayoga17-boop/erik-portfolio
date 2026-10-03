import Image from "next/image";
import { ArrowRight, DownloadSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";
import { experience, profile, shortPeriod, skills, stats } from "@/lib/seed/site";

const COUNTRY: Record<string, string> = { ID: "Indonesia", SG: "Singapore", MY: "Malaysia", AU: "Australia" };

/**
 * The 30-second read. Three cards, side by side on desktop, right under the
 * hero: who he is, where he's worked, what he makes. A recruiter can stop
 * here and still know enough to call.
 */
export function Summary() {
  const picks = experience.filter((e) => e.highlight);
  const headline = stats.slice(0, 3);
  return (
    <div id="summary" className="scroll-mt-24">
      <h2 className="sr-only">Erik in 30 seconds</h2>
      <div className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Who */}
        <article data-reveal="pop" className="flex flex-col rounded-card bg-surface-2 p-6 md:p-7">
          <h3 className="display text-center text-[1.55rem] leading-[0.95] md:text-[1.7rem]">
            Who
            <br />I am
          </h3>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/brand/face.webp"
              unoptimized
              alt=""
              width={480}
              height={480}
              sizes="64px"
              className="h-16 w-16 shrink-0 rounded-full ring-4 ring-white"
            />
            <div>
              <p className="text-lg font-extrabold leading-tight">{profile.name}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted">
                <MapPin size={15} weight="bold" aria-hidden /> {profile.city}
              </p>
            </div>
          </div>
          <p className="mt-5 leading-relaxed">{profile.summary}</p>
          <p className="mt-6">
            <span className="bubble text-sm">Open to full-time & freelance</span>
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            <a href={profile.cvPath} download className="btn btn-primary min-h-11 px-5 text-sm">
              <DownloadSimple size={17} weight="bold" aria-hidden /> Download CV
            </a>
            <TransitionLink href="/about" className="btn btn-ghost min-h-11 px-5 text-sm">
              About me
            </TransitionLink>
          </div>
        </article>

        {/* Where */}
        <article data-reveal="pop" className="flex flex-col rounded-card bg-surface-2 p-6 md:p-7">
          <h3 className="display text-center text-[1.55rem] leading-[0.95] md:text-[1.7rem]">
            Where
            <br />
            I&apos;ve worked
          </h3>
          <ol className="mt-6 space-y-2.5">
            {picks.map((e, i) => (
              <li
                key={e.company}
                className={`rounded-[20px] px-4 py-3 ${i === 0 ? "bg-cobalt text-white" : "bg-white"}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-extrabold leading-tight">{e.company}</p>
                  <p className={`shrink-0 text-xs font-bold ${i === 0 ? "text-orange" : "text-cobalt"}`}>
                    {shortPeriod(e.period)}
                  </p>
                </div>
                <p className={`mt-0.5 text-sm ${i === 0 ? "text-white/80" : "text-muted"}`}>
                  {e.role} · {COUNTRY[e.country]}
                  {e.type.includes("remote") ? ", remote" : ""}
                </p>
              </li>
            ))}
          </ol>
          <TransitionLink
            href="/about#experience"
            className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 font-bold text-cobalt hover:text-orange-text"
          >
            Full timeline ({experience.length} roles) <ArrowRight size={17} weight="bold" aria-hidden />
          </TransitionLink>
        </article>

        {/* What */}
        <article data-reveal="pop" className="flex flex-col rounded-card bg-surface-2 p-6 md:p-7">
          <h3 className="display text-center text-[1.55rem] leading-[0.95] md:text-[1.7rem]">
            What
            <br />I make
          </h3>
          <dl className="mt-6 grid grid-cols-3 gap-2">
            {headline.map((s) => (
              <div key={s.label} className="rounded-[20px] bg-white px-2 py-4 text-center">
                <dd className="display text-[1.9rem] leading-none text-cobalt">
                  {s.value}
                  {s.suffix}
                </dd>
                <dt className="mt-1.5 text-xs font-bold leading-tight text-muted">{s.short}</dt>
              </div>
            ))}
          </dl>
          <ul className="mt-5 flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="chip bg-white">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Mostly clinics, beauty, food and service brands. Peak pace: 9 to 12 designs a day.
          </p>
          <a
            href="#work"
            className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 font-bold text-cobalt hover:text-orange-text"
          >
            See the work <ArrowRight size={17} weight="bold" aria-hidden />
          </a>
        </article>

        {/* Doodles between cards, like the reference */}
        <Doodle
          name="hop"
          intro={false}
          strokeWidth={6}
          className="pointer-events-none absolute left-[33.33%] top-[44%] z-10 hidden w-16 -translate-x-1/2 text-ink lg:block"
        />
        <Doodle
          name="swirl"
          intro={false}
          strokeWidth={6}
          className="pointer-events-none absolute left-[66.66%] top-[52%] z-10 hidden w-12 -translate-x-1/2 text-ink lg:block"
        />
      </div>
    </div>
  );
}
