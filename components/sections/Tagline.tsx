import { T } from "@/lib/i18n";

export default function Tagline() {
  return (
    <div className="bg-brown px-12 py-20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231E1510'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <p className="relative z-10 text-[clamp(28px,4vw,56px)] font-light text-cream text-center leading-[1.2] max-w-4xl tracking-tight">
        <T
          es={<>&ldquo;Las propiedades que se ven <em className="italic text-cream/65">extraordinarias</em> se venden más rápido, a mejor precio.&rdquo;</>}
          en={<>&ldquo;Properties that look <em className="italic text-cream/65">extraordinary</em> sell faster, at a better price.&rdquo;</>}
        />
      </p>
    </div>
  );
}
