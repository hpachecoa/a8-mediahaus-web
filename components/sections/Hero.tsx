"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { T } from "@/lib/i18n";

const HERO_VIDEO = "/videos/park-square-homes.mp4";
const HERO_POSTER = "/videos/park-square-homes-poster.jpg";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current && window.scrollY < window.innerHeight)
        bgRef.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.28}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden flex items-end">
      <div ref={bgRef} className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
        <video
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-deep/45" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,21,16,.85) 0%, rgba(30,21,16,.2) 55%, transparent 100%)" }} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 md:px-12 pb-14 md:pb-18 flex flex-col md:grid md:grid-cols-2 items-end gap-6 md:gap-10"
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        <div>
          <div className="inline-block text-[9px] md:text-[10px] font-semibold tracking-[.22em] uppercase text-cream-dim border border-cream/25 px-3 py-1.5 rounded-sm mb-5 md:mb-7">
            <T es="Fotografía · Video · Tours 3D · Dron · Planos" en="Photography · Video · 3D Tours · Drone · Floor Plans" />
          </div>
          <h1 className="text-[clamp(42px,7vw,96px)] font-light leading-none text-cream tracking-tight">
            <T
              es={<>Cada Detalle<br /><em className="italic font-light text-cream-dim">Importa</em></>}
              en={<>Every Detail<br /><em className="italic font-light text-cream-dim">Matters</em></>}
            />
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end gap-5 md:gap-8">
          <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={200} height={70} className="h-11 md:h-14 w-auto drop-shadow-2xl opacity-90" />
          <p className="text-[13px] font-light leading-relaxed text-cream/65 max-w-[280px] md:text-right">
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
