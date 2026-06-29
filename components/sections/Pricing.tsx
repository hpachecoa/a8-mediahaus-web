"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

/* ─── Sqft ranges & pricing ───────────────────────────────────────────────── */
const SQFT_RANGES = [
  { label: "0 – 1,500 sqft",   max: 1500  },
  { label: "1,501 – 2,500 sqft", max: 2500 },
  { label: "2,501 – 3,500 sqft", max: 3500 },
  { label: "3,501 – 4,500 sqft", max: 4500 },
  { label: "4,501 – 5,500 sqft", max: 5500 },
  { label: "5,501 – 8,000 sqft", max: 8000 },
  { label: "8,001+ sqft",        max: Infinity },
];

const REALTOR_PLANS = [
  {
    id: "essential",
    name: "The Essential",
    tag: { es: "Smart Start", en: "Smart Start" },
    tagStyle: "border border-cream/20 text-cream/50",
    featured: false,
    prices: [200, 240, 280, 320, 365, 410, 470],
    description: {
      es: "Ideal para propiedades estándar. Incluye fotografía profesional interior & exterior más nuestro Digital Marketing Kit — flyers, gráficos para redes y fotos listas para MLS.",
      en: "Perfect for standard-sized listings. Includes professional interior & exterior photography plus our Digital Marketing Kit — flyers, social graphics, and MLS-ready images.",
    },
    features: [
      { es: "Fotos interiores & exteriores", en: "Interior & Exterior Photos" },
      { es: "Digital Marketing Kit",          en: "Digital Marketing Kit" },
    ],
  },
  {
    id: "feature",
    name: "The Feature",
    tag: { es: "Más Popular", en: "Most Popular" },
    tagStyle: "bg-brown text-cream",
    featured: true,
    prices: [375, 435, 500, 565, 630, 700, 800],
    description: {
      es: "Nuestro paquete más solicitado. Incluye todo lo del Essential más Fotos con Drone, Video Aéreo y Tour Virtual 3D.",
      en: "Our most popular package. Includes everything in Essential plus Drone Photos, Drone Video and a 3D Virtual Tour.",
    },
    features: [
      { es: "Fotos interiores & exteriores", en: "Interior & Exterior Photos" },
      { es: "Digital Marketing Kit",          en: "Digital Marketing Kit" },
      { es: "Fotos con Drone",                en: "Drone Photos" },
      { es: "Video Aéreo con Drone",          en: "Drone Video" },
      { es: "Tour Virtual 3D",                en: "3D Virtual Tour" },
    ],
  },
  {
    id: "legacy",
    name: "The Legacy",
    tag: { es: "Mejor Valor", en: "Best Value" },
    tagStyle: "border border-brown-lt text-brown-lt",
    featured: false,
    prices: [650, 750, 870, 950, 1060, 1160, 1350],
    description: {
      es: "Nuestro paquete más completo — reel para redes y video cinematic, tour 3D, cobertura completa con drone y plano 2D. Recomendado para propiedades de 4,000+ sqft.",
      en: "Our most comprehensive package — both social media reel and cinematic video formats, 3D virtual tour, full drone coverage, and 2D floor plan. Recommended for properties 4,000+ sqft.",
    },
    features: [
      { es: "Fotos interiores & exteriores",   en: "Interior & Exterior Photos" },
      { es: "Digital Marketing Kit",            en: "Digital Marketing Kit" },
      { es: "Fotos con Drone",                  en: "Drone Photos" },
      { es: "Video Aéreo con Drone",            en: "Drone Video" },
      { es: "Tour Virtual 3D",                  en: "3D Virtual Tour" },
      { es: "Video Cinematic",                  en: "Cinematic Video" },
      { es: "Plano 2D",                         en: "2D Floor Plan" },
      { es: "Reel Vertical para Redes Sociales", en: "Vertical Social Media Reel" },
    ],
  },
];

/* ─── Vacation rental data (unchanged) ───────────────────────────────────── */
const vacationPlans = [
  {
    id: "vr-starter",
    name: "VR Starter",
    size: { es: "1–3 habitaciones", en: "1–3 bedrooms" },
    price: "$225",
    featured: false,
    features: {
      es: ["20–30 imágenes", "Exteriores & pool destacados", "Licencia extended-use (AirBnB/VRBO)", "Entrega next day"],
      en: ["20–30 images", "Exterior & pool highlights", "Extended-use license (AirBnB/VRBO)", "Next day delivery"],
    },
  },
  {
    id: "vr-pro",
    name: "VR Pro",
    size: { es: "4–6 habitaciones", en: "4–6 bedrooms" },
    price: "$350",
    featured: true,
    badge: { es: "Más Popular", en: "Most Popular" },
    features: {
      es: ["35–45 imágenes", "Drone fotos aéreos", "Reel vertical para redes sociales", "Licencia extended-use (AirBnB/VRBO)", "Entrega next day"],
      en: ["35–45 images", "Aerial drone photos", "Vertical reel for social media", "Extended-use license (AirBnB/VRBO)", "Next day delivery"],
    },
  },
  {
    id: "vr-elite",
    name: "VR Elite",
    size: { es: "7–10 habitaciones", en: "7–10 bedrooms" },
    price: "$525",
    featured: false,
    features: {
      es: ["50–60 imágenes", "Drone fotos + video aéreo", "Video cinematic 1–2 minutos", "Tour virtual 3D", "Licencia extended-use (AirBnB/VRBO)", "Entrega next day"],
      en: ["50–60 images", "Drone photos + aerial video", "1–2 minute cinematic video", "3D virtual tour", "Extended-use license (AirBnB/VRBO)", "Next day delivery"],
    },
  },
];

