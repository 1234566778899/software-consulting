// Datos de la firma. Reemplazar los valores marcados como PLACEHOLDER.

// Dominio canónico: define NEXT_PUBLIC_SITE_URL (https://cjsoftware.online) en producción.
// En Vercel, si no está definido, se usa el dominio de producción del proyecto.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "C&J Software Consulting",
  shortName: "C&J",
  url: siteUrl,
  email: "carlos.jesus.ordaz.hoyos@gmail.com",
  phone: "+51 904 435 631",
  whatsapp: "51904435631", // sin "+" ni espacios
  location: "Lima, Perú",
  address: { locality: "Lima", region: "Lima", country: "PE" },
  // PLACEHOLDER: URL completa de cada perfil. Vacío = no se muestra ni se declara a buscadores.
  linkedin: "",
  instagram: "",
  // Datos legales del proveedor: obligatorios en la Hoja de Reclamación (art. 5, D.S. 011-2011-PCM)
  // y en la política de privacidad (Ley 29733). PLACEHOLDER hasta tener la empresa constituida.
  legal: {
    name: "", // Razón social o nombre del titular, p. ej. "C&J SOFTWARE CONSULTING S.A.C."
    ruc: "", // 11 dígitos
    address: "", // Domicilio fiscal
    dataBankCode: "", // Código de inscripción del banco de datos ante la ANPD
  },
};

/** Value to show for a legal field that is not configured yet. */
export const legalOr = (value: string, fallback: string) => value || fallback;

export const stack = [
  "AWS",
  "Google Cloud",
  "Microsoft Azure",
  "Next.js",
  "React Native",
  "Flutter",
  "Python",
  "Node.js",
  "PostgreSQL",
  "Kubernetes",
  "Terraform",
  "OpenAI",
  "Anthropic",
];
