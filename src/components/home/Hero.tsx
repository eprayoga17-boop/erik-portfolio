import Image from "next/image";
import { ArrowDown, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { IntroScope } from "@/components/motion/IntroScope";
import { Doodle } from "@/components/site/Doodle";
import { Sticker } from "@/components/site/Sticker";
import { experience, profile } from "@/lib/seed/site";

type Thumb = { src: string; alt: string; width: number; height: number } | null;

/**
 * The first screen answers three questions without a scroll:
 * what he does (headline), who he is and where he works (profile card),
 * and how much he's done (work card + intro line). Layout follows the
 * reference: a cobalt panel, huge white type, frosted cards and orange doodles.
 */
export function Hero({ thumb }: { thumb: Thumb }) {
  const current = experience[0];
  return (
    <div className="px-2.5 pt-2.5 md:px-4 md:pt-4">
      <IntroScope
        as="section"
        aria-labelledby="hero-title"
        className="panel-cobalt mx-auto max-w-[1600px] px-5 pb-32 pt-28 md:px-10 md:pb-40 md:pt-36"
      >
        <div className="relative mx-auto max-w-[1280px]">
          <h1 id="hero-title" className="sr-only">
            Erik Prayoga, brand and social media designer from Surabaya, Indonesia
          </h1>

          {/* Headline */}
          <p
            aria-hidden
            data-speed="-10"
            className="display relative z-0 text-center text-[clamp(2.9rem,12.2vw,10.2rem)] leading-[0.86] lg:text-[clamp(3rem,8.7vw,8.8rem)]"
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                <span className="text-orange">#</span>Brand &amp;
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                Social
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                Designer
              </span>
            </span>
          </p>

          {/* Floating cards: a row under the headline on phones, scattered over it on desktop */}
          <div className="relative z-10 mt-8 flex items-start justify-center gap-3 sm:gap-5 lg:static lg:mt-0">
            <div
              data-pop
              data-intro
              data-float="1.2"
              data-speed="-30"
              className="w-[46%] max-w-[230px] lg:absolute lg:right-[-1%] lg:top-[-8%] lg:w-[210px]"
            >
              <div className="frost rotate-[5deg] p-4 text-center md:p-5">
                <Image
                  src="/brand/face.webp"
              unoptimized
                  alt="Erik's illustrated avatar"
                  width={480}
                  height={480}
                  priority
                  sizes="96px"
                  className="mx-auto h-auto w-[64px] rounded-full ring-4 ring-white/70 md:w-[88px]"
                />
                <p className="mt-3 text-base font-extrabold leading-tight md:text-lg">{profile.name}</p>
                <p className="mt-1 text-xs leading-snug text-white/80 md:text-sm">
                  {current.role}
                  <br />
                  {current.company}
                </p>
              </div>
            </div>

            <div
              data-pop
              data-intro
              data-float="0.8"
              data-speed="-55"
              className="mt-6 w-[50%] max-w-[260px] lg:absolute lg:left-[-2%] lg:top-[30%] lg:mt-0 lg:w-[230px]"
            >
              <div className="frost -rotate-[6deg] p-2.5 md:p-3">
                {thumb && (
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    width={thumb.width}
                    height={thumb.height}
                    priority
                    sizes="260px"
                    className="h-auto w-full rounded-[18px]"
                  />
                )}
                <div className="flex flex-col gap-0.5 px-1.5 pb-1 pt-2.5">
                  <p className="text-sm font-extrabold md:text-base">50+ brands</p>
                  <p className="text-xs font-bold text-white/80 md:text-sm">ID · SG · MY · AU</p>
                </div>
              </div>
            </div>
          </div>

          <Doodle
            name="loop"
            className="pointer-events-none absolute right-[17%] top-[-14%] hidden w-24 text-orange lg:block"
          />
          <Doodle
            name="zig"
            className="pointer-events-none absolute left-[4%] top-[74%] hidden w-28 -rotate-[8deg] text-orange lg:block"
          />

          {/* Intro + actions */}
          <div className="relative z-10 mx-auto mt-10 max-w-[640px] text-center lg:mt-12">
            <p data-fade data-intro className="text-lg leading-relaxed text-white/90 md:text-xl">
              Hi, I&apos;m <strong className="font-extrabold text-white">Erik</strong>. For 7+ years I&apos;ve been making brands
              look good on social media, for clients in Indonesia, Singapore, Malaysia and Australia.
            </p>
            <div data-fade data-intro className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#summary" className="btn btn-light">
                The quick version <ArrowDown size={18} weight="bold" aria-hidden />
              </a>
              <a href={profile.cvPath} download className="btn btn-outline-light">
                <DownloadSimple size={18} weight="bold" aria-hidden /> Download CV
              </a>
            </div>
          </div>

          <div data-float="0.5" className="absolute -bottom-12 right-0 z-10 hidden md:block lg:-bottom-6 lg:right-[1%]">
            <Sticker intro className="w-24 md:w-36" />
          </div>
        </div>
      </IntroScope>
    </div>
  );
}
