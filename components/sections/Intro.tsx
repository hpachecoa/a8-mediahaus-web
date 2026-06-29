"use client";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

export default function Intro() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="intro" className="bg-deep px-12 py-[120px] grid grid-cols-2 gap-20 items-center">
      <div ref={r1} className="reveal">
        <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-5">
          01 — <T es="Quiénes Somos" en="Who We Are" />
        </span>
        <p className="text-[clamp(40px,5vw,72px)] font-light leading-[1.1] text-cream tracking-tight">
          <T es={<>Visuales que<br /><em className="italic text-cream-dim">transforman</em><br />propiedades</>}
             en={<>Visuals that<br /><em className="italic text-cream-dim">transform</em><br />properties</>} />
        </p>
      </div>
      <div ref={r2} className="reveal reveal-d1">
        <p className="text-[15px] font-light leading-[1.8] text-cream/60 mb-10">
          <T es="Somos una agencia especializada en medios visuales para el mercado inmobiliario. Combinamos técnica cinematográfica con conocimiento profundo del sector para crear contenido que conecta emocionalmente con compradores."
             en="We are a specialized visual media agency for the real estate market. We combine cinematic technique with deep industry knowledge to create content that emotionally connects with buyers." />
        </p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { num: "10+",   es: "Años de experiencia", en: "Years of experience" },
            { num: "24 hrs", es: "Entrega garantizada", en: "Guaranteed delivery" },
            { num: "100%",  es: "Satisfacción garantizada", en: "Satisfaction guaranteed" },
            { num: "HDR",   es: "Edición profesional", en: "Professional editing" },
          ].map(({ num, es, en }) => (
            <div key={num}>
              <span className="block text-[clamp(36px,4vw,52px)] font-thin text-cream tracking-tight border-b border-brown/30 pb-4 mb-2">{num}</span>
              <span className="text-[11px] font-medium tracking-[.14em] uppercase text-brown-lt"><T es={es} en={en} /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
