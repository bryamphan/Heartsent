import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-24 px-8 sm:items-start">
        <div className="w-full rounded-2xl bg-white p-12 shadow-md dark:bg-[#0b0b0b]">
          <h1 className="text-4xl font-bold text-pink-600">Heartsent</h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
            A tiny Valentine’s gram app — create a sweet message, add memories, and
            share a link. This is an MVP with hardcoded sample data for the
            receiver view.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/send"
              className="rounded-full bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
            >
              Send a gram
            </Link>

            <Link
              href="/g/abc123"
              className="ml-0 rounded-full border border-pink-600 px-6 py-3 text-pink-600 hover:bg-pink-50 sm:ml-4"
            >
              View sample gram
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 text-sm text-zinc-500">
            Routes: <span className="text-zinc-700">/</span>,{' '}
            <span className="text-zinc-700">/send</span>,{' '}
            <span className="text-zinc-700">/g/[id]</span>
          </div>
        </div>
      </main>
    </div>
  );
}
