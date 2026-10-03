/**
 * "ERIK" in a pill plus "Prayoga" in an orange speech bubble.
 * tone="light" sits on cobalt; tone="dark" sits on white or paper.
 */
export function Wordmark({ tone = "dark", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 leading-none ${className}`}>
      <span
        className={`display rounded-full px-3 pb-[0.35rem] pt-[0.45rem] text-[0.95rem] leading-none transition-colors duration-300 ${
          tone === "light" ? "bg-white text-cobalt" : "bg-cobalt text-white"
        }`}
      >
        Erik
      </span>
      <span className="bubble script -translate-y-0.5 px-2.5 py-0.5 text-[1.3rem]">Prayoga</span>
    </span>
  );
}
