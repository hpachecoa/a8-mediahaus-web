const items = [
  "Fotografía Inmobiliaria","Video Cinematic","Tours Virtuales 3D",
  "Dron 4K","Planos de Planta","Real Estate Media Haus",
];

export default function Marquee() {
  const all = [...items, ...items];
  return (
    <div className="bg-deep py-4 overflow-hidden border-t border-b border-brown/30">
      <div className="flex whitespace-nowrap marquee-track">
        {all.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-10 px-10">
            <span className="text-[11px] font-medium tracking-[.22em] uppercase text-cream-dim">{item}</span>
            <span className="w-1 h-1 rounded-full bg-brown flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
