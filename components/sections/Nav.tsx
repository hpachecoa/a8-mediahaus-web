"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang, T } from "@/lib/i18n";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "px-6 md:px-12 py-4 bg-deep/90 backdrop-blur-md" : "px-6 md:px-12 py-5 md:py-7"
      }`}>
        <a href="#hero">
          <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={140} height={48} className="h-8 md:h-10 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#services" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors"><T es="Servicios" en="Services" /></a>
          <a href="#portfolio" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors">Portfolio</a>
          <a href="#about" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors"><T es="Nosotros" en="About" /></a>
          <a href="#contact" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors"><T es="Contacto" en="Contact" /></a>
          <button onClick={toggle} className="text-[11px] font-medium tracking-[.12em] uppercase text-cream-dim hover:text-cream transition-colors bg-transparent border-none">EN / ES</button>
          <a href="#contact" className="text-[11px] font-semibold tracking-[.16em] uppercase text-cream border border-cream/40 px-6 py-2.5 rounded-sm hover:bg-brown hover:border-brown transition-colors">
            <T es="Cotizar" en="Get Quote" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className={`block w-6 h-px bg-cream transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-cream transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-cream transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-deep/97 flex flex-col items-center justify-center gap-10 md:hidden">
          {[
            { href: "#services", es: "Servicios", en: "Services" },
            { href: "#portfolio", es: "Portfolio", en: "Portfolio" },
            { href: "#about", es: "Nosotros", en: "About" },
            { href: "#contact", es: "Contacto", en: "Contact" },
          ].map(l => (
            <a key={l.href} href={l.href} onClick={close}
              className="text-[22px] font-light tracking-wide text-cream hover:text-brown transition-colors">
              <T es={l.es} en={l.en} />
            </a>
          ))}
          <button onClick={toggle} className="text-[12px] font-medium tracking-[.18em] uppercase text-cream-dim border border-cream/20 px-6 py-2 rounded-sm mt-4">EN / ES</button>
          <a href="#contact" onClick={close} className="text-[12px] font-semibold tracking-[.18em] uppercase text-cream bg-brown px-8 py-3 rounded-sm">
            <T es="Cotizar" en="Get Quote" />
          </a>
        </div>
      )}
    </>
  );
}
