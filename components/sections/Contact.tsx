"use client";
import { useState } from "react";
import { useReveal } from "@/components/useReveal";
import { T } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const r1 = useReveal(), r2 = useReveal();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", propertyType: "", message: "" });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "bg-transparent border-0 border-b border-dark/20 py-3 text-[15px] font-light text-dark placeholder:text-dark/30 outline-none focus:border-brown transition-colors w-full";

  return (
    <section id="contact" className="bg-cream px-12 py-[120px] grid grid-cols-2 gap-20 items-start">

      {/* Left — info */}
      <div ref={r1} className="reveal">
        <span className="block text-[11px] font-medium tracking-[.16em] uppercase text-brown mb-5">
          06 — <T es="Contacto" en="Contact" />
        </span>
        <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-dark tracking-tight leading-[1.1] mb-8">
          <T
            es={<>Hablemos de<br />tu <em className="italic text-brown">proyecto</em></>}
            en={<>Let&apos;s talk about<br />your <em className="italic text-brown">project</em></>}
          />
        </h2>
        <div className="flex flex-col gap-6 mt-10">
          {[
            { label: "Email",
              value: "contacto@a8mediahaus.com",
              href: "mailto:contacto@a8mediahaus.com" },
            { label: <T es="Teléfono" en="Phone" />,
              value: "(863) 514-9709",
              href: "tel:+18635149709" },
            { label: <T es="Área de servicio" en="Service area" />,
              value: "Orlando & Central Florida",
              href: undefined },
          ].map((row, i) => (
            <div key={i} className="flex gap-5 items-start pb-6 border-b border-dark/10">
              <span className="text-[10px] font-semibold tracking-[.18em] uppercase text-brown min-w-[80px] pt-0.5">{row.label}</span>
              {row.href
                ? <a href={row.href} className="text-[14px] font-light text-dark/70 hover:text-brown transition-colors">{row.value}</a>
                : <span className="text-[14px] font-light text-dark/70">{row.value}</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div ref={r2} className="reveal reveal-d1">
        {status === "success" ? (
          <div className="flex flex-col gap-5 py-16 items-start">
            <span className="text-[10px] font-semibold tracking-[.2em] uppercase text-brown">
              <T es="Mensaje enviado" en="Message sent" />
            </span>
            <h3 className="text-[32px] font-light text-dark leading-tight">
              <T
                es={<>¡Gracias! Te<br />contactamos pronto.</>}
                en={<>Thanks! We&apos;ll<br />be in touch soon.</>}
              />
            </h3>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", propertyType: "", message: "" }); }}
              className="text-[11px] font-semibold tracking-[.16em] uppercase text-brown border-b border-brown/40 pb-0.5 hover:border-brown transition-colors cursor-none mt-4"
            >
              <T es="Enviar otro mensaje →" en="Send another message →" />
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold tracking-[.18em] uppercase text-brown">
                  <T es="Nombre *" en="Name *" />
                </label>
                <input required type="text" placeholder="John Doe" value={form.name} onChange={set("name")} className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold tracking-[.18em] uppercase text-brown">Email *</label>
                <input required type="email" placeholder="john@example.com" value={form.email} onChange={set("email")} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold tracking-[.18em] uppercase text-brown">
                  <T es="Teléfono" en="Phone" />
                </label>
                <input type="tel" placeholder="+1 (000) 000-0000" value={form.phone} onChange={set("phone")} className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold tracking-[.18em] uppercase text-brown">
                  <T es="Tipo de propiedad" en="Property type" />
                </label>
                <select value={form.propertyType} onChange={set("propertyType")} className={inputClass + " cursor-none"}>
                  <option value="">— <T es="Seleccionar" en="Select" /> —</option>
                  <option>Residential</option>
                  <option>Vacation Rental</option>
                  <option>Commercial</option>
                  <option>Land / Lot</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-semibold tracking-[.18em] uppercase text-brown">
                <T es="Mensaje *" en="Message *" />
              </label>
              <textarea
                required rows={4}
                placeholder="Cuéntame sobre tu propiedad..."
                value={form.message}
                onChange={set("message")}
                className={inputClass + " resize-none"}
              />
            </div>

            {status === "error" && (
              <p className="text-[12px] text-red-700">
                <T es="Hubo un error. Intenta de nuevo o escríbenos directamente." en="Something went wrong. Please try again or contact us directly." />
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="self-start bg-dark text-cream text-[11px] font-semibold tracking-[.18em] uppercase px-10 py-4 border border-dark rounded-sm hover:bg-brown hover:border-brown transition-colors cursor-none mt-2 disabled:opacity-50"
            >
              {status === "sending"
                ? <T es="Enviando..." en="Sending..." />
                : <T es="Enviar consulta" en="Send inquiry" />
              }
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
