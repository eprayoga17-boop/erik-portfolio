import { BrandMarquee } from "@/components/home/BrandMarquee";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { Summary } from "@/components/home/Summary";
import { getPublishedProjects } from "@/lib/data/projects";
import { imageUrl } from "@/lib/images";

/**
 * Home is built for a 30-second skim:
 *   1. Hero: role, name, current job, reach (first screen)
 *   2. Summary sheet: who / where / what, overlapping the hero (second screen)
 *   3. Selected work + industry shortcuts
 *   4. Brands, then the contact panel (footer)
 */
export default async function HomePage() {
  const projects = await getPublishedProjects();
  const client = projects.filter((p) => p.category !== "side");
  const featured = (client.some((p) => p.featured) ? client.filter((p) => p.featured) : client).slice(0, 6);
  const lead = featured[0]?.cover;

  return (
    <>
      <Hero
        thumb={lead ? { src: imageUrl(lead.path), alt: lead.alt, width: lead.width, height: lead.height } : null}
      />
      <div className="relative z-10 -mt-20 px-2.5 md:-mt-28 md:px-4">
        <div className="mx-auto max-w-[1520px] rounded-card bg-white px-4 py-6 shadow-[0_-20px_60px_-30px_rgba(0,20,90,0.4)] md:rounded-panel md:px-10 md:py-10">
          <Summary />
          <FeaturedWork featured={featured} all={projects} />
        </div>
      </div>
      <BrandMarquee />
    </>
  );
}
