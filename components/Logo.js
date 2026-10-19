import { Dumbbell } from "lucide-react";

export default function Logo({ size = "md" }) {
  const box = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`${box} flex items-center justify-center rounded-lg bg-accent text-black`}
      >
        <Dumbbell size={size === "sm" ? 16 : 18} strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-bold tracking-wider text-white">
        FITLOG
      </span>
    </span>
  );
}
