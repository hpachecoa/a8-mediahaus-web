"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

/* ── Videos data ───────────────────────────────────────────────────────────────
   Para agregar un video nuevo:
   1. Coloca el archivo .mp4 (H.264, web-ready) en  public/videos/
   2. Agrega una entrada aquí con su src, un poster (imagen de portada) y el título.
   Recomendado: MP4 optimizado para web y menos de ~15 MB por clip.               */
const VIDEOS = [
  {
    id: "park-square-homes",
    src: "/videos/park-square-homes.mp4",
    poster: "/videos/park-square-homes-poster.jpg",
    category: { es: "Cinematográfico", en: "Cinematic" },
    title: { es: "Park Square Homes", en: "Park Square Homes" },
    meta: { es: "Video · Inmobiliario", en: "Video · Real estate" },
  },
] as const;

type Video = (typeof VIDEOS)[number];

/* ── Modal player ──────────────────────────────────────────────────────────────*/
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[rgba(12,8,4,.97)] flex flex-col"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-4 border-b border-cream/8 flex-shrink-0">
        <span className="text-[12px] font-light tracking-widest text-cream/40 uppercase">
          <T es={video.title.es} en={video.title.en} /> — <T es={video.category.es} en={video.category.en} />
        </span>
        <button onClick={onClose} className="border border-cream/15 text-cream-dim p-2 rounded-sm hover:bg-cream/10 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Player */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-4 md:px-16 py-6">
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-sm"
        />
      </div>
    </div>
  );
}

/* ── Video card ────────────────────────────────────────────────────────────────*/
function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  const preview = (play: boolean) => {
    const v = ref.current;
    if (!v) return;
    if (play) { v.currentTime = 0; v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      className="group relative flex-shrink-0 w-[300px] sm:w-[420px] lg:w-[560px] overflow-hidden rounded-sm cursor-pointer text-left"
      style={{ aspectRatio: "16/9" }}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/30 to-transparent" />

      {/* Play badge */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-cream/25 bg-deep/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-brown group-hover:border-brown group-hover:scale-110">
          <Play size={22} className="text-cream translate-x-[2px]" fill="currentColor" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold tracking-[.22em] uppercase text-brown-lt">
          <T es={video.category.es} en={video.category.en} />
        </span>
        <h3 className="text-[22px] font-light text-cream leading-tight">
          <T es={video.title.es} en={video.title.en} />
        </h3>
        <p className="text-[12px] font-light text-cream/45 mt-0.5">
          <T es={video.meta.es} en={video.meta.en} />
        </p>
      </div>
    </button>
  );
}

function PlaceholderCard() {
  return (
    <div
      className="group relative flex-shrink-0 w-[300px] sm:w-[420px] lg:w-[560px] overflow-hidden rounded-sm border border-cream/8 flex flex-col items-center justify-center gap-5"
      style={{ aspectRatio: "16/9" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative w-12 h-12 border border-cream/15 rounded-sm flex items-center justify-center">
        <Play size={18} className="text-cream/20 translate-x-[1px]" />
      </div>
      <div className="relative text-center px-10">
        <p className="text-[13px] font-light text-cream/30 leading-relaxed">
          <T
            es={<>Más videos<br /><span className="text-cream/15">próximamente</span></>}
            en={<>More videos<br /><span className="text-cream/15">coming soon</span></>}
          />
        </p>
      </div>
    </div>
  );
}

/* ── Video section ─────────────────────────────────────────────────────────────*/
export default function Video() {
  const [active, setActive] = useState<Video | null>(null);
  const rHeader = useReveal();
  const rGallery = useReveal();

  return (
    <>
      <section id="video" className="bg-deep pt-0 pb-16 md:pb-[120px] overflow-hidden">
        <div ref={rHeader} className="reveal px-6 md:px-12 mb-10 md:mb-14">
          <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-4">
            04 — Reel
          </span>
          <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-cream tracking-tight leading-[1.1]">
            <T
              es={<>Trabajo en <em className="italic text-cream-dim">video</em></>}
              en={<>Video <em className="italic text-cream-dim">work</em></>}
            />
          </h2>
          <p className="text-[13px] font-light text-cream/35 mt-3">
            <T
              es="Haz click en un video para reproducirlo en pantalla completa"
              en="Click a video to play it fullscreen"
            />
          </p>
        </div>

        <div ref={rGallery} className="reveal">
          <div className="flex gap-4 md:gap-5 px-6 md:px-12 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {VIDEOS.map(v => (
              <VideoCard key={v.id} video={v} onClick={() => setActive(v)} />
            ))}
            <PlaceholderCard />
          </div>
        </div>
      </section>

      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </>
  );
}
