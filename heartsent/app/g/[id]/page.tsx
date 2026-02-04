"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function GramPage() {
  const params = useParams();
  const id = params?.id ?? "abc123";
  const [opened, setOpened] = useState(false);

  // Hardcoded sample data for MVP
  const sample = {
    id,
    sender: "Alex",
    recipient: "Taylor",
    message:
      "Happy Valentine's Day, Taylor! Every moment with you is a little adventure — here are a few memories.",
    images: [
      "https://picsum.photos/id/1015/800/600",
      "https://picsum.photos/id/1016/800/600",
      "https://picsum.photos/id/1020/800/600",
      "https://picsum.photos/id/1024/800/600",
      "https://picsum.photos/id/1035/800/600",
    ],
    // Example Spotify track URL — in the real app this would come from the sender
    spotifyUrl: "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp",
  };

  function spotifyEmbedSrc(url: string | undefined) {
    if (!url) return null;
    const m = url.match(/track\/([a-zA-Z0-9]+)/);
    const id = m ? m[1] : null;
    return id ? `https://open.spotify.com/embed/track/${id}` : null;
  }

  const embedSrc = spotifyEmbedSrc(sample.spotifyUrl);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-zinc-500">Heartsent</h2>
            <h1 className="text-2xl font-semibold">A message for {sample.recipient}</h1>
            <p className="text-sm text-zinc-400">From {sample.sender}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="text-sm text-zinc-600 hover:underline">
              Home
            </Link>
            <Link href="/send" className="text-sm text-zinc-600 hover:underline">
              Send
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-[#0b0b0b]">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-medium">You've got a Heartsent 💌</h3>

            {!opened ? (
              <button
                className="mt-4 rounded-full bg-pink-600 px-5 py-2 text-white hover:bg-pink-700"
                onClick={() => setOpened(true)}
              >
                Open 💌
              </button>
            ) : (
              <>
                <div className="whitespace-pre-wrap rounded-md border border-zinc-100 bg-zinc-50 p-4 text-zinc-800 dark:bg-[#0f0f0f] dark:text-zinc-200">
                  {sample.message}
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium text-zinc-600">Memories</h4>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {sample.images.slice(0, 10).map((src, i) => (
                      <div key={i} className="overflow-hidden rounded-md bg-zinc-100">
                        <img src={src} alt={`memory-${i}`} className="h-40 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {embedSrc && (
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium text-zinc-600">A song</h4>
                    <div className="aspect-[16/3] w-full overflow-hidden rounded-md">
                      <iframe
                        src={embedSrc}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="encrypted-media; clipboard-write; picture-in-picture; autoplay"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 text-sm text-zinc-500">Link id: {sample.id}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
