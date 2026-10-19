import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:py-20">
        <div className="text-center lg:text-left">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Workout Library
          </p>
          <h1 className="text-5xl font-bold uppercase leading-[1.02] sm:text-6xl xl:text-7xl">
            Train with intent.
            <br />
            <span className="text-accent">Log every set.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95 active:scale-[0.98]"
          >
            Browse Workouts
            <ArrowDown size={18} strokeWidth={2.5} />
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md rounded-3xl border border-line bg-gradient-to-b from-panel-2 to-panel p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner.png"
              alt="Preacher curl machine with highlighted working muscles"
              className="mx-auto h-auto max-h-[420px] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
