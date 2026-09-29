import type { Locale } from "@/i18n";

type L<T = string> = Record<Locale, T>;

export type Member = {
  name: string;
  firstName: string;
  photo: string;
  linkedin: string;
  role: L;
  bio: L;
};

// Retratos: ilustraciones generadas a partir de las fotos de perfil de LinkedIn.
export const team: Member[] = [
  {
    name: "Carlos Jesús Ordaz Hoyos",
    firstName: "Carlos",
    photo: "/team/carlos.jpg",
    linkedin: "https://www.linkedin.com/in/carlos-jes%C3%BAs-ordaz-hoyos-904576284/",
    role: { es: "Cofundador · Desarrollo y UX", en: "Co-founder · Development & UX" },
    bio: {
      es: "Ingeniero de Sistemas de Información por la UPC. Diseña y desarrolla productos web y móviles de principio a fin, con especial cuidado en la experiencia de usuario.",
      en: "Information Systems Engineer from UPC. He designs and builds web and mobile products end to end, with special care for the user experience.",
    },
  },
  {
    name: "Juan Carlos Saravia Inga",
    firstName: "Juan Carlos",
    photo: "/team/juan-carlos.jpg",
    linkedin: "https://www.linkedin.com/in/cjsaravia/",
    role: { es: "Cofundador · Datos y analítica", en: "Co-founder · Data & analytics" },
    bio: {
      es: "Ingeniero de Sistemas de Información por la UPC. Convierte los datos de cada negocio en información clara para tomar mejores decisiones.",
      en: "Information Systems Engineer from UPC. He turns each business's data into clear information for better decisions.",
    },
  },
];
