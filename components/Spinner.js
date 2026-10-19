import { Dumbbell } from "lucide-react";

// Lifting-dumbbell loader used while data is being fetched.
export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-20 text-muted"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="animate-fitlog-spin absolute inset-0 rounded-full border-2 border-line border-t-accent" />
        <Dumbbell
          size={24}
          className="animate-fitlog-lift text-accent"
          strokeWidth={2.5}
        />
      </div>
      <p className="text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}
