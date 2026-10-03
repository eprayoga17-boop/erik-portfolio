import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Doodle } from "@/components/site/Doodle";
import { PageHero } from "@/components/site/PageHero";
import { getProjectBySlug } from "@/lib/data/projects";
import { imageUrl } from "@/lib/images";
import { categoryLabel } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = await getProjectBySlug(slug);
  if (!found) return { title: "Not found" };
  const { project } = found;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: project.cover
      ? { images: [{ url: imageUrl(project.cover.path), width: project.cover.width, height: project.cover.height }] }
      : undefined,
  };
}

/** Portrait or square images would fill several screens at full width, so cap them at ~85% of the viewport height. */
const fitWidth = (w: number, h: number) => `min(100%, calc(85dvh * ${(w / h).toFixed(4)}))`;

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const found = await getProjectBySlug(slug);
  if (!found) notFound();
  const { project, next } = found;
  const side = project.category === "side";
  const backHref = side ? "/side-quests" : "/work";

  const facts = [
    { k: "Client", v: project.client },
    { k: "Role", v: project.role },
    { k: "Region", v: project.region },
    { k: "Year", v: project.year?.toString() ?? null },
  ].filter((f): f is { k: string; v: string } => Boolean(f.v));

  // Don't repeat the cover in the gallery. Cropped covers differ from their page, so the full page still shows.
  const gallery = project.images.filter((img) => img.path !== project.cover?.path);

  return (
    <article>
      <PageHero
        compact
        size={Math.max(...project.title.split(/\s+/).map((w) => w.length)) > 8 ? "sm" : "md"}
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            <TransitionLink
              href={backHref}
              className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-bold ring-1 ring-white/50 hover:bg-white hover:text-cobalt"
            >
              <ArrowLeft size={16} weight="bold" aria-hidden /> {side ? "Side quests" : "All work"}
            </TransitionLink>
            <span className="bubble text-sm">{categoryLabel(project.category)}</span>
          </span>
        }
        lines={[project.title]}
        intro={project.summary}
      >
        <dl className="flex flex-wrap gap-2">
          {facts.map((f) => (
            <div key={f.k} className="frost flex items-baseline gap-2 !rounded-full px-4 py-2">
              <dt className="text-xs font-bold uppercase tracking-wider text-white/70">{f.k}</dt>
              <dd className="font-bold">{f.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <div className="relative z-10 -mt-8 px-2.5 md:-mt-12 md:px-4">
        <div className="mx-auto max-w-[1520px] rounded-card bg-white px-4 py-6 md:rounded-panel md:px-10 md:py-10">
          {project.cover && (
            <div data-reveal="pop" className="mx-auto" style={{ width: fitWidth(project.cover.width, project.cover.height) }}>
              <Image
                src={imageUrl(project.cover.path)}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                priority
                sizes="(min-width: 1520px) 1440px, 100vw"
                className="h-auto w-full rounded-card ring-1 ring-line"
              />
            </div>
          )}

          <section className="mx-auto mt-14 grid max-w-[1200px] gap-10 md:mt-20 md:grid-cols-[0.8fr_1.2fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <h2 className="display text-2xl md:text-3xl">What I did</h2>
              <Doodle name="underline" intro={false} strokeWidth={6} className="mt-2 w-32 text-orange" />
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <li key={s} className="chip bg-surface-2">
                    {s}
                  </li>
                ))}
              </ul>
              {project.externalUrl && (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
                  Open the reel <ArrowUpRight size={18} weight="bold" aria-hidden />
                </a>
              )}
            </div>
            <div className="max-w-[62ch] space-y-6 text-lg leading-relaxed" data-reveal="up">
              {project.body.split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {gallery.length > 0 && (
            <section aria-label="Project pages" className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-6 md:mt-24 md:gap-8">
              {gallery.map((img) => (
                <figure key={img.id} data-reveal="pop">
                  <Image
                    src={imageUrl(img.path)}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1520px) 1440px, 100vw"
                    className="mx-auto h-auto rounded-card ring-1 ring-line"
                    style={{ width: fitWidth(img.width, img.height) }}
                  />
                </figure>
              ))}
            </section>
          )}

          {next && (
            <TransitionLink
              href={`/work/${next.slug}`}
              className="group mx-auto mt-16 flex max-w-[1440px] items-center justify-between gap-6 rounded-card bg-cobalt-soft px-6 py-8 transition-colors duration-300 hover:bg-orange md:mt-24 md:px-10 md:py-12"
            >
              <span>
                <span className="label text-muted group-hover:text-ink">Next {next.category === "side" ? "side quest" : "case"}</span>
                <span className="display mt-2 block text-[clamp(1.8rem,5vw,4rem)] leading-[0.95] text-cobalt group-hover:text-ink">
                  {next.title}
                </span>
              </span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cobalt text-white transition-transform duration-500 group-hover:rotate-45 group-hover:bg-ink md:h-20 md:w-20">
                <ArrowUpRight size={30} weight="bold" aria-hidden />
              </span>
            </TransitionLink>
          )}
        </div>
      </div>
    </article>
  );
}
