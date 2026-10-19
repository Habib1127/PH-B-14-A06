"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Bookmark, BookmarkCheck, Plus, Check } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { PLAN_CAP, useFitlog } from "@/lib/store";
import Spinner from "@/components/Spinner";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const { plan, inPlan, isSaved, addToPlan, saveForLater } = useFitlog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setMissing(false);

    getWorkout(id)
      .then((data) => !cancelled && setWorkout(data))
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 404) setMissing(true);
        else setError("Could not load this workout. Please try again.");
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Unknown id -> render the app's 404 page.
  if (missing) notFound();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Spinner label="Loading workout…" />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <p className="text-muted">{error || "Something went wrong."}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-black"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  const alreadyInPlan = inPlan(workout.id);
  const planFull = !alreadyInPlan && plan.length >= PLAN_CAP;
  const alreadySaved = isSaved(workout.id);

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted transition hover:text-accent"
      >
        <ArrowLeft size={16} /> All workouts
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: visual */}
        <div className="overflow-hidden rounded-3xl border border-line bg-panel lg:sticky lg:top-24 lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt={workout.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        {/* Right: details */}
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {workout.description}
          </p>

          {/* Key specs */}
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-accent">
              Key Specs
            </h2>
            <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-5 py-3"
                >
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                    {label}
                  </dt>
                  <dd className="text-right text-sm font-semibold text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Instructions */}
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-accent">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions?.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-black">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-gray-200 sm:text-base">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={planFull}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {alreadyInPlan ? (
                <Check size={18} strokeWidth={2.5} />
              ) : (
                <Plus size={18} strokeWidth={2.5} />
              )}
              {planFull
                ? `Plan is full (${PLAN_CAP}/${PLAN_CAP})`
                : alreadyInPlan
                ? "In today's plan"
                : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveForLater(workout)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              {alreadySaved ? (
                <BookmarkCheck size={18} />
              ) : (
                <Bookmark size={18} />
              )}
              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