const addons = [
  { name: { es: "+10 fotos extra", en: "+10 extra photos" }, price: "$95" },
  { name: { es: "Floor Plan 2D", en: "2D Floor Plan" }, price: "$85" },
  { name: { es: "Twilight real", en: "Real twilight" }, price: "$165" },
  { name: { es: "Virtual Twilight", en: "Virtual Twilight" }, price: "$25" },
  { name: { es: "Tour 3D solo", en: "3D Tour only" }, price: "$125" },
  { name: { es: "Virtual Staging", en: "Virtual Staging" }, price: "$40/img" },
];

/* ─── Sqft selector ───────────────────────────────────────────────────────── */
function SqftSelector({ sqftIdx, setSqftIdx }: { sqftIdx: number; setSqftIdx: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 border border-cream/20 rounded-sm px-5 py-3 text-[12px] font-light text-cream/70 hover:border-cream/40 hover:text-cream transition-all cursor-none"
      >
        <span className="text-cream/40 text-[10px] tracking-widest uppercase mr-1">Propiedad</span>
        <span>{SQFT_RANGES[sqftIdx].label}</span>
        <ChevronDown size={13} className={`text-cream/30 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-20 bg-[#1E1510] border border-cream/12 rounded-sm shadow-2xl min-w-[220px]">
          {SQFT_RANGES.map((r, i) => (
            <button
              key={i}
              onClick={() => { setSqftIdx(i); setOpen(false); }}
              className={`w-full text-left px-5 py-3 text-[12px] font-light transition-colors cursor-none ${
                i === sqftIdx ? "text-cream bg-brown/20" : "text-cream/50 hover:text-cream hover:bg-cream/5"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Realtor plan card ───────────────────────────────────────────────────── */
function RealtorCard({ plan, sqftIdx, lang }: { plan: typeof REALTOR_PLANS[number]; sqftIdx: number; lang: "es" | "en" }) {
  const price = plan.prices[sqftIdx];
  return (
    <div
      className={`relative flex flex-col rounded-sm transition-transform duration-300 hover:-translate-y-1 ${
        plan.featured
          ? "bg-brown/15 border-2 border-brown"
          : "bg-deep border border-cream/8 hover:border-cream/20"
      }`}
    >
      {/* Tag */}
      <div className="px-7 pt-7 pb-0">
        <span className={`inline-block text-[9px] font-semibold tracking-[.22em] uppercase px-3 py-1 rounded-sm mb-4 ${plan.tagStyle}`}>
          {lang === "es" ? plan.tag.es : plan.tag.en}
        </span>
      </div>

      {/* Header */}
      <div className={`px-7 pt-3 pb-6 border-b ${plan.featured ? "border-brown/30" : "border-cream/8"}`}>
        <p className="text-[20px] font-light text-cream mb-1">{plan.name}</p>
        <p className="text-[11px] text-cream/30 mb-5 leading-relaxed">
          {lang === "es" ? plan.description.es : plan.description.en}
        </p>
        <div className="flex items-end gap-1">
          <span className="text-[48px] font-light text-cream leading-none tracking-tight">
            ${price.toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-cream/25 mt-1 tracking-wide">
          {SQFT_RANGES[sqftIdx].label}
        </p>
      </div>

      {/* Features */}
      <ul className="flex-1 px-7 py-6 flex flex-col gap-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <Check size={12} className={`flex-shrink-0 ${plan.featured ? "text-brown-lt" : "text-brown/50"}`} />
            <span className="text-[13px] font-light text-cream/55">
              {lang === "es" ? f.es : f.en}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-7 pb-7">
        <a
          href="#contact"
          className={`block text-center py-3 text-[11px] font-semibold tracking-[.16em] uppercase transition-all duration-200 rounded-sm cursor-none ${
            plan.featured
              ? "bg-brown text-cream hover:bg-brown-lt"
              : "border border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream"
          }`}
        >
          <T es="Reservar sesión" en="Book session" />
        </a>
      </div>
    </div>
  );
}

/* ─── Vacation plan card (unchanged) ─────────────────────────────────────── */
function VacationCard({ plan, lang }: { plan: typeof vacationPlans[number]; lang: "es" | "en" }) {
  return (
    <div className={`relative flex flex-col rounded-sm transition-transform duration-300 hover:-translate-y-1 ${
      plan.featured ? "bg-brown/15 border-2 border-brown" : "bg-deep border border-cream/8 hover:border-cream/20"
    }`}>
      {plan.featured && (
        <div className="absolute -top-[13px] left-1/2 -translate-x-1/2">
          <span className="bg-brown text-cream text-[10px] font-semibold tracking-[.14em] uppercase px-4 py-1 rounded-sm whitespace-nowrap">
            {lang === "es" ? plan.badge?.es : plan.badge?.en}
          </span>
        </div>
      )}
      <div className={`px-7 pt-8 pb-6 border-b ${plan.featured ? "border-brown/30" : "border-cream/8"}`}>
        <p className="text-[11px] font-semibold tracking-[.2em] uppercase text-brown-lt mb-1">{plan.name}</p>
        <p className="text-[12px] text-cream/35 mb-5">{lang === "es" ? plan.size.es : plan.size.en}</p>
        <p className="text-[46px] font-light text-cream leading-none tracking-tight">{plan.price}</p>
      </div>
      <ul className="flex-1 px-7 py-6 flex flex-col gap-3">
        {(lang === "es" ? plan.features.es : plan.features.en).map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={13} className={`mt-[3px] flex-shrink-0 ${plan.featured ? "text-brown-lt" : "text-brown/60"}`} />
            <span className="text-[13px] font-light text-cream/55 leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <div className="px-7 pb-7">
        <a
          href="#contact"
          className={`block text-center py-3 text-[11px] font-semibold tracking-[.16em] uppercase transition-all duration-200 rounded-sm cursor-none ${
            plan.featured ? "bg-brown text-cream hover:bg-brown-lt" : "border border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream"
          }`}
        >
          <T es="Reservar sesión" en="Book session" />
        </a>
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export default function Pricing() {
  const [tab, setTab] = useState<"realtors" | "vacation">("realtors");
  const [sqftIdx, setSqftIdx] = useState(0);
  const lang: "es" | "en" = "es";
  const rHeader = useReveal();
  const rTabs = useReveal();

  return (
    <section id="pricing" className="bg-dark py-[120px]">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Header */}
        <div ref={rHeader} className="reveal mb-14">
          <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-cream/60 mb-4">
            04 — <T es="Servicios & Precios" en="Services & Pricing" />
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-cream tracking-tight leading-[1.1]">
              <T
                es={<>Paquetes para <em className="italic text-cream-dim">cada necesidad</em></>}
                en={<>Packages for <em className="italic text-cream-dim">every need</em></>}
              />
            </h2>
            <p className="text-[13px] font-light text-cream/35 md:text-right max-w-xs">
              <T es="Marketing kit incluido · Entrega 24 hrs" en="Marketing kit included · 24 hr delivery" />
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div ref={rTabs} className="reveal flex gap-3 mb-10">
          <button
            onClick={() => setTab("realtors")}
            className={`px-6 py-2 text-[11px] font-semibold tracking-[.16em] uppercase rounded-sm border transition-all duration-200 cursor-none ${
              tab === "realtors" ? "bg-brown border-brown text-cream" : "bg-transparent border-cream/15 text-cream/40 hover:border-cream/30 hover:text-cream/70"
            }`}
          >
            <T es="Para Realtors" en="For Realtors" />
          </button>
          <button
            onClick={() => setTab("vacation")}
            className={`px-6 py-2 text-[11px] font-semibold tracking-[.16em] uppercase rounded-sm border transition-all duration-200 cursor-none ${
              tab === "vacation" ? "bg-brown border-brown text-cream" : "bg-transparent border-cream/15 text-cream/40 hover:border-cream/30 hover:text-cream/70"
            }`}
          >
            <T es="Vacation Rentals" en="Vacation Rentals" />
          </button>
        </div>

        {/* Sqft selector — only for realtors */}
        {tab === "realtors" && (
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[11px] text-cream/30 tracking-widest uppercase">
              <T es="Tamaño de la propiedad:" en="Property size:" />
            </span>
            <SqftSelector sqftIdx={sqftIdx} setSqftIdx={setSqftIdx} />
          </div>
        )}

        {/* Grids */}
        {tab === "realtors" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
            {REALTOR_PLANS.map(plan => (
              <RealtorCard key={plan.id} plan={plan} sqftIdx={sqftIdx} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
            {vacationPlans.map(plan => (
              <VacationCard key={plan.id} plan={plan} lang={lang} />
            ))}
          </div>
        )}

        {/* Add-ons */}
        <div className="border border-cream/8 rounded-sm px-8 pt-8 pb-7">
          <p className="text-[11px] font-semibold tracking-[.18em] uppercase text-cream/60 mb-6 text-center">
            <T es="Servicios adicionales — À La Carte" en="Add-on Services — À La Carte" />
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {addons.map((a, i) => (
              <div key={i} className="flex flex-col items-center gap-1 border border-cream/8 rounded-sm px-4 py-4 hover:border-cream/20 transition-colors">
                <span className="text-[18px] font-light text-cream leading-none">{a.price}</span>
                <span className="text-[11px] font-light text-cream/35 text-center leading-snug mt-1">
                  <T es={a.name.es} en={a.name.en} />
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
