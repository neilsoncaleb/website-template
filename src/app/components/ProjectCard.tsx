"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  summary: string;
  coverUrl?: string;
};

export default function ProjectCard({ id, title, summary, coverUrl }: Props) {
  const [open, setOpen] = useState(false);

  // 🔒 Lock background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <article
        className="
          group relative overflow-hidden rounded-2xl border border-white/10
          bg-white/5 backdrop-blur-md
          shadow-md hover:shadow-xl hover:scale-[1.02] transition-all
          focus-within:ring-2 focus-within:ring-accent
        "
      >
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={coverUrl || "https://placehold.co/600x400"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="
              object-cover rounded-t-2xl
              transition-transform duration-500 group-hover:scale-105
            "
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="
              text-lg font-semibold bg-gradient-to-r from-accent to-accent-dark
              bg-clip-text text-transparent
            "
          >
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-300 line-clamp-2">
            {summary || "No summary available."}
          </p>

          <div className="mt-4 flex items-center gap-3">
            {/* Quick peek button (modal) */}
            <button
              onClick={() => setOpen(true)}
              className="
                rounded-full bg-gradient-to-r from-accent to-accent-dark
                px-4 py-2 text-sm font-medium text-white shadow
                hover:opacity-90 transition
              "
            >
              Quick peek
            </button>

            {/* More info button (navigates to full page) */}
            <Link
              href={`/projects/${id}`}
              className="
                rounded-full border border-accent px-4 py-2 text-sm font-medium
                text-accent hover:bg-accent hover:text-white transition
              "
            >
              More info
            </Link>
          </div>
        </div>

        {/* Subtle gradient overlay on hover */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-black/40 to-transparent
            opacity-0 group-hover:opacity-100 transition
          "
        />
      </article>

      {/* Glass modal rendered via Portal */}
      {open &&
        createPortal(
          <div
            className="
              fixed inset-0 z-50 flex items-center justify-center
              bg-black/70 p-4
            "
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="
                w-full max-w-lg rounded-t-2xl sm:rounded-2xl
                bg-white/10 backdrop-blur-lg border border-white/10
                p-6 shadow-2xl text-white
                max-h-[90vh] sm:max-h-[80vh] overflow-y-auto
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-xl font-semibold">{title}</h4>
                <button
                  onClick={() => setOpen(false)}
                  className="
                    rounded-md border border-white/20 px-2 py-1 text-sm
                    hover:bg-white/10 transition
                  "
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="relative mt-4 h-56 w-full">
                <Image
                  src={coverUrl || "https://placehold.co/600x400"}
                  alt={title}
                  fill
                  sizes="100vw"
                  className="object-cover rounded-lg"
                />
              </div>

              <p className="mt-4 text-gray-200">
                {summary || "No summary available."}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
