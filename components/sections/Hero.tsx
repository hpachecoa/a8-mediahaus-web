"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { T } from "@/lib/i18n";

const HERO_VIDEO = "/videos/park-square-homes.mp4";
const HERO_POSTER = "/videos/park-square-homes-poster.jpg";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Parallax on the background layer while scrolling through the hero
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current && window.scrollY < window.innerHeight)
        bgRef.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.28}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal the hero content
  useEffect(() => {
    const t = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.transition = "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)";
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "translateY(0)";
      }
    }, 200);
    return () => clearTimeout(t);
  }, []);

  // Nudge autoplay on browsers that need a muted programmatic play() call.
  // If it's blocked (e.g. iOS Low Power Mode) the poster stays visible instead.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden flex items-end">
      <div ref={bgRef} className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
        {/* Poster — always-visible fallback (shows if autoplay is blocked) */}
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
        />
        {/* Video — fades in only once it actually starts playing, so no native
            play button is ever shown when autoplay is blocked */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover object-[center_40%] transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-deep/45" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,21,16,.9) 0%, rgba(30,21,16,.35) 45%, rgba(30,21,16,.1) 70%, transparent 100%)" }} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-18 flex flex-col md:grid md:grid-cols-2 md:items-end gap-7 md:gap-10"
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        {/* Mobile-only brand logo, left-aligned above the copy */}
        <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={200} height={70} className="block md:hidden self-start h-[84px] w-auto opacity-90 drop-shadow-2xl" />
        <div>
          <div className="inline-block text-[9px] md:text-[10px] font-semibold tracking-[.18em] md:tracking-[.22em] uppercase text-cream-dim border border-cream/25 px-3 py-1.5 rounded-sm mb-5 md:mb-7">
            <T es="Fotografía · Video · Tours 3D · Dron · Planos" en="Photography · Video · 3D Tours · Drone · Floor Plans" />
          </div>
          <h1 className="text-[clamp(46px,7vw,96px)] font-light leading-[0.98] text-cream tracking-tight">
            <T
              es={<>Cada Detalle<br /><em className="italic font-light text-cream-dim">Importa</em></>}
              en={<>Every Detail<br /><em className="italic font-light text-cream-dim">Matters</em></>}
            />
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end gap-5 md:gap-8">
          {/* Logo only on desktop — on mobile it already lives in the nav */}
          <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={200} height={70} className="hidden md:block h-14 w-auto drop-shadow-2xl opacity-90" />
          <p className="text-[14px] md:text-[13px] font-light leading-relaxed text-cream/70 max-w-[320px] md:max-w-[280px] md:text-right">
            <T
              es="Medios visuales premium para bienes raíces. Contamos historias que venden propiedades."
              en="Premium visual media for real estate. We tell stories that sell properties."
            />
          </p>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
        <span className="text-[9px] font-semibold tracking-[.2em] uppercase text-cream/40">
          <T es="Explorar" en="Explore" />
        </span>
        <div className="w-px h-12 bg-cream/20 scroll-line" />
      </div>
    </section>
  );
}
