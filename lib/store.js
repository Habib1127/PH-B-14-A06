"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "fitlog:v1";
export const PLAN_CAP = 5;

const FitlogContext = createContext(null);

// Keep only what the My Plan page needs so localStorage stays small.
function slim(w) {
  return {
    id: w.id,
    name: w.name,
    image: w.image,
    muscleGroups: w.muscleGroups,
    equipment: w.equipment,
    duration: w.duration,
    caloriesBurned: w.caloriesBurned,
    rating: w.rating,
  };
}

export function FitlogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted data once on the client.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(Array.isArray(data.plan) ? data.plan : []);
        setSaved(Array.isArray(data.saved) ? data.saved : []);
        setDone(Array.isArray(data.done) ? data.done : []);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after the initial load).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    } catch {
      /* storage may be unavailable */
    }
  }, [plan, saved, done, hydrated]);

  const inPlan = useCallback((id) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id) => saved.some((w) => w.id === id), [saved]);
  const isDone = useCallback((id) => done.includes(id), [done]);

  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((w) => w.id === workout.id)) {
        toast("Already in today's plan", { icon: "ℹ️" });
        return false;
      }
      if (plan.length >= PLAN_CAP) {
        toast.error(`Today's plan is full (${PLAN_CAP} lifts max)`);
        return false;
      }
      setPlan((p) => [...p, slim(workout)]);
      toast.success(`${workout.name} added to today's plan`);
      return true;
    },
    [plan]
  );

  const saveForLater = useCallback(
    (workout) => {
      if (saved.some((w) => w.id === workout.id)) {
        toast("Already saved for later", { icon: "ℹ️" });
        return false;
      }
      setSaved((s) => [...s, slim(workout)]);
      toast.success(`${workout.name} saved for later`);
      return true;
    },
    [saved]
  );

  const removeFromPlan = useCallback((workout) => {
    setPlan((p) => p.filter((w) => w.id !== workout.id));
    setDone((d) => d.filter((id) => id !== workout.id));
    toast.success(`${workout.name} removed from today's plan`);
  }, []);

  const removeFromSaved = useCallback((workout) => {
    setSaved((s) => s.filter((w) => w.id !== workout.id));
    toast.success(`${workout.name} removed from saved`);
  }, []);

  const markDone = useCallback(
    (workout) => {
      if (done.includes(workout.id)) return;
      setDone((d) => [...d, workout.id]);
      toast.success(`${workout.name} marked as done. Nice work!`);
    },
    [done]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      hydrated,
      inPlan,
      isSaved,
      isDone,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [
      plan,
      saved,
      done,
      hydrated,
      inPlan,
      isSaved,
      isDone,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    ]
  );

  return (
    <FitlogContext.Provider value={value}>{children}</FitlogContext.Provider>
  );
}

export function useFitlog() {
  const ctx = useContext(FitlogContext);
  if (!ctx) throw new Error("useFitlog must be used inside FitlogProvider");
  return ctx;
}
