"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useFitlog } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitlog();

  const workoutActive = pathname === "/" || pathname.startsWith("/workout");
  const planActive = pathname.startsWith("/my-plan");

  const linkClass = (active) =>
    `rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
      active
        ? "bg-white/10 text-accent"
        : "text-muted hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-y-2 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr]"
      >
        {/* Left: logo */}
        <Link href="/" aria-label="FitLog home" className="justify-self-start">
          <Logo />
        </Link>

        {/* Middle: links (drops to its own row on small screens) */}
        <div className="order-3 col-span-2 flex items-center justify-center gap-1 md:order-none md:col-span-1">
          <Link
            href="/"
            className={linkClass(workoutActive)}
            aria-current={workoutActive ? "page" : undefined}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={linkClass(planActive)}
            aria-current={planActive ? "page" : undefined}
          >
            My Plan
          </Link>
        </div>

        {/* Right: counters */}
        <div className="flex items-center gap-2 justify-self-end">
          <Link
            href="/my-plan"
            aria-label={`Plan: ${plan.length} workouts`}
            className="flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-95"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] text-accent">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved: ${saved.length} workouts`}
            className="flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1 text-[11px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
