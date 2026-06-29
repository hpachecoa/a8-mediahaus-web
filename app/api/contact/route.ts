import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, propertyType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    await resend.emails.send({
      from: "a8 Website <onboarding@resend.dev>",
      to: ["contacto@a8mediahaus.com"],
      replyTo: email,
      subject: `🏠 NUEVO CLIENTE — ${name} | a8 Real Estate Media Haus`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0b08;font-family:Georgia,serif;">

  <!-- Header banner -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background:linear-gradient(135deg,#6C5038 0%,#352A24 100%);padding:32px 40px;text-align:center;">
        <p style="margin:0;color:#C9B8A0;font-size:10px;letter-spacing:6px;text-transform:uppercase;font-family:Arial,sans-serif;">a8 Real Estate Media Haus</p>
        <h1 style="margin:12px 0 0;color:#F0E7D6;font-size:28px;font-weight:300;letter-spacing:-0.5px;">
          🏠 Nuevo Cliente Potencial
        </h1>
      </td>
    </tr>
  </table>

  <!-- Alert strip -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background:#8A6848;padding:12px 40px;text-align:center;">
        <p style="margin:0;color:#F0E7D6;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">
          ⚡ MENSAJE DESDE TU PÁGINA WEB — RESPONDE PRONTO
        </p>
      </td>
    </tr>
  </table>

  <!-- Body -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background:#1E1510;padding:40px;">

        <!-- Client info card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#352A24;border-radius:4px;overflow:hidden;margin-bottom:24px;">
          <tr><td style="padding:24px 28px;border-bottom:1px solid rgba(240,231,214,0.08);">
            <p style="margin:0 0 4px;color:#8A6848;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">Cliente</p>
            <p style="margin:0;color:#F0E7D6;font-size:22px;font-weight:300;">${name}</p>
          </td></tr>
          <tr><td style="padding:20px 28px;border-bottom:1px solid rgba(240,231,214,0.08);">
            <p style="margin:0 0 4px;color:#8A6848;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">Email</p>
            <a href="mailto:${email}" style="color:#C9B8A0;font-size:15px;font-weight:300;text-decoration:none;">${email}</a>
          </td></tr>
          ${phone ? `<tr><td style="padding:20px 28px;border-bottom:1px solid rgba(240,231,214,0.08);">
            <p style="margin:0 0 4px;color:#8A6848;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">Teléfono</p>
            <a href="tel:${phone}" style="color:#C9B8A0;font-size:15px;font-weight:300;text-decoration:none;">${phone}</a>
          </td></tr>` : ""}
          ${propertyType ? `<tr><td style="padding:20px 28px;border-bottom:1px solid rgba(240,231,214,0.08);">
            <p style="margin:0 0 4px;color:#8A6848;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">Tipo de propiedad</p>
            <p style="margin:0;color:#C9B8A0;font-size:15px;font-weight:300;">${propertyType}</p>
          </td></tr>` : ""}
          <tr><td style="padding:20px 28px;">
            <p style="margin:0 0 10px;color:#8A6848;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">Mensaje</p>
            <p style="margin:0;color:#F0E7D6;font-size:15px;font-weight:300;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
          </td></tr>
        </table>

        <!-- CTA buttons -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:8px;" width="50%">
              <a href="mailto:${email}" style="display:block;text-align:center;background:#6C5038;color:#F0E7D6;text-decoration:none;padding:14px;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:3px;">
                Responder por email
              </a>
            </td>
            ${phone ? `<td style="padding-left:8px;" width="50%">
              <a href="tel:${phone}" style="display:block;text-align:center;background:transparent;color:#C9B8A0;text-decoration:none;padding:14px;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:3px;border:1px solid rgba(201,184,160,0.3);">
                Llamar ahora
              </a>
            </td>` : ""}
          </tr>
        </table>

      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background:#0f0b08;padding:24px 40px;text-align:center;border-top:1px solid rgba(240,231,214,0.05);">
        <p style="margin:0;color:rgba(240,231,214,0.2);font-size:10px;letter-spacing:2px;font-family:Arial,sans-serif;">
          Este mensaje fue enviado desde tu página web · a8realestate.com
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al enviar el mensaje." }, { status: 500 });
  }
}
