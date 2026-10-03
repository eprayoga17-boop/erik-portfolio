/**
 * Hand-drawn arrows and squiggles, in the spirit of the marker doodles in
 * Erik's portfolio ("It's Me!", "My Fiancee"). Decorative only.
 * Every path uses pathLength=1 so GSAP can "draw" it by animating
 * stroke-dashoffset from 1 to 0 (see IntroScope).
 */
const SHAPES = {
  loop: {
    box: "0 0 160 140",
    d: [
      "M14 24 C 60 4, 128 10, 138 52 C 146 90, 106 104, 92 84 C 78 64, 106 46, 122 66 C 136 84, 118 112, 70 124",
      "M88 106 L68 125 L95 133",
    ],
  },
  zig: {
    box: "0 0 180 150",
    d: [
      "M12 124 C 26 64, 70 40, 66 80 C 62 112, 28 110, 48 82 C 68 56, 112 70, 104 104 C 98 130, 142 118, 160 62",
      "M137 70 L161 59 L170 84",
    ],
  },
  swirl: {
    box: "0 0 80 80",
    d: ["M16 62 C 6 32, 40 8, 54 28 C 64 44, 36 54, 34 40 C 32 26, 62 24, 64 52", "M52 46 L64 53 L71 40"],
  },
  hop: {
    box: "0 0 96 64",
    d: ["M6 44 C 18 12, 50 6, 60 30 C 66 46, 48 54, 45 41 C 42 27, 66 16, 86 26", "M72 16 L87 27 L75 40"],
  },
  underline: {
    box: "0 0 220 30",
    d: ["M6 20 C 50 6, 120 4, 214 14"],
  },
} as const;

export type DoodleName = keyof typeof SHAPES;

export function Doodle({
  name,
  className = "",
  strokeWidth = 9,
  intro = true,
}: {
  name: DoodleName;
  className?: string;
  strokeWidth?: number;
  /** Start hidden and let IntroScope draw it in. */
  intro?: boolean;
}) {
  const s = SHAPES[name];
  return (
    <svg
      viewBox={s.box}
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
      {...(intro ? { "data-draw": "", "data-intro": "" } : {})}
    >
      {s.d.map((d) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
