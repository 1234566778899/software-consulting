import type { Locale } from "@/i18n";
import { site } from "./site";

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

// Última revisión del texto. Actualizar si cambian los tratamientos de datos.
export const privacyUpdated = "2026-09-29";

const owner = site.legal.name || site.name;
const ruc = site.legal.ruc ? `, con RUC ${site.legal.ruc}` : "";
const rucEn = site.legal.ruc ? `, taxpayer ID (RUC) ${site.legal.ruc}` : "";
const address = site.legal.address ? ` y domicilio en ${site.legal.address}` : ` con sede en ${site.location}`;
const addressEn = site.legal.address ? ` and registered address at ${site.legal.address}` : ` based in ${site.location}`;

export const privacy: Record<Locale, { title: string; intro: string; sections: LegalSection[] }> = {
  es: {
    title: "Política de privacidad",
    intro: `En ${site.name} respetamos tu privacidad. Esta política explica qué datos personales recopilamos a través de este sitio web, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por el Decreto Supremo N.° 016-2024-JUS.`,
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          `El responsable del tratamiento de tus datos es ${owner}${ruc}${address}. Para cualquier consulta sobre esta política o sobre tus datos puedes escribirnos a ${site.email} o llamarnos al ${site.phone}.`,
        ],
      },
      {
        heading: "2. Datos que recopilamos",
        paragraphs: ["Solo recopilamos los datos que tú nos entregas voluntariamente a través de los formularios del sitio:"],
        list: [
          "Formulario de contacto: nombre, correo electrónico, teléfono (opcional), tipo de solicitante y el mensaje que nos envías.",
          "Suscripción al blog: correo electrónico.",
          "Libro de Reclamaciones: los datos exigidos por el Reglamento del Libro de Reclamaciones (nombre, documento de identidad, domicilio, teléfono, correo electrónico, detalle del reclamo o queja y, en caso de menores de edad, los datos de su padre, madre o representante).",
          "Datos técnicos de navegación (dirección IP, tipo de navegador y fecha de acceso) que registra automáticamente nuestro proveedor de alojamiento por motivos de seguridad.",
        ],
      },
      {
        heading: "3. Finalidades del tratamiento",
        paragraphs: ["Usamos tus datos únicamente para:"],
        list: [
          "Responder tus consultas, preparar propuestas y coordinar reuniones sobre nuestros servicios.",
          "Enviarte el boletín del blog, solo si te suscribiste. Puedes darte de baja en cualquier momento.",
          "Registrar, atender y responder los reclamos y quejas presentados en el Libro de Reclamaciones, en cumplimiento del Código de Protección y Defensa del Consumidor (Ley N.° 29571).",
          "Mantener la seguridad y el correcto funcionamiento del sitio.",
        ],
      },
      {
        heading: "4. Base legal",
        paragraphs: [
          "Tratamos tus datos con tu consentimiento libre, previo, expreso e informado, que otorgas al marcar la casilla de aceptación en cada formulario. En el caso del Libro de Reclamaciones, el tratamiento es necesario además para cumplir una obligación legal.",
          "Puedes revocar tu consentimiento en cualquier momento escribiéndonos, sin efectos retroactivos.",
        ],
      },
      {
        heading: "5. Destinatarios y transferencias",
        paragraphs: [
          "No vendemos ni cedemos tus datos a terceros con fines comerciales. Para operar el sitio utilizamos proveedores de alojamiento web y de envío de correo electrónico que actúan como encargados del tratamiento y pueden ubicarse fuera del Perú, lo que constituye un flujo transfronterizo de datos. Estos proveedores solo tratan los datos para prestarnos su servicio y bajo medidas de seguridad adecuadas.",
          "Podremos comunicar tus datos a autoridades competentes, como el INDECOPI, cuando la ley lo exija.",
        ],
      },
      {
        heading: "6. Plazo de conservación",
        paragraphs: [],
        list: [
          "Consultas del formulario de contacto: hasta dos (2) años desde el último contacto, salvo que se inicie una relación contractual.",
          "Suscripción al blog: hasta que te des de baja.",
          "Hojas de reclamación: dos (2) años desde su registro, conforme al artículo 12 del Reglamento del Libro de Reclamaciones.",
        ],
      },
      {
        heading: "7. Tus derechos",
        paragraphs: [
          "Como titular de tus datos puedes ejercer en cualquier momento tus derechos de información, acceso, rectificación, cancelación y oposición (derechos ARCO), así como revocar tu consentimiento.",
          `Para hacerlo, envía un correo a ${site.email} con el asunto «Derechos ARCO», indicando tu nombre, el derecho que deseas ejercer y adjuntando una copia de tu documento de identidad. Atenderemos tu solicitud dentro de los plazos establecidos en el Reglamento de la Ley N.° 29733.`,
          "Si consideras que no hemos atendido adecuadamente tu solicitud, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
        ],
      },
      {
        heading: "8. Seguridad",
        paragraphs: [
          "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra pérdida, acceso no autorizado o alteración, como conexiones cifradas (HTTPS) y acceso restringido a la información.",
        ],
      },
      {
        heading: "9. Cookies",
        paragraphs: [
          "Este sitio no utiliza cookies publicitarias ni de seguimiento de terceros. Solo pueden usarse cookies técnicas estrictamente necesarias para su funcionamiento. Si en el futuro incorporamos herramientas de analítica, actualizaremos esta política y te pediremos tu consentimiento cuando corresponda.",
        ],
      },
      {
        heading: "10. Menores de edad",
        paragraphs: [
          "Nuestros servicios están dirigidos a empresas y personas mayores de edad. No recopilamos intencionalmente datos de menores, salvo los que su padre, madre o representante registren en el Libro de Reclamaciones.",
        ],
      },
      {
        heading: "11. Banco de datos",
        paragraphs: [
          site.legal.dataBankCode
            ? `Los datos se almacenan en el banco de datos de clientes y contactos de ${owner}, inscrito en el Registro Nacional de Protección de Datos Personales con el código ${site.legal.dataBankCode}.`
            : `Los datos se almacenan en el banco de datos de clientes y contactos de ${owner}, que será inscrito en el Registro Nacional de Protección de Datos Personales.`,
        ],
      },
      {
        heading: "12. Cambios en esta política",
        paragraphs: [
          "Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. Publicaremos la versión vigente en esta página con su fecha de actualización.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    intro: `At ${site.name} we respect your privacy. This policy explains which personal data we collect through this website, what we use it for and how you can exercise your rights, in accordance with Peruvian Law No. 29733 on Personal Data Protection and its Regulations approved by Supreme Decree No. 016-2024-JUS.`,
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          `The controller of your data is ${owner}${rucEn}${addressEn}. For any question about this policy or your data, email us at ${site.email} or call ${site.phone}.`,
        ],
      },
      {
        heading: "2. Data we collect",
        paragraphs: ["We only collect the data you voluntarily provide through the site's forms:"],
        list: [
          "Contact form: name, email, phone (optional), type of requester and your message.",
          "Blog subscription: email address.",
          "Complaints Book (Libro de Reclamaciones): the data required by its Regulations (name, ID document, address, phone, email, details of the claim or complaint and, for minors, the data of their parent or representative).",
          "Technical browsing data (IP address, browser type and access date) automatically logged by our hosting provider for security purposes.",
        ],
      },
      {
        heading: "3. Purposes",
        paragraphs: ["We use your data only to:"],
        list: [
          "Answer your inquiries, prepare proposals and schedule meetings about our services.",
          "Send you the blog newsletter, only if you subscribed. You can unsubscribe at any time.",
          "Register, handle and answer claims and complaints filed in the Complaints Book, as required by the Consumer Protection and Defense Code (Law No. 29571).",
          "Keep the site secure and working properly.",
        ],
      },
      {
        heading: "4. Legal basis",
        paragraphs: [
          "We process your data with your free, prior, express and informed consent, given by ticking the acceptance box in each form. For the Complaints Book, processing is also required to comply with a legal obligation.",
          "You may withdraw your consent at any time by writing to us, without retroactive effect.",
        ],
      },
      {
        heading: "5. Recipients and transfers",
        paragraphs: [
          "We do not sell or share your data with third parties for commercial purposes. To run the site we use web hosting and email delivery providers that act as data processors and may be located outside Peru, which constitutes a cross-border data flow. These providers only process data to deliver their service to us, under appropriate security measures.",
          "We may disclose your data to competent authorities, such as INDECOPI, when required by law.",
        ],
      },
      {
        heading: "6. Retention",
        paragraphs: [],
        list: [
          "Contact form inquiries: up to two (2) years from the last contact, unless a contractual relationship begins.",
          "Blog subscription: until you unsubscribe.",
          "Complaint forms: two (2) years from registration, as required by article 12 of the Complaints Book Regulations.",
        ],
      },
      {
        heading: "7. Your rights",
        paragraphs: [
          "As the data subject you may at any time exercise your rights of information, access, rectification, cancellation and objection (ARCO rights), and withdraw your consent.",
          `To do so, email ${site.email} with the subject “ARCO rights”, stating your name and the right you wish to exercise, and attaching a copy of your ID document. We will respond within the deadlines set by the Regulations of Law No. 29733.`,
          "If you believe we have not properly handled your request, you may file a complaint with Peru's National Authority for Personal Data Protection (Ministry of Justice and Human Rights).",
        ],
      },
      {
        heading: "8. Security",
        paragraphs: [
          "We apply reasonable technical and organizational measures to protect your data against loss, unauthorized access or alteration, such as encrypted connections (HTTPS) and restricted access to information.",
        ],
      },
      {
        heading: "9. Cookies",
        paragraphs: [
          "This site does not use advertising or third-party tracking cookies. Only strictly necessary technical cookies may be used. If we add analytics tools in the future, we will update this policy and ask for your consent where required.",
        ],
      },
      {
        heading: "10. Minors",
        paragraphs: [
          "Our services are aimed at companies and adults. We do not knowingly collect data from minors, except data registered by their parent or representative in the Complaints Book.",
        ],
      },
      {
        heading: "11. Data bank",
        paragraphs: [
          site.legal.dataBankCode
            ? `Data is stored in the clients and contacts data bank of ${owner}, registered with Peru's National Registry of Personal Data Protection under code ${site.legal.dataBankCode}.`
            : `Data is stored in the clients and contacts data bank of ${owner}, which will be registered with Peru's National Registry of Personal Data Protection.`,
        ],
      },
      {
        heading: "12. Changes to this policy",
        paragraphs: [
          "We may update this policy to reflect legal changes or changes in our services. The current version will be published on this page with its update date.",
        ],
      },
    ],
  },
};
