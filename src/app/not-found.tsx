import Link from "next/link";
import { Doodle } from "@/components/site/Doodle";

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] p-2.5 md:p-4">
      <div className="panel-cobalt grid place-items-center px-5 py-20">
        <div className="relative text-center">
          <p className="bubble text-sm">Error 404</p>
          <h1 className="display mt-6 text-[clamp(3rem,12vw,10rem)]">
            Nyasar<span className="text-orange">?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[36ch] text-lg text-white/85">
            This page doesn&apos;t exist, or it moved. The good stuff is still on the home page.
          </p>
          <Link href="/" className="btn btn-orange mt-8">
            Back home
          </Link>
          <Doodle name="loop" intro={false} className="absolute -right-16 -top-10 hidden w-24 text-orange md:block" />
        </div>
      </div>
    </main>
  );
}
