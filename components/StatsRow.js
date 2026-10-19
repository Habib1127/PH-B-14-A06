import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({ workout, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <Clock size={15} className="text-accent" />
        {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame size={15} className="text-orange-400" />
        {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star size={15} className="fill-yellow-400 text-yellow-400" />
        {workout.rating}
      </span>
    </div>
  );
}
