import Link from "next/link";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition duration-200 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="aspect-[4/3] overflow-hidden bg-panel-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold uppercase leading-tight text-white">
            {workout.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{workout.equipment}</p>
        </div>

        <StatsRow
          workout={workout}
          className="mt-auto border-t border-line pt-3"
        />
      </div>
    </Link>
  );
}
