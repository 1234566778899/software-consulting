import { site } from "@/content/site";

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lead = {
    name: clean(body?.name, 120),
    email: clean(body?.email, 160),
    phone: clean(body?.phone, 40),
    company: clean(body?.company, 160),
    kind: body?.kind === "project" ? "Tengo un proyecto" : "Soy una empresa",
    consent: body?.consent ? "sí" : "no",
    service: clean(body?.service, 120),
    message: clean(body?.message),
  };

  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.message || !body?.consent) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Envío por correo con Resend si hay API key configurada (RESEND_API_KEY).
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[contact] Nueva solicitud (sin RESEND_API_KEY, no se envió correo):", lead);
    return Response.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "C&J Web <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      reply_to: lead.email,
      subject: `Nueva solicitud: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: Object.entries(lead)
        .map(([k, v]) => `${k}: ${v || "—"}`)
        .join("\n"),
    }),
  });

  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
}
