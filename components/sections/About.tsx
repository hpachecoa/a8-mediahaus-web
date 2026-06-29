"use client";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

const values = [
  { es: "Precisión Técnica",  en: "Technical Precision",
    bodyEs: "Equipo de última generación, postproducción profesional y atención obsesiva al detalle en cada imagen.",
    bodyEn: "Latest generation equipment, professional post-production, and obsessive attention to detail in every image." },
  { es: "Entrega Rápida",     en: "Fast Delivery",
    bodyEs: "Entendemos los plazos del mercado inmobiliario. Material listo en 24–48 horas garantizado.",
    bodyEn: "We understand real estate market deadlines. Material ready in 24–48 hours guaranteed." },
  { es: "Experiencia Bilingüe", en: "Bilingual Experience",
    bodyEs: "Atendemos clientes en inglés y español, facilitando la comunicación en mercados internacionales.",
    bodyEn: "We serve clients in English and Spanish, facilitating communication in international markets." },
];

export default function About() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="about" className="bg-cream px-6 md:px-12 py-16 md:py-[120px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
      <div ref={r1} className="reveal">
        <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-5">
          04 — <T es="Nuestra Filosofía" en="Our Philosophy" />
        </span>
        <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-dark tracking-tight leading-[1.1] mb-9">
          <T es={<>Calidad que<br /><em className="italic text-brown">trasciende</em></>}
             en={<>Quality that<br /><em className="italic text-brown">transcends</em></>} />
        </h2>
        <p className="text-[15px] font-light leading-[1.8] text-dark/65">
          <T es="No creamos contenido genérico. Cada proyecto es una colaboración artística donde la precisión técnica y la sensibilidad estética se unen para contar la historia única de cada espacio."
             en="We don't create generic content. Each project is an artistic collaboration where technical precision and aesthetic sensibility unite to tell the unique story of each space." />
        </p>
      </div>
      <div ref={r2} className="reveal reveal-d1 flex flex-col gap-8 pt-5">
        {values.map(v => (
          <div key={v.en} className="p-8 border border-dark/10 rounded-sm">
            <div className="text-[14px] font-semibold tracking-[.08em] uppercase text-brown mb-2.5">
              <T es={v.es} en={v.en} />
            </div>
            <p className="text-[14px] font-light leading-[1.7] text-dark/60">
              <T es={v.bodyEs} en={v.bodyEn} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
