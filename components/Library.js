"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, RefreshCw } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration", key: "duration" },
  { value: "calories", label: "Calories", key: "caloriesBurned" },
  { value: "rating", label: "Rating", key: "rating" },
];

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setWorkouts(await getWorkouts());
    } catch {
      setError("Could not load workouts. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const key = SORT_OPTIONS.find((o) => o.value === sortBy).key;
    const q = query.trim().toLowerCase();

    return workouts
      .filter(
        (w) =>
          !q ||
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups?.some((m) => m.toLowerCase().includes(q))
      )
      .sort((a, b) => b[key] - a[key]);
  }, [workouts, sortBy, query]);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold uppercase sm:text-5xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block">
            <span className="sr-only">Search workouts</span>
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or muscle"
              className="w-full rounded-full border border-line bg-panel py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none sm:w-60"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-muted">
            <span className="font-semibold uppercase tracking-wider">
              Sort By
            </span>
            <span className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-full border border-line bg-panel py-2.5 pl-4 pr-10 text-sm font-semibold text-white focus:border-accent focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-accent"
              />
            </span>
          </label>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-panel py-16 text-center">
          <p className="text-muted">{error}</p>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase text-black"
          >
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      ) : visible.length === 0 ? (
        <p className="py-16 text-center text-muted">
          No workouts match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
