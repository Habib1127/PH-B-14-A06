// Primary API first, alternative API as an automatic fallback.
const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function request(suffix = "") {
  let lastError = new Error("Failed to load data");

  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${suffix}`, { cache: "no-store" });

      if (res.status === 404) {
        const notFound = new Error("Not found");
        notFound.status = 404;
        throw notFound;
      }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const json = await res.json();
      return json?.data ?? json;
    } catch (err) {
      if (err.status === 404) throw err;
      lastError = err;
    }
  }

  throw lastError;
}

export async function getWorkouts() {
  const data = await request();
  return Array.isArray(data) ? data : [];
}

export async function getWorkout(id) {
  const data = await request(`/${id}`);
  if (!data || Array.isArray(data) || !data.id) {
    const notFound = new Error("Not found");
    notFound.status = 404;
    throw notFound;
  }
  return data;
}
