import Link from "next/link";

export const metadata = {
  title: "404 — Page not found | FitLog",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-8xl font-bold text-accent sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold uppercase sm:text-4xl">
        Rep not found
      </h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for skipped leg day and doesn&apos;t
        exist. Head back to the library and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95"
      >
        Back to home
      </Link>
    </div>
  );
}
