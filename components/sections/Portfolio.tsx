"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

/* ── Projects data ─────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "red-canyon",
    location: "Kissimmee, FL",
    address: "1859 Red Canyon Dr",
    folder: "/imagenes/Proyecto (1859 red canyo dr kissime)",
    photos: [
      "1859redcanyondr_001-2.jpg","1859redcanyondr_002-2.jpg","1859redcanyondr_003-2.jpg",
      "1859redcanyondr_004.jpg","1859redcanyondr_005.jpg","1859redcanyondr_006.jpg",
      "1859redcanyondr_008-2.jpg","1859redcanyondr_009-2.jpg","1859redcanyondr_010-2.jpg",
      "1859redcanyondr_011.jpg","1859redcanyondr_012.jpg","1859redcanyondr_013.jpg",
      "1859redcanyondr_014.jpg","1859redcanyondr_015-2.jpg","1859redcanyondr_016-2.jpg",
      "1859redcanyondr_017-2.jpg","1859redcanyondr_018.jpg","1859redcanyondr_019-2.jpg",
      "1859redcanyondr_020-2.jpg","1859redcanyondr_021.jpg","1859redcanyondr_022.jpg",
      "1859redcanyondr_025-2.jpg",
    ],
  },
  {
    id: "little-falls",
    location: "Orlando, FL",
    address: "1600 Little Falls",
    folder: "/imagenes/proyecto ( 1600 little falls Orlando)",
    photos: [
      "1600_Little_Falls_001.jpg","1600_Little_Falls_003.jpg","1600_Little_Falls_006-2.jpg",
      "1600_Little_Falls_009.jpg","1600_Little_Falls_015-2.jpg","1600_Little_Falls_017.jpg",
      "1600_Little_Falls_018.jpg","1600_Little_Falls_020.jpg","1600_Little_Falls_022-2.jpg",
      "1600_Little_Falls_024.jpg",
    ],
  },
  {
    id: "sabal-palm",
    location: "Windermere, FL",
    address: "9126 Sabal Palm Cir",
    folder: "/imagenes/poryecto (9126 sabal palm cir windermere)",
    photos: [
      "1L3A6626_twilight_2603c164-2.jpg","1L3A6646-2.jpg","1L3A6691-2.jpg",
      "1L3A6726-2.jpg","1L3A6746-2.jpg","1L3A6771-2.jpg","1L3A6776-2.jpg",
      "1L3A6791-2.jpg","1L3A6801-2.jpg","1L3A6841-2.jpg","1L3A6861.jpg",
      "1L3A6871.jpg","1L3A6941-2.jpg","1L3A7016.jpg","1L3A7021.jpg",
      "1L3A7051.jpg","1L3A7076-2.jpg","1L3A7101-2.jpg",
    ],
  },
];

type Project = typeof PROJECTS[number];

/* ── Lightbox ──────────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const photos = project.photos.map(p => `${project.folder}/${p}`);
  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
  const next = () => setCurrent(i => (i + 1) % photos.length);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[rgba(12,8,4,.97)] flex flex-col"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-4 border-b border-cream/8 flex-shrink-0">
        <span className="text-[12px] font-light tracking-widest text-cream/40 uppercase">
          {project.address} — {project.location}
        </span>
        <button onClick={onClose} className="border border-cream/15 text-cream-dim p-2 rounded-sm hover:bg-cream/10 transition-colors cursor-none">
          <X size={16} />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 relative flex items-center justify-center px-16 py-4">
        <button onClick={prev} className="absolute left-4 z-10 bg-deep/70 border border-cream/12 text-cream-dim p-3 rounded-sm hover:bg-cream/10 transition-colors cursor-none">
          <ChevronLeft size={18} />
        </button>
        <div className="relative w-full h-full">
          <Image src={photos[current]} alt="" fill className="object-contain" unoptimized />
        </div>
        <button onClick={next} className="absolute right-4 z-10 bg-deep/70 border border-cream/12 text-cream-dim p-3 rounded-sm hover:bg-cream/10 transition-colors cursor-none">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Footer strip */}
      <div className="flex-shrink-0 border-t border-cream/8 px-5 py-3">
        <p className="text-center text-[11px] tracking-[.14em] text-cream/25 mb-2">
          {current + 1} / {photos.length}
        </p>
        <div className="flex gap-[3px] overflow-x-auto justify-center" style={{ scrollbarWidth: "none" }}>
          {photos.map((src, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="flex-shrink-0 cursor-none">
              <Image
                src={src} alt="" width={52} height={36}
                className={`object-cover rounded-sm border transition-all ${
                  i === current ? "opacity-100 border-brown" : "opacity-30 border-transparent hover:opacity-60"
                }`}
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Project card ──────────────────────────────────────────────────────────── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const hero = `${project.folder}/${project.photos[0]}`;
  return (
    <button
      onClick={onClick}
      className="group relative flex-shrink-0 w-[380px] lg:w-[460px] overflow-hidden rounded-sm cursor-pointer text-left"
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={hero}
        alt={project.address}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 to-transparent" />
      <div className="absolute top-5 right-5 bg-deep/60 backdrop-blur-sm border border-cream/10 px-3 py-1 rounded-sm">
        <span className="text-[10px] tracking-widest text-cream/50">{project.photos.length} IMGS</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-2">
        <span className="text-[10px] font-semibold tracking-[.22em] uppercase text-brown-lt">{project.location}</span>
        <h3 className="text-[22px] font-light text-cream leading-tight">{project.address}</h3>
        <p className="text-[12px] font-light text-cream/45 mt-0.5">{project.photos.length} fotografías · Residencial</p>
        <div className="flex items-center gap-2 mt-3 text-[11px] font-semibold tracking-[.16em] uppercase text-cream/50 group-hover:text-cream transition-colors duration-300">
          <span><T es="Ver proyecto" en="View project" /></span>
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function PlaceholderCard() {
  return (
    <div
      className="group relative flex-shrink-0 w-[380px] lg:w-[460px] overflow-hidden rounded-sm border border-cream/8 flex flex-col items-center justify-center gap-5"
      style={{ aspectRatio: "3/4" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative w-12 h-12 border border-cream/15 rounded-sm flex items-center justify-center">
        <span className="text-cream/20 text-2xl font-extralight leading-none">+</span>
      </div>
      <div className="relative text-center px-10">
        <p className="text-[13px] font-light text-cream/30 leading-relaxed">
          <T
            es={<>Tu próximo proyecto<br /><span className="text-cream/15">podría estar aquí</span></>}
            en={<>Your next project<br /><span className="text-cream/15">could be here</span></>}
          />
        </p>
      </div>
    </div>
  );
}

/* ── Portfolio section ─────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const rHeader = useReveal();
  const rGallery = useReveal();

  return (
    <>
      <section id="portfolio" className="bg-deep py-[120px] overflow-hidden">
        <div ref={rHeader} className="reveal px-12 mb-14">
          <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-4">
            03 — Portfolio
          </span>
          <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-cream tracking-tight leading-[1.1]">
            <T
              es={<>Proyectos <em className="italic text-cream-dim">recientes</em></>}
              en={<>Recent <em className="italic text-cream-dim">projects</em></>}
            />
          </h2>
          <p className="text-[13px] font-light text-cream/35 mt-3">
            <T
              es="Haz click en el proyecto para ver la galería completa"
              en="Click a project to view the full gallery"
            />
          </p>
        </div>

        <div ref={rGallery} className="reveal">
          <div className="flex gap-5 px-12 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {PROJECTS.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => setActiveProject(p)} />
            ))}
            <PlaceholderCard />
          </div>
        </div>
      </section>

      {activeProject && (
        <Lightbox project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
