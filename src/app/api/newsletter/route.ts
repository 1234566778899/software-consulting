import { site } from "@/content/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().slice(0, 160) : "";
  if (!/^\S+@\S+\.\S+$/.test(email) || !body?.consent) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Notifica la suscripción por correo con Resend si hay API key (RESEND_API_KEY).
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[newsletter] Nueva suscripción (sin RESEND_API_KEY):", email);
    return Response.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "C&J Web <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      subject: `Nueva suscripción al blog: ${email}`,
      text: `Correo: ${email}`,
    }),
  });
  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
}
