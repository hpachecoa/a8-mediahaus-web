import Image from "next/image";
import { T } from "@/lib/i18n";

export default function Footer() {
  return (
    <footer className="bg-deep px-12 py-14 flex items-center justify-between border-t border-brown/20">
      <Image src="/logo.png" alt="a8 Real Estate Media Haus" width={120} height={42} className="h-8 w-auto opacity-70" />
      <p className="text-[11px] text-cream/30 text-center leading-relaxed">
        &copy; 2024 a8 Real Estate Media Haus.<br />
        <T es="Todos los derechos reservados." en="All rights reserved." />
      </p>
      <div className="flex gap-7">
        {[
          { href: "#services", es: "Servicios", en: "Services" },
          { href: "#portfolio", es: "Portfolio",  en: "Portfolio" },
          { href: "#contact",  es: "Contacto",   en: "Contact" },
        ].map(l => (
          <a key={l.href} href={l.href} className="text-[11px] font-medium tracking-[.14em] uppercase text-cream/35 hover:text-cream-dim transition-colors">
            <T es={l.es} en={l.en} />
          </a>
        ))}
      </div>
    </footer>
  );
}
