import type { Locale } from "@/i18n";

type L<T = string> = Record<Locale, T>;

export type Section = { heading: string; paragraphs: string[]; list?: string[] };

export type Post = {
  slug: string;
  category: L;
  cover: string;
  date: string; // ISO
  minutes: number;
  author: string;
  title: L;
  excerpt: L;
  body: L<Section[]>;
};

export const posts: Post[] = [
  {
    slug: "diseno-ux-inversion",
    category: { es: "Diseño UX/UI", en: "UX/UI design" },
    cover: "/blog/ux-desk.jpg",
    date: "2026-09-22",
    minutes: 6,
    author: "Equipo C&J",
    title: {
      es: "Por qué el diseño UX es una inversión y no un gasto",
      en: "Why UX design is an investment, not an expense",
    },
    excerpt: {
      es: "Diseñar antes de programar reduce retrabajos, acelera la adopción y convierte mejor. Te contamos cómo medirlo.",
      en: "Designing before coding cuts rework, speeds up adoption and converts better. Here's how to measure it.",
    },
    body: {
      es: [
        {
          heading: "El costo real de corregir tarde",
          paragraphs: [
            "Cada decisión de producto que se toma sin validar con usuarios termina pagándose dos veces: una al construirla y otra al corregirla. Un cambio que en un prototipo toma una hora puede tomar semanas cuando ya está programado, probado y en producción.",
            "Por eso en C&J empezamos por entender el problema, dibujar los flujos y probarlos con personas reales antes de escribir código.",
          ],
        },
        {
          heading: "Qué gana tu negocio con un buen UX",
          paragraphs: ["Un producto claro no solo se ve mejor: trabaja mejor para tu negocio."],
          list: [
            "Menos tickets de soporte, porque las pantallas se explican solas.",
            "Mayor conversión en formularios, registros y compras.",
            "Adopción más rápida de herramientas internas por parte de tu equipo.",
            "Menos funcionalidades que nadie usa.",
          ],
        },
        {
          heading: "Cómo medirlo",
          paragraphs: [
            "Define dos o tres métricas antes de empezar: tiempo para completar una tarea, tasa de error, tasa de conversión o satisfacción. Mídelas en el sistema actual y vuelve a medirlas después del rediseño. La diferencia es el retorno de tu inversión en diseño.",
          ],
        },
        {
          heading: "Empieza pequeño",
          paragraphs: [
            "No necesitas rediseñar todo. Elige el flujo que más dinero mueve o el que más quejas genera, y empieza por ahí. Los resultados de ese primer flujo suelen justificar el resto del trabajo.",
          ],
        },
      ],
      en: [
        {
          heading: "The real cost of fixing things late",
          paragraphs: [
            "Every product decision made without validating it with users ends up being paid for twice: once to build it and once to fix it. A change that takes an hour in a prototype can take weeks once it's coded, tested and in production.",
            "That's why at C&J we start by understanding the problem, sketching the flows and testing them with real people before writing any code.",
          ],
        },
        {
          heading: "What your business gains from good UX",
          paragraphs: ["A clear product doesn't just look better — it works better for your business."],
          list: [
            "Fewer support tickets, because screens explain themselves.",
            "Higher conversion on forms, sign-ups and purchases.",
            "Faster adoption of internal tools by your team.",
            "Fewer features nobody uses.",
          ],
        },
        {
          heading: "How to measure it",
          paragraphs: [
            "Pick two or three metrics before you start: time to complete a task, error rate, conversion rate or satisfaction. Measure them in the current system and again after the redesign. The difference is the return on your design investment.",
          ],
        },
        {
          heading: "Start small",
          paragraphs: [
            "You don't need to redesign everything. Choose the flow that moves the most money or generates the most complaints, and start there. The results of that first flow usually justify the rest of the work.",
          ],
        },
      ],
    },
  },
  {
    slug: "app-nativa-o-multiplataforma",
    category: { es: "Apps móviles", en: "Mobile apps" },
    cover: "/blog/phones.jpg",
    date: "2026-09-15",
    minutes: 7,
    author: "Equipo C&J",
    title: {
      es: "App nativa o multiplataforma: cómo elegir sin arrepentirte",
      en: "Native or cross-platform: how to choose without regrets",
    },
    excerpt: {
      es: "React Native, Flutter o Swift y Kotlin. Una guía práctica para decidir según tu presupuesto, tu equipo y tu producto.",
      en: "React Native, Flutter or Swift and Kotlin. A practical guide to decide based on your budget, team and product.",
    },
    body: {
      es: [
        {
          heading: "La pregunta correcta",
          paragraphs: [
            "No se trata de qué tecnología es mejor en abstracto, sino de cuál se ajusta a tu producto. Una app de reservas no tiene las mismas necesidades que una app de edición de video.",
          ],
        },
        {
          heading: "Cuándo conviene multiplataforma",
          paragraphs: ["React Native y Flutter permiten compartir la mayor parte del código entre iOS y Android."],
          list: [
            "Necesitas lanzar en ambas plataformas con un solo equipo.",
            "Tu app es principalmente formularios, listas, pagos y contenido.",
            "Quieres iterar rápido y validar el producto en el mercado.",
          ],
        },
        {
          heading: "Cuándo conviene nativo",
          paragraphs: ["Swift y Kotlin siguen siendo la mejor opción en algunos casos."],
          list: [
            "Uso intensivo de cámara, audio, sensores o gráficos en tiempo real.",
            "Widgets, integraciones profundas con el sistema o funciones recién lanzadas.",
            "Equipos grandes y dedicados a cada plataforma.",
          ],
        },
        {
          heading: "Nuestra recomendación",
          paragraphs: [
            "Para la mayoría de empresas, empezar con multiplataforma y un diseño cuidado es la forma más rápida de llegar al mercado. Si más adelante una función lo exige, se puede escribir esa parte en nativo sin rehacer toda la app.",
          ],
        },
      ],
      en: [
        {
          heading: "The right question",
          paragraphs: [
            "It isn't about which technology is better in the abstract, but which one fits your product. A booking app doesn't have the same needs as a video-editing app.",
          ],
        },
        {
          heading: "When cross-platform makes sense",
          paragraphs: ["React Native and Flutter let you share most of the code between iOS and Android."],
          list: [
            "You need to launch on both platforms with a single team.",
            "Your app is mostly forms, lists, payments and content.",
            "You want to iterate fast and validate the product in the market.",
          ],
        },
        {
          heading: "When native makes sense",
          paragraphs: ["Swift and Kotlin are still the best option in some cases."],
          list: [
            "Heavy use of camera, audio, sensors or real-time graphics.",
            "Widgets, deep system integrations or newly released features.",
            "Large teams dedicated to each platform.",
          ],
        },
        {
          heading: "Our recommendation",
          paragraphs: [
            "For most companies, starting cross-platform with a carefully crafted design is the fastest way to market. If a feature later requires it, that part can be written natively without rebuilding the whole app.",
          ],
        },
      ],
    },
  },
  {
    slug: "sistemas-de-diseno",
    category: { es: "Diseño UX/UI", en: "UX/UI design" },
    cover: "/blog/design-system.jpg",
    date: "2026-09-08",
    minutes: 5,
    author: "Equipo C&J",
    title: {
      es: "Design systems: la base para que tu producto crezca ordenado",
      en: "Design systems: the foundation for a product that grows in order",
    },
    excerpt: {
      es: "Colores, tipografías y componentes reutilizables que mantienen tu producto coherente mientras crece tu equipo.",
      en: "Reusable colors, typography and components that keep your product coherent as your team grows.",
    },
    body: {
      es: [
        {
          heading: "Qué es un sistema de diseño",
          paragraphs: [
            "Es el conjunto de reglas y piezas reutilizables con las que se construye un producto: colores, tipografías, espaciados, íconos y componentes como botones, formularios o tablas, documentados y disponibles tanto en diseño como en código.",
          ],
        },
        {
          heading: "Síntomas de que lo necesitas",
          paragraphs: ["Si reconoces alguno de estos, es momento de ordenar la casa."],
          list: [
            "Hay cinco tonos distintos del mismo color en la app.",
            "Cada pantalla nueva se diseña desde cero.",
            "Diseño y desarrollo discuten sobre cómo debería verse un botón.",
          ],
        },
        {
          heading: "Cómo empezar",
          paragraphs: [
            "Haz un inventario de lo que ya existe, elige una versión de cada componente y documéntala. Empieza por lo básico —color, tipografía, botones e inputs— y crece a partir de lo que tu producto usa de verdad.",
          ],
        },
      ],
      en: [
        {
          heading: "What a design system is",
          paragraphs: [
            "It's the set of rules and reusable pieces a product is built with: colors, typography, spacing, icons and components like buttons, forms or tables — documented and available in both design and code.",
          ],
        },
        {
          heading: "Signs you need one",
          paragraphs: ["If you recognize any of these, it's time to put things in order."],
          list: [
            "There are five different shades of the same color in the app.",
            "Every new screen is designed from scratch.",
            "Design and development argue about how a button should look.",
          ],
        },
        {
          heading: "How to start",
          paragraphs: [
            "Take inventory of what already exists, choose one version of each component and document it. Start with the basics — color, typography, buttons and inputs — and grow from what your product actually uses.",
          ],
        },
      ],
    },
  },
  {
    slug: "ia-casos-de-uso",
    category: { es: "Inteligencia artificial", en: "Artificial intelligence" },
    cover: "/blog/ai-team.jpg",
    date: "2026-08-28",
    minutes: 6,
    author: "Equipo C&J",
    title: {
      es: "IA en tu empresa: 5 casos de uso que sí generan retorno",
      en: "AI in your company: 5 use cases that actually pay off",
    },
    excerpt: {
      es: "Más allá del chatbot: dónde la inteligencia artificial ahorra horas reales a los equipos de operaciones, ventas y soporte.",
      en: "Beyond the chatbot: where artificial intelligence saves real hours for operations, sales and support teams.",
    },
    body: {
      es: [
        {
          heading: "Empieza por el proceso, no por la tecnología",
          paragraphs: [
            "Los proyectos de IA que funcionan resuelven una tarea repetitiva, frecuente y medible. Antes de elegir un modelo, identifica dónde tu equipo pierde más horas.",
          ],
        },
        {
          heading: "Cinco casos que vemos funcionar",
          paragraphs: [],
          list: [
            "Asistentes que responden preguntas sobre tus documentos internos, con citas a la fuente.",
            "Clasificación y enrutamiento automático de correos y tickets.",
            "Extracción de datos de facturas, contratos y formularios.",
            "Borradores de respuestas para ventas y soporte, revisados por una persona.",
            "Resúmenes de reuniones y reportes semanales.",
          ],
        },
        {
          heading: "La interfaz importa",
          paragraphs: [
            "Una IA útil pero difícil de usar no se adopta. Diseñamos estas herramientas para que cualquier persona del equipo entienda qué hace el sistema, de dónde saca la información y cómo corregirlo.",
          ],
        },
      ],
      en: [
        {
          heading: "Start with the process, not the technology",
          paragraphs: [
            "AI projects that work solve a task that is repetitive, frequent and measurable. Before choosing a model, find where your team loses the most hours.",
          ],
        },
        {
          heading: "Five cases we see working",
          paragraphs: [],
          list: [
            "Assistants that answer questions about your internal documents, citing the source.",
            "Automatic classification and routing of emails and tickets.",
            "Data extraction from invoices, contracts and forms.",
            "Draft replies for sales and support, reviewed by a person.",
            "Meeting summaries and weekly reports.",
          ],
        },
        {
          heading: "The interface matters",
          paragraphs: [
            "Useful AI that's hard to use doesn't get adopted. We design these tools so anyone on the team understands what the system does, where it gets its information and how to correct it.",
          ],
        },
      ],
    },
  },
  {
    slug: "costo-software-a-medida",
    category: { es: "Desarrollo", en: "Development" },
    cover: "/blog/dev-desk.jpg",
    date: "2026-08-18",
    minutes: 8,
    author: "Equipo C&J",
    title: {
      es: "¿Cuánto cuesta desarrollar software a medida? Los factores que definen el precio",
      en: "How much does custom software cost? The factors that set the price",
    },
    excerpt: {
      es: "Alcance, integraciones, diseño y mantenimiento: entiende qué mueve el presupuesto para planificar con claridad.",
      en: "Scope, integrations, design and maintenance: understand what drives the budget so you can plan clearly.",
    },
    body: {
      es: [
        {
          heading: "No hay un precio único",
          paragraphs: [
            "Preguntar cuánto cuesta un software es como preguntar cuánto cuesta una casa. Depende de cuántos ambientes tiene, de los acabados y del terreno. Lo que sí podemos hacer es explicar qué variables mueven el presupuesto.",
          ],
        },
        {
          heading: "Los factores principales",
          paragraphs: [],
          list: [
            "Alcance: número de pantallas, roles de usuario y flujos.",
            "Integraciones: pagos, facturación electrónica, ERPs o APIs de terceros.",
            "Plataformas: web, iOS, Android o todas.",
            "Nivel de diseño: desde una interfaz funcional hasta una experiencia de marca completa.",
            "Seguridad y cumplimiento: datos sensibles, auditorías, permisos.",
          ],
        },
        {
          heading: "Cómo controlar el presupuesto",
          paragraphs: [
            "Trabajamos por fases con precio cerrado: primero un diagnóstico que define alcance y arquitectura, luego entregas en sprints con demo. Así sabes qué recibes en cada etapa y puedes decidir si continuar, ajustar o priorizar.",
          ],
        },
      ],
      en: [
        {
          heading: "There's no single price",
          paragraphs: [
            "Asking how much software costs is like asking how much a house costs. It depends on the number of rooms, the finishes and the land. What we can do is explain which variables move the budget.",
          ],
        },
        {
          heading: "The main factors",
          paragraphs: [],
          list: [
            "Scope: number of screens, user roles and flows.",
            "Integrations: payments, e-invoicing, ERPs or third-party APIs.",
            "Platforms: web, iOS, Android or all of them.",
            "Design level: from a functional interface to a full brand experience.",
            "Security and compliance: sensitive data, audits, permissions.",
          ],
        },
        {
          heading: "How to keep the budget under control",
          paragraphs: [
            "We work in fixed-price phases: first a discovery that defines scope and architecture, then sprint deliveries with a demo. You know what you get at each stage and can decide whether to continue, adjust or reprioritize.",
          ],
        },
      ],
    },
  },
  {
    slug: "accesibilidad-web-checklist",
    category: { es: "Usabilidad", en: "Usability" },
    cover: "/blog/accessibility.jpg",
    date: "2026-08-05",
    minutes: 5,
    author: "Equipo C&J",
    title: {
      es: "Checklist de accesibilidad para tu próximo lanzamiento",
      en: "An accessibility checklist for your next launch",
    },
    excerpt: {
      es: "Contraste, teclado, textos alternativos y formularios claros: lo mínimo para que tu producto funcione para todos.",
      en: "Contrast, keyboard, alt text and clear forms: the minimum for your product to work for everyone.",
    },
    body: {
      es: [
        {
          heading: "Accesible es mejor para todos",
          paragraphs: [
            "Un producto accesible funciona para personas con discapacidad, pero también para quien usa el celular bajo el sol, con una mano o con conexión lenta. Además, mejora el posicionamiento en buscadores.",
          ],
        },
        {
          heading: "La lista mínima",
          paragraphs: [],
          list: [
            "Contraste suficiente entre texto y fondo.",
            "Todo se puede usar con teclado y el foco siempre es visible.",
            "Imágenes con texto alternativo descriptivo.",
            "Formularios con etiquetas visibles y mensajes de error claros.",
            "Animaciones que respetan la preferencia de movimiento reducido.",
          ],
        },
        {
          heading: "Pruébalo con personas",
          paragraphs: [
            "Las herramientas automáticas detectan una parte de los problemas. El resto aparece cuando una persona real intenta completar una tarea. Inclúyelo en tus pruebas de usabilidad desde el principio.",
          ],
        },
      ],
      en: [
        {
          heading: "Accessible is better for everyone",
          paragraphs: [
            "An accessible product works for people with disabilities, but also for someone using their phone in the sun, with one hand or on a slow connection. It also improves search rankings.",
          ],
        },
        {
          heading: "The minimum list",
          paragraphs: [],
          list: [
            "Enough contrast between text and background.",
            "Everything works with a keyboard and focus is always visible.",
            "Images have descriptive alt text.",
            "Forms have visible labels and clear error messages.",
            "Animations respect the reduced-motion preference.",
          ],
        },
        {
          heading: "Test it with people",
          paragraphs: [
            "Automated tools catch part of the problems. The rest shows up when a real person tries to complete a task. Include it in your usability tests from the start.",
          ],
        },
      ],
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function formatDate(iso: string, lang: Locale) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(lang === "es" ? "es-PE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
