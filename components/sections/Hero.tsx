"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { T } from "@/lib/i18n";

const SLIDES = [
  "/imagenes/poryecto (9126 sabal palm cir windermere)/1L3A6626_twilight_2603c164-2.jpg",
  "/imagenes/Proyecto (1859 red canyo dr kissime)/1859redcanyondr_002-2.jpg",
  "/imagenes/Proyecto (1859 red canyo dr kissime)/1859redcanyondr_001-2.jpg",
  "/imagenes/proyecto ( 1600 little falls Orlando)/1600_Little_Falls_001.jpg",
  "/imagenes/proyecto ( 1600 little falls Orlando)/1600_Little_Falls_006-2.jpg",
  "/imagenes/poryecto (9126 sabal palm cir windermere)/1L3A6791-2.jpg",
  "/imagenes/poryecto (9126 sabal palm cir windermere)/1L3A7016.jpg",
];

const INTERVAL = 6000;
const TRANSITION = 1800;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

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
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
            style={{
              opacity: i === current ? 1 : 0,
              transition: `opacity ${TRANSITION}ms cubic-bezier(0.4,0,0.2,1)`,
              willChange: "opacity",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-deep/45" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,21,16,.85) 0%, rgba(30,21,16,.2) 55%, transparent 100%)" }} />
      </div>

      {/* Slide dots */}
      <div className="absolute top-1/2 right-4 md:right-7 -translate-y-1/2 z-10 flex flex-col gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1 rounded-full transition-all duration-500 ${
              i === current ? "h-6 bg-cream/70" : "h-1.5 bg-cream/20 hover:bg-cream/40"
            }`}
          />
        ))}
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
        <div className="flex flex-col md:items-end gap-5 md:gap-8">
          <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={200} height={70} className="h-10 md:h-14 w-auto drop-shadow-2xl opacity-90" />
          <p className="text-[13px] font-light leading-relaxed text-cream/65 max-w-[280px] md:text-right">
            <T
              es="Medios visuales premium para bienes raíces. Contamos historias que venden propiedades."
              en="Premium visual media for real estate. We tell stories that sell properties."
            />
          </p>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-semibold tracking-[.2em] uppercase text-cream/40">
          <T es="Explorar" en="Explore" />
        </span>
        <div className="w-px h-12 bg-cream/20 scroll-line" />
      </div>
    </section>
  );
}
