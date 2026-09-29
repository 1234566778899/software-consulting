import { site } from "@/content/site";

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Número de hoja basado en fecha y hora de Lima.
// Para numeración estrictamente correlativa, reemplazar por un contador en base de datos.
function sheetNumber(now: Date) {
  const lima = new Date(now.getTime() - 5 * 60 * 60 * 1000); // Perú: UTC−5 todo el año
  const p = (n: number, l = 2) => String(n).padStart(l, "0");
  return `LR-${lima.getUTCFullYear()}${p(lima.getUTCMonth() + 1)}${p(lima.getUTCDate())}-${p(lima.getUTCHours())}${p(
    lima.getUTCMinutes(),
  )}${p(lima.getUTCSeconds())}${p(lima.getUTCMilliseconds(), 3)}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const f = {
    names: clean(body?.names, 160),
    docType: clean(body?.docType, 40),
    docNumber: clean(body?.docNumber, 20),
    home: clean(body?.home, 240),
    phone: clean(body?.phone, 40),
    email: clean(body?.email, 160),
    minor: body?.minor ? "Sí" : "No",
    guardianName: clean(body?.guardianName, 160),
    guardianHome: clean(body?.guardianHome, 240),
    guardianPhone: clean(body?.guardianPhone, 40),
    guardianEmail: clean(body?.guardianEmail, 160),
    itemType: clean(body?.itemType, 40),
    amount: clean(body?.amount, 20),
    itemDescription: clean(body?.itemDescription, 1000),
    kind: body?.kind === "queja" ? "Queja" : "Reclamo",
    detail: clean(body?.detail, 4000),
    request: clean(body?.request, 2000),
  };

  // Mínimo exigido por el art. 5 del Reglamento: nombre, DNI, domicilio o correo, fecha y detalle.
  const valid =
    f.names && f.docNumber && f.home && /^\S+@\S+\.\S+$/.test(f.email) && f.detail && f.request && body?.consent;
  if (!valid) return Response.json({ ok: false }, { status: 400 });

  const now = new Date();
  const number = sheetNumber(now);
  const registeredAt = now.toLocaleString("es-PE", { timeZone: "America/Lima", dateStyle: "long", timeStyle: "medium" });

  const provider = [
    `Proveedor: ${site.legal.name || site.name}`,
    `RUC: ${site.legal.ruc || "—"}`,
    `Dirección: ${site.legal.address || site.location}`,
  ].join("\n");
  const text = [
    `HOJA DE RECLAMACIÓN N.° ${number}`,
    `Fecha y hora de registro: ${registeredAt}`,
    "",
    provider,
    "",
    "1. CONSUMIDOR",
    `Nombre: ${f.names}`,
    `Documento: ${f.docType} ${f.docNumber}`,
    `Domicilio: ${f.home}`,
    `Teléfono: ${f.phone || "—"}`,
    `Correo: ${f.email}`,
    `Menor de edad: ${f.minor}`,
    ...(f.minor === "Sí"
      ? [`Padre/madre/representante: ${f.guardianName} · ${f.guardianHome} · ${f.guardianPhone || "—"} · ${f.guardianEmail}`]
      : []),
    "",
    "2. BIEN CONTRATADO",
    `Tipo: ${f.itemType}`,
    `Monto reclamado: ${f.amount ? `S/ ${f.amount}` : "—"}`,
    `Descripción: ${f.itemDescription}`,
    "",
    `3. ${f.kind.toUpperCase()}`,
    `Detalle: ${f.detail}`,
    `Pedido: ${f.request}`,
    "",
    "4. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR: (pendiente)",
    "",
    "La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.",
    "El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles improrrogables.",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Sin proveedor de correo configurado: queda registrado en los logs del servidor.
    console.info(`[libro-reclamaciones]\n${text}`);
    return Response.json({ ok: true, number, registeredAt });
  }

  const send = (to: string, subject: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "C&J Web <onboarding@resend.dev>",
        to,
        reply_to: to === f.email ? process.env.CONTACT_TO ?? site.email : f.email,
        subject,
        text,
      }),
    });

  const [toProvider, toConsumer] = await Promise.all([
    send(process.env.CONTACT_TO ?? site.email, `Libro de Reclamaciones: ${f.kind} ${number}`),
    send(f.email, `Constancia de tu ${f.kind.toLowerCase()} N.° ${number} — ${site.name}`),
  ]);
  const ok = toProvider.ok && toConsumer.ok;
  return Response.json({ ok, number, registeredAt }, { status: ok ? 200 : 502 });
}
