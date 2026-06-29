"use client";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

const steps = [
  { num: "01", es: "Consulta Inicial",    en: "Initial Consultation",
    bodyEs: "Entendemos tus objetivos, el tipo de propiedad y el mercado objetivo para diseñar la estrategia visual perfecta.",
    bodyEn: "We understand your goals, property type, and target market to design the perfect visual strategy." },
  { num: "02", es: "Sesión en Propiedad", en: "On-Site Session",
    bodyEs: "Nuestro equipo llega preparado, respetando tus horarios y optimizando cada ángulo de la propiedad.",
    bodyEn: "Our team arrives prepared, respecting your schedule and optimizing every angle of the property." },
  { num: "03", es: "Postproducción",      en: "Post-Production",
    bodyEs: "Edición profesional con corrección de color, retoque y optimización para todos los canales digitales.",
    bodyEn: "Professional editing with color correction, retouching, and optimization for all digital channels." },
  { num: "04", es: "Entrega Digital",     en: "Digital Delivery",
    bodyEs: "Archivos listos para usar en MLS, redes sociales y presentaciones en 24–48 horas.",
    bodyEn: "Files ready for MLS, social media, and presentations in 24–48 hours." },
];

export default function Process() {
  const rH = useReveal();
  const refs = [useReveal(), useReveal(), useReveal(), useReveal()];
  return (
    <section id="process" className="bg-deep px-12 py-[120px]">
      <h2 ref={rH} className="reveal text-[clamp(36px,4.5vw,64px)] font-light text-cream tracking-tight leading-[1.1] mb-[72px]">
        <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-4">
          05 — <T es="Proceso" en="Process" />
        </span>
        <T es={<>Cómo <em className="italic text-cream-dim">trabajamos</em></>}
           en={<>How we <em className="italic text-cream-dim">work</em></>} />
      </h2>
      <div className="grid grid-cols-4 gap-12">
        {steps.map((s, i) => (
          <div key={s.num} ref={refs[i]} className={`reveal reveal-d${i} relative`}>
            {i < steps.length - 1 && (
              <div className="absolute top-6 left-[calc(100%+24px)] w-[calc(100%-48px)] h-px bg-brown/25" />
            )}
            <span className="block text-[64px] font-thin leading-none text-cream/8 tracking-tighter mb-5">{s.num}</span>
            <div className="text-[16px] font-medium text-cream mb-3"><T es={s.es} en={s.en} /></div>
            <p className="text-[13px] font-light leading-[1.7] text-cream/45"><T es={s.bodyEs} en={s.bodyEn} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}
