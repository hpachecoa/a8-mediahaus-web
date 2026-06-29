"use client";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

const services = [
  { num: "01", es: "Fotografía Profesional",    en: "Professional Photography",    descEs: "Imágenes HDR de alta resolución que capturan cada espacio en su mejor luz.", descEn: "HDR high-resolution images capturing every space in its best light." },
  { num: "02", es: "Video Cinematic",           en: "Cinematic Video",             descEs: "Producciones de video que narran la historia de cada propiedad con movimientos de cámara fluidos.", descEn: "Video productions narrating each property's story with fluid camera movements." },
  { num: "03", es: "Tours Virtuales 3D",        en: "3D Virtual Tours",            descEs: "Experiencias inmersivas que permiten a los compradores explorar cada rincón desde cualquier lugar.", descEn: "Immersive experiences allowing buyers to explore every corner from anywhere." },
  { num: "04", es: "Fotografía y Video Dron",   en: "Drone Photography & Video",   descEs: "Perspectivas aéreas 4K que revelan el entorno, ubicación y escala de la propiedad.", descEn: "4K aerial perspectives revealing the property's surroundings, location, and scale." },
  { num: "05", es: "Planos de Planta",          en: "Floor Plans",                 descEs: "Planos arquitectónicos precisos con medidas reales para complementar tus listings.", descEn: "Accurate architectural floor plans with real measurements to complement your listings." },
];

function ServiceRow({ num, es, en, descEs, descEn }: typeof services[0]) {
  const r = useReveal();
  return (
    <div ref={r} className="reveal service-row grid grid-cols-[60px_1fr_1fr_auto] items-center gap-12 py-9 border-b border-dark/10 cursor-none group hover:pl-3 transition-all duration-300">
      <span className="text-[11px] font-medium tracking-[.14em] uppercase text-brown">{num}</span>
      <div className="text-[clamp(18px,2.2vw,28px)] font-light text-dark">
        <T es={es} en={en} />
      </div>
      <p className="text-[13px] font-light leading-relaxed text-dark/55">
        <T es={descEs} en={descEn} />
      </p>
      <div className="w-10 h-10 rounded-full border border-dark/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brown group-hover:border-brown transition-colors">
        <svg className="w-3.5 h-3.5 stroke-dark group-hover:stroke-cream transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </div>
  );
}

export default function Services() {
  const rHeader = useReveal();
  return (
    <section id="services" className="bg-cream px-12 py-[120px]">
      <div ref={rHeader} className="reveal flex justify-between items-end mb-20 pb-8 border-b border-dark/12">
        <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-dark tracking-tight leading-[1.1]">
          <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-4">
            02 — <T es="Servicios" en="Services" />
          </span>
          <T es={<>Lo que<br /><em className="italic text-brown">creamos</em></>}
             en={<>What we<br /><em className="italic text-brown">create</em></>} />
        </h2>
        <p className="text-[13px] font-light text-brown max-w-[260px] text-right leading-relaxed">
          <T es="Cada servicio diseñado para maximizar el impacto visual de tu propiedad."
             en="Each service designed to maximize the visual impact of your property." />
        </p>
      </div>
      <div>
        {services.map(s => <ServiceRow key={s.num} {...s} />)}
      </div>
    </section>
  );
}
