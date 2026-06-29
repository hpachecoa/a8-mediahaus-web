"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang, T } from "@/lib/i18n";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
      scrolled ? "px-12 py-4 bg-deep/90 backdrop-blur-md" : "px-12 py-7"
    }`}>
      <a href="#hero">
        <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={140} height={48} className="h-10 w-auto" />
      </a>
      <div className="flex items-center gap-10">
        <a href="#services" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors">
          <T es="Servicios" en="Services" />
        </a>
        <a href="#portfolio" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors">
          Portfolio
        </a>
        <a href="#about" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors">
          <T es="Nosotros" en="About" />
        </a>
        <a href="#contact" className="text-[11px] font-medium tracking-[.16em] uppercase text-cream hover:text-cream-dim transition-colors">
          <T es="Contacto" en="Contact" />
        </a>
        <button onClick={toggle} className="text-[11px] font-medium tracking-[.12em] uppercase text-cream-dim hover:text-cream transition-colors cursor-none bg-transparent border-none">
          EN / ES
        </button>
        <a href="mailto:contacto@studioneter.com" className="text-[11px] font-semibold tracking-[.16em] uppercase text-cream border border-cream/40 px-6 py-2.5 rounded-sm hover:bg-brown hover:border-brown transition-colors">
          <T es="Cotizar" en="Get Quote" />
        </a>
      </div>
    </nav>
  );
}
