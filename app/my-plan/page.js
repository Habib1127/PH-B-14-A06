"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Eye, Plus, X, Dumbbell } from "lucide-react";
import { PLAN_CAP, useFitlog } from "@/lib/store";
import Spinner from "@/components/Spinner";
import StatsRow from "@/components/StatsRow";

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-4 text-center sm:p-6">
      <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
        {value}
      </p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}

export default function MyPlanPage() {
  const {
    plan,
    saved,
    hydrated,
    isDone,
    inPlan,
    markDone,
    removeFromPlan,
    removeFromSaved,
    addToPlan,
  } = useFitlog();
  const [tab, setTab] = useState("plan");

  const totals = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((s, w) => s + (w.duration || 0), 0),
      calories: plan.reduce((s, w) => s + (w.caloriesBurned || 0), 0),
    }),
    [plan]
  );

  const list = tab === "plan" ? plan : saved;

  const tabClass = (active) =>
    `flex-1 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition sm:flex-none ${
      active ? "bg-accent text-black" : "text-muted hover:text-white"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <h1 className="text-4xl font-bold uppercase sm:text-5xl">My Plan</h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <Metric label="Exercises" value={totals.exercises} />
        <Metric label="Minutes" value={totals.minutes} />
        <Metric label="Calories" value={totals.calories} />
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        className="mt-8 flex w-full gap-1 rounded-full border border-line bg-panel p-1 sm:w-fit"
      >
        <button
          role="tab"
          aria-selected={tab === "plan"}
          onClick={() => setTab("plan")}
          className={tabClass(tab === "plan")}
        >
          Today&apos;s Plan ({plan.length}/{PLAN_CAP})
        </button>
        <button
          role="tab"
          aria-selected={tab === "saved"}
          onClick={() => setTab("saved")}
          className={tabClass(tab === "saved")}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* List */}
      <div className="mt-6">
        {!hydrated ? (
          <Spinner label="Loading workouts…" />
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-panel px-6 py-16 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Dumbbell size={26} />
            </span>
            <h2 className="text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-2 max-w-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {list.map((w) => {
              const done = tab === "plan" && isDone(w.id);
              return (
                <li
                  key={w.id}
                  className={`flex flex-col gap-4 rounded-2xl border bg-panel p-4 sm:flex-row sm:items-center ${
                    done ? "border-accent/50" : "border-line"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image}
                    alt={w.name}
                    className="h-40 w-full rounded-xl object-cover sm:h-24 sm:w-24 sm:shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`truncate text-xl font-semibold uppercase ${
                          done ? "text-muted line-through" : ""
                        }`}
                      >
                        {w.name}
                      </h3>
                      {done && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted">{w.equipment}</p>
                    <StatsRow workout={w} className="mt-2" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/workout/${w.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:border-accent hover:text-accent"
                    >
                      <Eye size={14} /> View Details
                    </Link>

                    {tab === "plan" ? (
                      <button
                        onClick={() => markDone(w)}
                        disabled={done}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-95 disabled:cursor-default disabled:opacity-50"
                      >
                        <Check size={14} strokeWidth={3} />
                        {done ? "Completed" : "Mark as Done"}
                      </button>
                    ) : (
                      <button
                        onClick={() => addToPlan(w)}
                        disabled={inPlan(w.id) || plan.length >= PLAN_CAP}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={14} strokeWidth={3} />
                        {inPlan(w.id) ? "In plan" : "Add to plan"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        tab === "plan" ? removeFromPlan(w) : removeFromSaved(w)
                      }
                      aria-label={`Remove ${w.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-red-400 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
