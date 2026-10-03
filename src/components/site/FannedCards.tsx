import Image from "next/image";
import { Doodle } from "@/components/site/Doodle";

type Img = { src: string; alt: string; width: number; height: number };

const POSES = [
  "left-[2%] top-[18%] -rotate-[9deg]",
  "right-[0%] top-[0%] rotate-[7deg]",
  "left-[22%] top-[44%] rotate-[-2deg]",
];

/** A loose stack of frosted cards for the right side of an inner page header. Decorative. */
export function FannedCards({ images }: { images: Img[] }) {
  return (
    <div aria-hidden className="relative mx-auto hidden aspect-[5/4] w-full max-w-[440px] lg:block">
      {[...images]
        .sort((a, b) => b.width / b.height - a.width / a.height)
        .slice(0, 3)
        .map((img, i) => (
          <div
            key={img.src}
            data-pop
            data-intro
            data-float={String(0.6 + i * 0.4)}
            className={`absolute w-[58%] ${POSES[i]}`}
          >
            <div className="frost p-2.5">
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes="280px"
                loading="eager"
                className="h-auto w-full rounded-[18px]"
              />
            </div>
          </div>
        ))}
      <Doodle name="loop" className="absolute -left-[6%] -top-[8%] w-20 -scale-x-100 text-orange" />
    </div>
  );
}
