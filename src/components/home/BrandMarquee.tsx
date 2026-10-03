const BRANDS = [
  "Milagros", "Neauvia", "Mie Umi", "ScooBeauty", "Deyn", "Illumia Face", "Masace", "BMJ Physiotherapy",
  "SuperFood", "Kimaya", "EGA Wellness", "Cotton Spring", "Lenicc", "Fuchsia", "Pinnacle Automotive",
  "Oligio", "Dental 1728", "Kotty", "Oye-Oye", "Pangena", "BetterLife", "Parentcraft", "Angel Eye",
  "Ascend Eye Clinic", "One Wellness", "Eu Yan Sang", "Keris Merah", "Parkway", "Stemcell First", "Aero",
];

/**
 * Client names as a row of pills. Answers "who has he worked with?" at a glance.
 * Pure CSS animation; stops under reduced motion.
 */
export function BrandMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {BRANDS.map((b, i) => (
        <li
          key={b}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-lg font-extrabold [font-stretch:112%] md:text-xl ${
            i % 5 === 2 ? "bg-orange text-on-orange" : "bg-white text-cobalt"
          }`}
        >
          {b}
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="brands-title" className="mt-16 md:mt-24">
      <h2 id="brands-title" className="mx-auto max-w-[1280px] px-5 text-center text-sm font-bold uppercase tracking-[0.12em] text-muted md:px-10">
        Brands I&apos;ve designed for
      </h2>
      <div className="mt-5 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
