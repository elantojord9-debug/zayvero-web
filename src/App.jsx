import { useEffect, useState } from "react";
import "./App.css";
// =====================================================
// API_BASE: en producción usa el mismo servidor (rutas relativas);
// en tu PC usa Express en el puerto 3001.
// =====================================================
const API_BASE =
  import.meta.env.VITE_API_URL ??
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:3001"
    : "");


// =====================================================
// ICONO SVG
// =====================================================
const Icono = ({ children, color = "currentColor" }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

// =====================================================
// TRADUCCIONES
// =====================================================
const translations = {
  es: {
    lang: "ES",
    language: "Idioma",
    nav: {
      services: "Servicios",
      sectors: "Sectores",
      process: "Cómo funciona",
      pricing: "Precios",
      panel: "Panel",
      faq: "Preguntas",
      contact: "Contacto",
      cta: "Hablar con ZAYVERO",
    },
    hero: {
      eyebrow: "IA · AUTOMATIZACIÓN · TECNOLOGÍA",
      title1: "Tu negocio puede trabajar",
      title2: "de forma más inteligente.",
      text:
        "ZAYVERO crea sistemas con Inteligencia Artificial que ayudan a las empresas a responder clientes, organizar oportunidades, gestionar citas y automatizar procesos.",
      primary: "Descubre qué puedes automatizar →",
      secondary: "Explorar soluciones",
      note: "Diseñamos la tecnología alrededor de tu negocio.",
      videoFallback: "Tu navegador no puede reproducir este video.",
    },
    trust: [
      "Inteligencia Artificial",
      "Automatización",
      "WhatsApp",
      "CRM",
      "Procesos digitales",
    ],
    problem: {
      label: "EL PROBLEMA",
      title:
        "Las oportunidades pueden perderse mientras tu equipo está ocupado haciendo otras cosas.",
      description:
        "Respuestas tardías, información dispersa y tareas repetitivas pueden hacer que un negocio dependa demasiado del trabajo manual.",
      cards: [
        {
          icon: "⏱️",
          title: "Respuestas tardías",
          text:
            "Un cliente pregunta, pero nadie está disponible para responder.",
        },
        {
          icon: "🎯",
          title: "Leads sin seguimiento",
          text:
            "Personas interesadas quedan sin una próxima acción definida.",
        },
        {
          icon: "🔁",
          title: "Trabajo repetitivo",
          text:
            "El equipo dedica tiempo a tareas que pueden convertirse en procesos automáticos.",
        },
      ],
    },
    process: {
      label: "CÓMO FUNCIONA",
      title:
        "Conectamos cada paso de la conversación con tu negocio.",
      description:
        "Una automatización puede comenzar con un mensaje y terminar con una oportunidad organizada para tu equipo.",
      steps: [
        ["01", "Cliente", "Escribe por WhatsApp o web."],
        ["02", "IA", "Comprende y responde."],
        ["03", "Datos", "La información queda registrada."],
      ],
    },
    services: {
      label: "SOLUCIONES",
      title: "Sistemas que trabajan detrás de tu negocio.",
      description:
        "Desde atención al cliente hasta seguimiento comercial, diseñamos automatizaciones según el proceso que quieras mejorar.",
      items: [
        [
          "Recepcionista IA",
          "Atiende consultas, responde preguntas frecuentes y ayuda a gestionar solicitudes incluso fuera del horario laboral.",
        ],
        [
          "WhatsApp con IA",
          "Responde automáticamente, entiende lo que necesita cada cliente y captura sus datos.",
        ],
        [
          "Citas automáticas",
          "Permite que tus clientes soliciten y coordinen citas sin depender de una persona disponible.",
        ],
        [
          "Recuperación de leads",
          "Da seguimiento a personas que mostraron interés pero dejaron de responder.",
        ],
        [
          "CRM inteligente",
          "Centraliza tus prospectos y ayuda a tu equipo a saber quién necesita atención.",
        ],
        [
          "Automatización empresarial",
          "Conectamos formularios, WhatsApp, CRM, IA y otras herramientas en un mismo flujo.",
        ],
        [
          "Creación de páginas web",
          "Diseñamos páginas web modernas y rápidas que presentan tu negocio y convierten visitas en clientes.",
        ],
      ],
    },
    pricing: {
      label: "PRECIOS",
      title: "Planes para cada etapa de tu negocio.",
      description:
        "Precios en dólares americanos, iguales para todos los países. Instalación única + mensualidad, sin sorpresas.",
      plans: [
        {
          name: "Esencial",
          description: "Para empezar a automatizar la atención de tu negocio.",
          price: "$297",
          monthly: "instalación única + $49/mes",
          features: [
            "WhatsApp con IA",
            "Responde solo, 24/7",
            "Captura datos de clientes",
            "Atiende fuera de horario",
          ],
          button: "Elegir Esencial",
        },
        {
          name: "Profesional",
          description: "Para negocios que quieren vender en automático.",
          price: "$597",
          monthly: "instalación única + $97/mes",
          features: [
            "Todo lo del plan Esencial",
            "Citas automáticas",
            "CRM inteligente",
            "Recuperación de leads",
            "Seguimiento programado",
          ],
          button: "Elegir Profesional",
          popular: "MÁS POPULAR",
        },
        {
          name: "Empresarial",
          description: "Automatización completa para tu operación.",
          price: "$1,197",
          monthly: "instalación única + $197/mes",
          features: [
            "Todo lo del plan Profesional",
            "Recepcionista IA",
            "Automatizaciones a medida",
            "Integración con tus herramientas",
            "Soporte prioritario",
          ],
          button: "Elegir Empresarial",
        },
      ],
      web: {
        title: "¿Necesitas página web?",
        text: "Creación de página web profesional para tu negocio —",
        price: "desde $497",
        suffix: "pago único.",
        button: "Cotizar mi web",
      },
      footnote:
        "Precios de lanzamiento. Cada negocio es diferente: escríbenos y diseñamos el alcance exacto para el tuyo.",
    },
    sectors: {
      label: "PARA QUIÉN",
      title: "Automatización para diferentes tipos de negocios.",
      description:
        "No utilizamos una solución idéntica para todos. Primero entendemos cómo funciona el negocio y luego diseñamos el sistema.",
      items: [
        ["🏥", "Clínicas", "Pacientes, citas y seguimiento."],
        ["🍽️", "Restaurantes", "Reservas, consultas y atención."],
        ["🏠", "Inmobiliarias", "Captación y clasificación de prospectos."],
        ["💈", "Barberías y salones", "Agendamiento y recordatorios."],
        ["🔧", "Talleres", "Solicitudes, cotizaciones y seguimiento."],
        ["🛒", "Tiendas", "Consultas, clientes y ventas."],
      ],
    },
    caseStudy: {
      label: "EJEMPLO",
      title: "Así puede verse una automatización en una clínica.",
      description:
        "Este es un ejemplo conceptual de cómo una conversación puede convertirse en un proceso organizado.",
      tag: "CASO DE USO",
      title2: "Recepción de pacientes",
      text:
        "En lugar de depender exclusivamente de una persona para responder cada mensaje, una automatización puede recopilar la información inicial y enviarla al sistema correspondiente.",
      button: "Quiero algo así →",
      steps: [
        ["💬", "El paciente escribe", "“Quiero una cita para mañana.”"],
        ["🤖", "La IA conversa", "Recopila la información necesaria."],
        [
          "📊",
          "El lead queda registrado",
          "Nombre, teléfono, servicio e interés.",
        ],
        [
          "🎯",
          "El equipo recibe contexto",
          "La oportunidad queda lista para continuar.",
        ],
      ],
    },
    beforeAfter: {
      label: "EL CAMBIO",
      title: "De procesos manuales a flujos conectados.",
      before: "Antes",
      after: "Con automatización",
      beforeItems: [
        "Mensajes esperando respuesta.",
        "Información repartida entre diferentes herramientas.",
        "Seguimientos manuales.",
        "Tareas repetitivas.",
      ],
      afterItems: [
        "Respuestas automáticas cuando corresponde.",
        "Información organizada.",
        "Seguimientos programados.",
        "Procesos conectados.",
      ],
    },
    method: {
      label: "MÉTODO ZAYVERO",
      title: "Primero entendemos. Después automatizamos.",
      items: [
        [
          "01 — ANALIZAMOS",
          "Entendemos tu proceso",
          "Identificamos tareas repetitivas, puntos de fricción y oportunidades de automatización.",
        ],
        [
          "02 — DISEÑAMOS",
          "Creamos el flujo",
          "Diseñamos una solución basada en cómo realmente funciona tu empresa.",
        ],
        [
          "03 — CONECTAMOS",
          "Integramos herramientas",
          "Conectamos IA, WhatsApp, CRM, formularios y otros sistemas para crear un proceso completo.",
        ],
        [
          "04 — ACOMPAÑAMOS",
          "Damos seguimiento",
          "Monitoreamos el sistema, ajustamos lo necesario y te acompañamos mientras tu negocio crece.",
        ],
      ],
    },
    difference: {
      label: "ZAYVERO",
      title:
        "No se trata de añadir más tecnología. Se trata de hacer que la tecnología trabaje para tu negocio.",
      text:
        "Construimos automatizaciones con un objetivo claro: ayudarte a gestionar mejor las conversaciones, oportunidades y procesos que forman parte de tu operación.",
      pills: ["🤖 IA", "💬 WhatsApp", "📊 CRM", "📅 Citas", "🎯 Leads", "⚙️ Automatización"],
    },
    panel: {
      label: "PANEL COMERCIAL",
      title: "Tu CRM, resumido en un solo lugar.",
      description:
        "Datos actualizados directamente desde el sistema comercial de ZAYVERO.",
      refresh: "↻ Actualizar datos",
      updating: "Actualizando...",
      error:
        "No se pudo conectar con el Panel Comercial. Verifica que el servidor esté funcionando.",
      loading: "Cargando información comercial...",
      lastReview: "Última revisión:",
      status: "Estado:",
      connected: "● Conectado",
      metrics: [
        "Total de leads",
        "Leads activos",
        "Nuevos",
        "Por contactar",
        "En seguimiento",
        "Prioridad alta",
        "Quieren contratar",
        "Oportunidades",
      ],
      summary: "RESUMEN COMERCIAL",
      noSummary: "No hay resumen disponible.",
      attention: "ATENCIÓN",
      noAttention: "✓ No hay leads pendientes de atención.",
      crm: "LEADS DEL CRM",
      crmTitle: "Prospectos recibidos y analizados por ZAYVERO.",
      crmText:
        "Aquí puedes revisar la información comercial de cada prospecto directamente desde el CRM.",
      noLeads: "No hay leads registrados",
      noLeadsText:
        "Los nuevos prospectos que lleguen desde el formulario aparecerán aquí automáticamente.",
      changeStatus: "CAMBIAR ESTADO",
      saving: "Guardando...",
      serviceInterest: "SERVICIO DE INTERÉS",
      intention: "INTENCIÓN",
      need: "NECESIDAD",
      contact: "CONTACTO",
      whatsapp: "WhatsApp:",
      email: "Email:",
      entry: "Entrada:",
      followup: "Seguimiento:",
      responsible: "Responsable:",
      summaryLabel: "RESUMEN",
      opportunity: "🎯 OPORTUNIDAD",
      nextAction: "⚡ PRÓXIMA ACCIÓN",
      commercialActions: "ACCIONES COMERCIALES",
      contactWhatsapp: "WhatsApp",
      copyMessage: "Copiar mensaje",
      copied: "Copiado",
      commercialMessage: "Ver mensaje comercial",
      originalMessage: "Ver mensaje original",
      noPriority: "SIN PRIORIDAD",
      noStatus: "SIN ESTADO",
      noPhone: "Este lead no tiene un número de WhatsApp registrado.",
      invalidPhone: "El número de WhatsApp de este lead no es válido.",
      noCommercialMessage:
        "Este lead no tiene un mensaje comercial generado.",
      copyError:
        "No se pudo copiar automáticamente. Puedes seleccionar y copiar el mensaje manualmente.",
      noId: "Este lead no tiene ID registrado.",
      statusError:
        "No se pudo guardar el cambio de estado. Inténtalo de nuevo.",
      states: [
        "Nuevo",
        "Contactado",
        "En seguimiento",
        "Demo agendada",
        "Cliente ganado",
        "Cliente perdido",
      ],
    },
    faq: {
      label: "PREGUNTAS FRECUENTES",
      title: "Lo que necesitas saber antes de empezar.",
      items: [
        [
          "¿Tengo que cambiar las herramientas que ya utiliza mi negocio?",
          "No necesariamente. Primero revisamos tus procesos y las herramientas actuales para determinar qué se puede conectar y qué conviene ajustar.",
        ],
        [
          "¿La automatización puede atender fuera del horario laboral?",
          "Según el sistema diseñado, puede responder consultas frecuentes y recopilar solicitudes fuera del horario. Los casos que requieran intervención humana pueden derivarse al equipo.",
        ],
        [
          "¿La solución se adapta a mi tipo de negocio?",
          "Sí. El alcance se define a partir de tus clientes, tareas, canales de atención y herramientas existentes.",
        ],
        [
          "¿Cómo comenzamos?",
          "Cuéntanos qué proceso deseas mejorar. Revisaremos tu necesidad y conversaremos sobre un alcance inicial y los próximos pasos.",
        ],
      ],
    },
    cta: {
      label: "EMPECEMOS",
      title: "¿Qué parte de tu negocio estás haciendo manualmente?",
      text:
        "Cuéntanos cómo funciona actualmente tu negocio y descubramos qué procesos pueden convertirse en automatizaciones.",
      button: "Escríbenos por WhatsApp →",
    },
    contact: {
      label: "CONTACTO",
      title: "Construyamos una solución para tu negocio.",
      description:
        "Déjanos tus datos y cuéntanos qué quieres mejorar. La solicitud llegará directamente a nuestro sistema para darle seguimiento.",
      points: [
        "Inteligencia Artificial",
        "WhatsApp y atención al cliente",
        "CRM y seguimiento",
        "Automatización empresarial",
      ],
      whatsapp: "Escríbenos por WhatsApp",
      received: "¡Solicitud recibida!",
      sendAnother: "Enviar otra solicitud",
      retry: "Intentar nuevamente",
      name: "Nombre *",
      namePlaceholder: "Tu nombre",
      company: "Empresa *",
      companyPlaceholder: "Nombre de tu negocio",
      phone: "WhatsApp *",
      phonePlaceholder: "849 650 5777",
      email: "Email *",
      emailPlaceholder: "correo@empresa.com",
      service: "¿Qué quieres automatizar? *",
      select: "Selecciona una opción",
      message: "Cuéntanos qué quieres mejorar *",
      messagePlaceholder:
        "Ejemplo: recibimos muchos mensajes por WhatsApp y tardamos en responder...",
      sending: "Enviando...",
      submit: "Enviar solicitud →",
      privacy:
        "Usaremos tus datos únicamente para contactarte sobre tu solicitud.",
      privacyLink: "Ver política de privacidad",
      successFallback:
        "Hemos recibido tu solicitud y te contactaremos próximamente.",
      error:
        "No hemos podido registrar tu solicitud. Inténtalo nuevamente más tarde.",
      services: [
        "Recepcionista IA",
        "WhatsApp con IA",
        "Citas automáticas",
        "Recuperación de leads",
        "CRM inteligente",
        "Automatización empresarial",
        "Creación de páginas web",
        "No estoy seguro",
      ],
    },
    privacy: {
      label: "PRIVACIDAD",
      title: "Tu información se utiliza para atender tu solicitud.",
      text:
        "ZAYVERO SOLUTIONS utiliza los datos enviados en este formulario para responder a tu consulta, evaluar la necesidad de automatización y dar seguimiento a la conversación.",
    },
    footer: {
      small: "IA · Automatización · Tecnología",
      copyright: "© 2026 ZAYVERO SOLUTIONS. Todos los derechos reservados.",
    },
    whatsappAria: "Escríbenos por WhatsApp",
  },

  en: {
    lang: "EN",
    language: "Language",
    nav: {
      services: "Services",
      sectors: "Industries",
      process: "How it works",
      pricing: "Pricing",
      panel: "Dashboard",
      faq: "FAQ",
      contact: "Contact",
      cta: "Talk to ZAYVERO",
    },
    hero: {
      eyebrow: "AI · AUTOMATION · TECHNOLOGY",
      title1: "Your business can work",
      title2: "smarter.",
      text:
        "ZAYVERO builds Artificial Intelligence systems that help businesses respond to customers, organize opportunities, manage appointments and automate processes.",
      primary: "Discover what you can automate →",
      secondary: "Explore solutions",
      note: "We design technology around your business.",
      videoFallback: "Your browser cannot play this video.",
    },
    trust: [
      "Artificial Intelligence",
      "Automation",
      "WhatsApp",
      "CRM",
      "Digital processes",
    ],
    problem: {
      label: "THE PROBLEM",
      title:
        "Opportunities can be lost while your team is busy doing other things.",
      description:
        "Slow responses, scattered information and repetitive tasks can make a business depend too much on manual work.",
      cards: [
        {
          icon: "⏱️",
          title: "Slow responses",
          text:
            "A customer asks a question, but nobody is available to respond.",
        },
        {
          icon: "🎯",
          title: "Leads without follow-up",
          text:
            "Interested people are left without a defined next action.",
        },
        {
          icon: "🔁",
          title: "Repetitive work",
          text:
            "Your team spends time on tasks that can become automated processes.",
        },
      ],
    },
    process: {
      label: "HOW IT WORKS",
      title:
        "We connect every step of the conversation with your business.",
      description:
        "An automation can start with a message and end with an organized opportunity for your team.",
      steps: [
        ["01", "Customer", "Writes through WhatsApp or web."],
        ["02", "AI", "Understands and responds."],
        ["03", "Data", "Information is recorded."],
      ],
    },
    services: {
      label: "SOLUTIONS",
      title: "Systems working behind your business.",
      description:
        "From customer service to sales follow-up, we design automations around the process you want to improve.",
      items: [
        [
          "AI Receptionist",
          "Answers questions, handles FAQs and helps manage requests even outside business hours.",
        ],
        [
          "AI-powered WhatsApp",
          "Responds automatically, understands customer needs and captures their information.",
        ],
        [
          "Automated appointments",
          "Allows customers to request and coordinate appointments without depending on an available employee.",
        ],
        [
          "Lead recovery",
          "Follows up with people who showed interest but stopped responding.",
        ],
        [
          "Smart CRM",
          "Centralizes prospects and helps your team know who needs attention.",
        ],
        [
          "Business automation",
          "Connects forms, WhatsApp, CRM, AI and other tools in one workflow.",
        ],
        [
          "Website development",
          "We design modern, fast websites that present your business and turn visitors into customers.",
        ],
      ],
    },
    pricing: {
      label: "PRICING",
      title: "Plans for every stage of your business.",
      description:
        "Prices in US dollars, the same for all countries. One-time setup + monthly fee, with no surprises.",
      plans: [
        {
          name: "Essential",
          description: "For businesses starting to automate customer service.",
          price: "$297",
          monthly: "one-time setup + $49/month",
          features: [
            "AI-powered WhatsApp",
            "Automatic responses, 24/7",
            "Customer data capture",
            "After-hours support",
          ],
          button: "Choose Essential",
        },
        {
          name: "Professional",
          description: "For businesses that want to sell automatically.",
          price: "$597",
          monthly: "one-time setup + $97/month",
          features: [
            "Everything in Essential",
            "Automated appointments",
            "Smart CRM",
            "Lead recovery",
            "Scheduled follow-up",
          ],
          button: "Choose Professional",
          popular: "MOST POPULAR",
        },
        {
          name: "Business",
          description: "Complete automation for your operation.",
          price: "$1,197",
          monthly: "one-time setup + $197/month",
          features: [
            "Everything in Professional",
            "AI Receptionist",
            "Custom automations",
            "Integration with your tools",
            "Priority support",
          ],
          button: "Choose Business",
        },
      ],
      web: {
        title: "Need a website?",
        text: "Professional website creation for your business —",
        price: "from $497",
        suffix: "one-time payment.",
        button: "Get a web quote",
      },
      footnote:
        "Launch pricing. Every business is different: contact us and we'll design the exact scope for yours.",
    },
    sectors: {
      label: "WHO IT'S FOR",
      title: "Automation for different types of businesses.",
      description:
        "We don't use the exact same solution for everyone. First we understand how your business works, then we design the system.",
      items: [
        ["🏥", "Clinics", "Patients, appointments and follow-up."],
        ["🍽️", "Restaurants", "Reservations, questions and customer service."],
        ["🏠", "Real estate", "Lead generation and prospect qualification."],
        ["💈", "Barbershops & salons", "Scheduling and reminders."],
        ["🔧", "Auto shops", "Requests, quotes and follow-up."],
        ["🛒", "Retail", "Questions, customers and sales."],
      ],
    },
    caseStudy: {
      label: "EXAMPLE",
      title: "What automation can look like in a clinic.",
      description:
        "This is a conceptual example of how a conversation can become an organized process.",
      tag: "USE CASE",
      title2: "Patient reception",
      text:
        "Instead of relying exclusively on one person to answer every message, an automation can collect initial information and send it to the appropriate system.",
      button: "I want something like this →",
      steps: [
        ["💬", "The patient writes", "“I want an appointment tomorrow.”"],
        ["🤖", "AI has the conversation", "It collects the necessary information."],
        [
          "📊",
          "The lead is recorded",
          "Name, phone, service and interest.",
        ],
        [
          "🎯",
          "The team receives context",
          "The opportunity is ready for the next step.",
        ],
      ],
    },
    beforeAfter: {
      label: "THE CHANGE",
      title: "From manual processes to connected workflows.",
      before: "Before",
      after: "With automation",
      beforeItems: [
        "Messages waiting for a response.",
        "Information spread across different tools.",
        "Manual follow-ups.",
        "Repetitive tasks.",
      ],
      afterItems: [
        "Automatic responses when appropriate.",
        "Organized information.",
        "Scheduled follow-ups.",
        "Connected processes.",
      ],
    },
    method: {
      label: "THE ZAYVERO METHOD",
      title: "First we understand. Then we automate.",
      items: [
        [
          "01 — ANALYZE",
          "Understand your process",
          "We identify repetitive tasks, friction points and automation opportunities.",
        ],
        [
          "02 — DESIGN",
          "Build the workflow",
          "We design a solution based on how your company actually works.",
        ],
        [
          "03 — CONNECT",
          "Integrate your tools",
          "We connect AI, WhatsApp, CRM, forms and other systems into a complete process.",
        ],
        [
          "04 — SUPPORT",
          "Keep improving",
          "We monitor the system, make adjustments and support you as your business grows.",
        ],
      ],
    },
    difference: {
      label: "ZAYVERO",
      title:
        "It's not about adding more technology. It's about making technology work for your business.",
      text:
        "We build automations with a clear objective: helping you better manage the conversations, opportunities and processes that are part of your operation.",
      pills: ["🤖 AI", "💬 WhatsApp", "📊 CRM", "📅 Appointments", "🎯 Leads", "⚙️ Automation"],
    },
    panel: {
      label: "SALES DASHBOARD",
      title: "Your CRM, summarized in one place.",
      description:
        "Data updated directly from the ZAYVERO sales system.",
      refresh: "↻ Refresh data",
      updating: "Updating...",
      error:
        "Could not connect to the Sales Dashboard. Make sure the server is running.",
      loading: "Loading sales information...",
      lastReview: "Last review:",
      status: "Status:",
      connected: "● Connected",
      metrics: [
        "Total leads",
        "Active leads",
        "New",
        "To contact",
        "In follow-up",
        "High priority",
        "Want to hire",
        "Opportunities",
      ],
      summary: "SALES SUMMARY",
      noSummary: "No summary available.",
      attention: "ATTENTION",
      noAttention: "✓ No leads currently need attention.",
      crm: "CRM LEADS",
      crmTitle: "Prospects received and analyzed by ZAYVERO.",
      crmText:
        "Review each prospect's sales information directly from the CRM.",
      noLeads: "No leads registered",
      noLeadsText:
        "New prospects arriving through the form will appear here automatically.",
      changeStatus: "CHANGE STATUS",
      saving: "Saving...",
      serviceInterest: "SERVICE INTEREST",
      intention: "INTENTION",
      need: "NEED",
      contact: "CONTACT",
      whatsapp: "WhatsApp:",
      email: "Email:",
      entry: "Entry:",
      followup: "Follow-up:",
      responsible: "Owner:",
      summaryLabel: "SUMMARY",
      opportunity: "🎯 OPPORTUNITY",
      nextAction: "⚡ NEXT ACTION",
      commercialActions: "SALES ACTIONS",
      contactWhatsapp: "WhatsApp",
      copyMessage: "Copy message",
      copied: "Copied",
      commercialMessage: "View sales message",
      originalMessage: "View original message",
      noPriority: "NO PRIORITY",
      noStatus: "NO STATUS",
      noPhone: "This lead has no WhatsApp number registered.",
      invalidPhone: "This lead's WhatsApp number is not valid.",
      noCommercialMessage: "This lead has no generated sales message.",
      copyError:
        "Could not copy automatically. You can select and copy the message manually.",
      noId: "This lead has no registered ID.",
      statusError: "Could not save the status change. Please try again.",
      states: [
        "New",
        "Contacted",
        "In follow-up",
        "Demo scheduled",
        "Customer won",
        "Customer lost",
      ],
    },
    faq: {
      label: "FREQUENTLY ASKED QUESTIONS",
      title: "What you need to know before getting started.",
      items: [
        [
          "Do I have to change the tools my business already uses?",
          "Not necessarily. We first review your current processes and tools to determine what can be connected and what should be adjusted.",
        ],
        [
          "Can automation handle customers outside business hours?",
          "Depending on the system designed, it can answer common questions and collect requests outside business hours. Cases requiring human intervention can be routed to your team.",
        ],
        [
          "Does the solution adapt to my type of business?",
          "Yes. The scope is defined around your customers, tasks, communication channels and existing tools.",
        ],
        [
          "How do we get started?",
          "Tell us which process you want to improve. We'll review your needs and discuss an initial scope and next steps.",
        ],
      ],
    },
    cta: {
      label: "LET'S START",
      title: "Which part of your business are you still doing manually?",
      text:
        "Tell us how your business currently works and let's discover which processes can become automations.",
      button: "Message us on WhatsApp →",
    },
    contact: {
      label: "CONTACT",
      title: "Let's build a solution for your business.",
      description:
        "Leave your details and tell us what you want to improve. Your request will go directly into our system for follow-up.",
      points: [
        "Artificial Intelligence",
        "WhatsApp and customer service",
        "CRM and follow-up",
        "Business automation",
      ],
      whatsapp: "Message us on WhatsApp",
      received: "Request received!",
      sendAnother: "Send another request",
      retry: "Try again",
      name: "Name *",
      namePlaceholder: "Your name",
      company: "Company *",
      companyPlaceholder: "Your business name",
      phone: "WhatsApp *",
      phonePlaceholder: "849 650 5777",
      email: "Email *",
      emailPlaceholder: "email@company.com",
      service: "What do you want to automate? *",
      select: "Select an option",
      message: "Tell us what you want to improve *",
      messagePlaceholder:
        "Example: we receive many WhatsApp messages and take too long to respond...",
      sending: "Sending...",
      submit: "Send request →",
      privacy:
        "We will only use your information to contact you about your request.",
      privacyLink: "View privacy policy",
      successFallback:
        "We received your request and will contact you shortly.",
      error:
        "We could not register your request. Please try again later.",
      services: [
        "AI Receptionist",
        "AI-powered WhatsApp",
        "Automated appointments",
        "Lead recovery",
        "Smart CRM",
        "Business automation",
        "Website development",
        "I'm not sure",
      ],
    },
    privacy: {
      label: "PRIVACY",
      title: "Your information is used to handle your request.",
      text:
        "ZAYVERO SOLUTIONS uses the information submitted through this form to respond to your inquiry, evaluate your automation needs and follow up on the conversation.",
    },
    footer: {
      small: "AI · Automation · Technology",
      copyright: "© 2026 ZAYVERO SOLUTIONS. All rights reserved.",
    },
    whatsappAria: "Message us on WhatsApp",
  },

  pt: {
    lang: "PT",
    language: "Idioma",
    nav: {
      services: "Serviços",
      sectors: "Setores",
      process: "Como funciona",
      pricing: "Preços",
      panel: "Painel",
      faq: "Perguntas",
      contact: "Contato",
      cta: "Falar com a ZAYVERO",
    },
    hero: {
      eyebrow: "IA · AUTOMAÇÃO · TECNOLOGIA",
      title1: "Seu negócio pode trabalhar",
      title2: "de forma mais inteligente.",
      text:
        "A ZAYVERO cria sistemas com Inteligência Artificial que ajudam empresas a responder clientes, organizar oportunidades, gerenciar agendamentos e automatizar processos.",
      primary: "Descubra o que você pode automatizar →",
      secondary: "Explorar soluções",
      note: "Criamos a tecnologia ao redor do seu negócio.",
      videoFallback: "Seu navegador não consegue reproduzir este vídeo.",
    },
    trust: [
      "Inteligência Artificial",
      "Automação",
      "WhatsApp",
      "CRM",
      "Processos digitais",
    ],
    problem: {
      label: "O PROBLEMA",
      title:
        "Oportunidades podem ser perdidas enquanto sua equipe está ocupada fazendo outras coisas.",
      description:
        "Respostas demoradas, informações espalhadas e tarefas repetitivas podem fazer um negócio depender demais do trabalho manual.",
      cards: [
        {
          icon: "⏱️",
          title: "Respostas demoradas",
          text:
            "Um cliente pergunta, mas ninguém está disponível para responder.",
        },
        {
          icon: "🎯",
          title: "Leads sem acompanhamento",
          text:
            "Pessoas interessadas ficam sem uma próxima ação definida.",
        },
        {
          icon: "🔁",
          title: "Trabalho repetitivo",
          text:
            "A equipe dedica tempo a tarefas que podem se transformar em processos automáticos.",
        },
      ],
    },
    process: {
      label: "COMO FUNCIONA",
      title:
        "Conectamos cada etapa da conversa ao seu negócio.",
      description:
        "Uma automação pode começar com uma mensagem e terminar com uma oportunidade organizada para sua equipe.",
      steps: [
        ["01", "Cliente", "Escreve pelo WhatsApp ou site."],
        ["02", "IA", "Entende e responde."],
        ["03", "Dados", "As informações ficam registradas."],
      ],
    },
    services: {
      label: "SOLUÇÕES",
      title: "Sistemas que trabalham nos bastidores do seu negócio.",
      description:
        "Desde atendimento ao cliente até acompanhamento comercial, criamos automações de acordo com o processo que você deseja melhorar.",
      items: [
        [
          "Recepcionista IA",
          "Atende consultas, responde perguntas frequentes e ajuda a gerenciar solicitações mesmo fora do horário comercial.",
        ],
        [
          "WhatsApp com IA",
          "Responde automaticamente, entende o que cada cliente precisa e coleta seus dados.",
        ],
        [
          "Agendamentos automáticos",
          "Permite que seus clientes solicitem e coordenem agendamentos sem depender de uma pessoa disponível.",
        ],
        [
          "Recuperação de leads",
          "Faz acompanhamento de pessoas que demonstraram interesse, mas pararam de responder.",
        ],
        [
          "CRM inteligente",
          "Centraliza seus prospects e ajuda sua equipe a saber quem precisa de atenção.",
        ],
        [
          "Automação empresarial",
          "Conectamos formulários, WhatsApp, CRM, IA e outras ferramentas em um único fluxo.",
        ],
        [
          "Criação de sites",
          "Criamos sites modernos e rápidos que apresentam seu negócio e transformam visitantes em clientes.",
        ],
      ],
    },
    pricing: {
      label: "PREÇOS",
      title: "Planos para cada etapa do seu negócio.",
      description:
        "Preços em dólares americanos, iguais para todos os países. Instalação única + mensalidade, sem surpresas.",
      plans: [
        {
          name: "Essencial",
          description: "Para começar a automatizar o atendimento do seu negócio.",
          price: "$297",
          monthly: "instalação única + $49/mês",
          features: [
            "WhatsApp com IA",
            "Responde sozinho, 24/7",
            "Captura dados dos clientes",
            "Atende fora do horário",
          ],
          button: "Escolher Essencial",
        },
        {
          name: "Profissional",
          description: "Para negócios que querem vender automaticamente.",
          price: "$597",
          monthly: "instalação única + $97/mês",
          features: [
            "Tudo do plano Essencial",
            "Agendamentos automáticos",
            "CRM inteligente",
            "Recuperação de leads",
            "Acompanhamento programado",
          ],
          button: "Escolher Profissional",
          popular: "MAIS POPULAR",
        },
        {
          name: "Empresarial",
          description: "Automação completa para sua operação.",
          price: "$1,197",
          monthly: "instalação única + $197/mês",
          features: [
            "Tudo do plano Profissional",
            "Recepcionista IA",
            "Automações personalizadas",
            "Integração com suas ferramentas",
            "Suporte prioritário",
          ],
          button: "Escolher Empresarial",
        },
      ],
      web: {
        title: "Precisa de um site?",
        text: "Criação de site profissional para seu negócio —",
        price: "a partir de $497",
        suffix: "pagamento único.",
        button: "Solicitar orçamento",
      },
      footnote:
        "Preços de lançamento. Cada negócio é diferente: fale conosco e criamos o escopo exato para o seu.",
    },
    sectors: {
      label: "PARA QUEM",
      title: "Automação para diferentes tipos de negócios.",
      description:
        "Não usamos a mesma solução para todos. Primeiro entendemos como o negócio funciona e depois criamos o sistema.",
      items: [
        ["🏥", "Clínicas", "Pacientes, consultas e acompanhamento."],
        ["🍽️", "Restaurantes", "Reservas, dúvidas e atendimento."],
        ["🏠", "Imobiliárias", "Captação e qualificação de prospects."],
        ["💈", "Barbearias e salões", "Agendamentos e lembretes."],
        ["🔧", "Oficinas", "Solicitações, orçamentos e acompanhamento."],
        ["🛒", "Lojas", "Dúvidas, clientes e vendas."],
      ],
    },
    caseStudy: {
      label: "EXEMPLO",
      title: "Como uma automação pode funcionar em uma clínica.",
      description:
        "Este é um exemplo conceitual de como uma conversa pode se transformar em um processo organizado.",
      tag: "CASO DE USO",
      title2: "Recepção de pacientes",
      text:
        "Em vez de depender exclusivamente de uma pessoa para responder cada mensagem, uma automação pode coletar as informações iniciais e enviá-las ao sistema correspondente.",
      button: "Quero algo assim →",
      steps: [
        ["💬", "O paciente escreve", "“Quero uma consulta amanhã.”"],
        ["🤖", "A IA conversa", "Coleta as informações necessárias."],
        [
          "📊",
          "O lead é registrado",
          "Nome, telefone, serviço e interesse.",
        ],
        [
          "🎯",
          "A equipe recebe o contexto",
          "A oportunidade fica pronta para continuar.",
        ],
      ],
    },
    beforeAfter: {
      label: "A MUDANÇA",
      title: "De processos manuais para fluxos conectados.",
      before: "Antes",
      after: "Com automação",
      beforeItems: [
        "Mensagens aguardando resposta.",
        "Informações espalhadas por diferentes ferramentas.",
        "Acompanhamentos manuais.",
        "Tarefas repetitivas.",
      ],
      afterItems: [
        "Respostas automáticas quando apropriado.",
        "Informações organizadas.",
        "Acompanhamentos programados.",
        "Processos conectados.",
      ],
    },
    method: {
      label: "MÉTODO ZAYVERO",
      title: "Primeiro entendemos. Depois automatizamos.",
      items: [
        [
          "01 — ANALISAMOS",
          "Entendemos seu processo",
          "Identificamos tarefas repetitivas, pontos de atrito e oportunidades de automação.",
        ],
        [
          "02 — PROJETAMOS",
          "Criamos o fluxo",
          "Projetamos uma solução baseada em como sua empresa realmente funciona.",
        ],
        [
          "03 — CONECTAMOS",
          "Integramos ferramentas",
          "Conectamos IA, WhatsApp, CRM, formulários e outros sistemas para criar um processo completo.",
        ],
        [
          "04 — ACOMPANHAMOS",
          "Damos suporte",
          "Monitoramos o sistema, fazemos ajustes e acompanhamos seu negócio enquanto ele cresce.",
        ],
      ],
    },
    difference: {
      label: "ZAYVERO",
      title:
        "Não se trata de adicionar mais tecnologia. Trata-se de fazer a tecnologia trabalhar para o seu negócio.",
      text:
        "Criamos automações com um objetivo claro: ajudar você a gerenciar melhor as conversas, oportunidades e processos que fazem parte da sua operação.",
      pills: ["🤖 IA", "💬 WhatsApp", "📊 CRM", "📅 Agendamentos", "🎯 Leads", "⚙️ Automação"],
    },
    panel: {
      label: "PAINEL COMERCIAL",
      title: "Seu CRM, resumido em um só lugar.",
      description:
        "Dados atualizados diretamente do sistema comercial da ZAYVERO.",
      refresh: "↻ Atualizar dados",
      updating: "Atualizando...",
      error:
        "Não foi possível conectar ao Painel Comercial. Verifique se o servidor está funcionando.",
      loading: "Carregando informações comerciais...",
      lastReview: "Última revisão:",
      status: "Status:",
      connected: "● Conectado",
      metrics: [
        "Total de leads",
        "Leads ativos",
        "Novos",
        "A contatar",
        "Em acompanhamento",
        "Alta prioridade",
        "Querem contratar",
        "Oportunidades",
      ],
      summary: "RESUMO COMERCIAL",
      noSummary: "Nenhum resumo disponível.",
      attention: "ATENÇÃO",
      noAttention: "✓ Não há leads pendentes de atenção.",
      crm: "LEADS DO CRM",
      crmTitle: "Prospects recebidos e analisados pela ZAYVERO.",
      crmText:
        "Aqui você pode revisar as informações comerciais de cada prospect diretamente do CRM.",
      noLeads: "Nenhum lead registrado",
      noLeadsText:
        "Novos prospects enviados pelo formulário aparecerão aqui automaticamente.",
      changeStatus: "ALTERAR STATUS",
      saving: "Salvando...",
      serviceInterest: "SERVIÇO DE INTERESSE",
      intention: "INTENÇÃO",
      need: "NECESSIDADE",
      contact: "CONTATO",
      whatsapp: "WhatsApp:",
      email: "E-mail:",
      entry: "Entrada:",
      followup: "Acompanhamento:",
      responsible: "Responsável:",
      summaryLabel: "RESUMO",
      opportunity: "🎯 OPORTUNIDADE",
      nextAction: "⚡ PRÓXIMA AÇÃO",
      commercialActions: "AÇÕES COMERCIAIS",
      contactWhatsapp: "WhatsApp",
      copyMessage: "Copiar mensagem",
      copied: "Copiado",
      commercialMessage: "Ver mensagem comercial",
      originalMessage: "Ver mensagem original",
      noPriority: "SEM PRIORIDADE",
      noStatus: "SEM STATUS",
      noPhone: "Este lead não possui um número de WhatsApp registrado.",
      invalidPhone: "O número de WhatsApp deste lead não é válido.",
      noCommercialMessage:
        "Este lead não possui uma mensagem comercial gerada.",
      copyError:
        "Não foi possível copiar automaticamente. Você pode selecionar e copiar a mensagem manualmente.",
      noId: "Este lead não possui um ID registrado.",
      statusError:
        "Não foi possível salvar a alteração de status. Tente novamente.",
      states: [
        "Novo",
        "Contatado",
        "Em acompanhamento",
        "Demo agendada",
        "Cliente ganho",
        "Cliente perdido",
      ],
    },
    faq: {
      label: "PERGUNTAS FREQUENTES",
      title: "O que você precisa saber antes de começar.",
      items: [
        [
          "Preciso mudar as ferramentas que minha empresa já utiliza?",
          "Não necessariamente. Primeiro analisamos seus processos e ferramentas atuais para determinar o que pode ser conectado e o que vale a pena ajustar.",
        ],
        [
          "A automação pode atender fora do horário comercial?",
          "Dependendo do sistema criado, ela pode responder perguntas frequentes e coletar solicitações fora do horário. Casos que exigem intervenção humana podem ser encaminhados à equipe.",
        ],
        [
          "A solução se adapta ao meu tipo de negócio?",
          "Sim. O escopo é definido de acordo com seus clientes, tarefas, canais de atendimento e ferramentas existentes.",
        ],
        [
          "Como começamos?",
          "Conte-nos qual processo você deseja melhorar. Vamos analisar sua necessidade e conversar sobre um escopo inicial e os próximos passos.",
        ],
      ],
    },
    cta: {
      label: "VAMOS COMEÇAR",
      title: "Qual parte do seu negócio você ainda faz manualmente?",
      text:
        "Conte-nos como seu negócio funciona atualmente e vamos descobrir quais processos podem se transformar em automações.",
      button: "Fale conosco pelo WhatsApp →",
    },
    contact: {
      label: "CONTATO",
      title: "Vamos construir uma solução para seu negócio.",
      description:
        "Deixe seus dados e conte-nos o que você deseja melhorar. Sua solicitação chegará diretamente ao nosso sistema para acompanhamento.",
      points: [
        "Inteligência Artificial",
        "WhatsApp e atendimento ao cliente",
        "CRM e acompanhamento",
        "Automação empresarial",
      ],
      whatsapp: "Fale conosco pelo WhatsApp",
      received: "Solicitação recebida!",
      sendAnother: "Enviar outra solicitação",
      retry: "Tentar novamente",
      name: "Nome *",
      namePlaceholder: "Seu nome",
      company: "Empresa *",
      companyPlaceholder: "Nome do seu negócio",
      phone: "WhatsApp *",
      phonePlaceholder: "849 650 5777",
      email: "E-mail *",
      emailPlaceholder: "email@empresa.com",
      service: "O que você quer automatizar? *",
      select: "Selecione uma opção",
      message: "Conte-nos o que você deseja melhorar *",
      messagePlaceholder:
        "Exemplo: recebemos muitas mensagens pelo WhatsApp e demoramos para responder...",
      sending: "Enviando...",
      submit: "Enviar solicitação →",
      privacy:
        "Usaremos seus dados apenas para entrar em contato sobre sua solicitação.",
      privacyLink: "Ver política de privacidade",
      successFallback:
        "Recebemos sua solicitação e entraremos em contato em breve.",
      error:
        "Não foi possível registrar sua solicitação. Tente novamente mais tarde.",
      services: [
        "Recepcionista IA",
        "WhatsApp com IA",
        "Agendamentos automáticos",
        "Recuperação de leads",
        "CRM inteligente",
        "Automação empresarial",
        "Criação de sites",
        "Não tenho certeza",
      ],
    },
    privacy: {
      label: "PRIVACIDADE",
      title: "Suas informações são usadas para atender sua solicitação.",
      text:
        "A ZAYVERO SOLUTIONS utiliza os dados enviados neste formulário para responder à sua consulta, avaliar a necessidade de automação e acompanhar a conversa.",
    },
    footer: {
      small: "IA · Automação · Tecnologia",
      copyright: "© 2026 ZAYVERO SOLUTIONS. Todos os direitos reservados.",
    },
    whatsappAria: "Fale conosco pelo WhatsApp",
  },
};

export default function App() {
  // =====================================================
  // IDIOMA
  // =====================================================
  const [idioma, setIdioma] = useState(() => {
    try {
      const saved = localStorage.getItem("zayvero-language");

      if (saved && translations[saved]) {
        return saved;
      }
    } catch {
      // Ignorar si localStorage no está disponible
    }

    return "es";
  });

  const t = translations[idioma];

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);

    try {
      localStorage.setItem("zayvero-language", nuevoIdioma);
    } catch {
      // Ignorar
    }
  };

  // =====================================================
  // FORMULARIO
  // =====================================================
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    servicio: "",
    mensaje: "",
    website: "",
  });

  const [resultado, setResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // =====================================================
  // PANEL COMERCIAL
  // =====================================================
  const [panel, setPanel] = useState(null);
  const [panelCargando, setPanelCargando] = useState(false);
  const [panelError, setPanelError] = useState(null);

  // =====================================================
  // ACCIONES COMERCIALES
  // =====================================================
  const [copiadoLead, setCopiadoLead] = useState(null);
  const [guardandoEstado, setGuardandoEstado] = useState(null);

  // =====================================================
  // CARGAR PANEL
  // =====================================================
  const cargarPanel = async () => {
    setPanelCargando(true);
    setPanelError(null);

    try {
      const response = await fetch(
        "${API_BASE}/api/panel-comercial"
      );

      if (!response.ok) {
        throw new Error("No se pudo cargar el panel");
      }

      const data = await response.json();
      setPanel(data);
    } catch (error) {
      console.error("Error cargando panel:", error);

      setPanelError(t.panel.error);
    } finally {
      setPanelCargando(false);
    }
  };

  useEffect(() => {
    cargarPanel();
  }, []);

  // =====================================================
  // WHATSAPP
  // =====================================================
  const normalizarTelefonoWhatsApp = (telefono) => {
    const digits = String(telefono || "").replace(/\D/g, "");

    if (!digits) {
      return "";
    }

    if (digits.length === 10) {
      return `1${digits}`;
    }

    if (digits.startsWith("1") && digits.length === 11) {
      return digits;
    }

    return digits;
  };

  const contactarPorWhatsApp = (lead) => {
    if (!lead?.telefono) {
      alert(t.panel.noPhone);
      return;
    }

    const telefono = normalizarTelefonoWhatsApp(lead.telefono);

    if (!telefono) {
      alert(t.panel.invalidPhone);
      return;
    }

    const mensaje =
      lead.mensaje_comercial ||
      `Hola ${lead.nombre || ""}, te escribimos de ZAYVERO SOLUTIONS. Gracias por tu interés. Queremos ayudarte con tu necesidad de automatización.`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // =====================================================
  // COPIAR MENSAJE
  // =====================================================
  const copiarMensajeComercial = async (lead, leadKey) => {
    if (!lead?.mensaje_comercial) {
      alert(t.panel.noCommercialMessage);
      return;
    }

    try {
      await navigator.clipboard.writeText(lead.mensaje_comercial);

      setCopiadoLead(leadKey);

      setTimeout(() => {
        setCopiadoLead(null);
      }, 2000);
    } catch (error) {
      console.error("Error copiando mensaje:", error);

      alert(t.panel.copyError);
    }
  };

  // =====================================================
  // ESTADOS
  // =====================================================
  const cambiarEstadoLead = async (
    lead,
    leadIndex,
    nuevoEstado
  ) => {
    const leadId = lead.id;

    if (!leadId) {
      alert(t.panel.noId);
      return;
    }

    setGuardandoEstado(leadIndex);

    try {
      const response = await fetch(
        "${API_BASE}/api/panel/estado",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: leadId,
            estado: nuevoEstado,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.ok === false) {
        throw new Error(data.error || "Error");
      }

      setPanel((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          leads: (prev.leads || []).map((l, i) =>
            i === leadIndex
              ? { ...l, estado: nuevoEstado }
              : l
          ),
        };
      });
    } catch (error) {
      console.error("Error cambiando estado:", error);
      alert(t.panel.statusError);
    } finally {
      setGuardandoEstado(null);
    }
  };

  // =====================================================
  // SERVICIOS
  // =====================================================
  const iconosServicios = [
    (
      <Icono color="#3b82f6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </Icono>
    ),
    (
      <Icono color="#22c55e">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </Icono>
    ),
    (
      <Icono color="#f59e0b">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </Icono>
    ),
    (
      <Icono color="#ef4444">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </Icono>
    ),
    (
      <Icono color="#8b5cf6">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </Icono>
    ),
    (
      <Icono color="#06b6d6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </Icono>
    ),
    (
      <Icono color="#ec4899">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </Icono>
    ),
  ];

  // =====================================================
  // FORMULARIO
  // =====================================================
  const enviarFormulario = async (e) => {
    e.preventDefault();

    setEnviando(true);
    setResultado(null);

    try {
      const response = await fetch(
        "https://zayvero.app.n8n.cloud/webhook/zayvero-cliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const raw = await response.text();

      let data = {};

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }

      if (!response.ok || data.ok === false) {
        throw new Error("Error");
      }

      setResultado({
        tipo: "success",
        mensaje:
          data.mensaje || t.contact.successFallback,
      });

      setForm({
        nombre: "",
        empresa: "",
        telefono: "",
        email: "",
        servicio: "",
        mensaje: "",
        website: "",
      });

      setTimeout(() => {
        cargarPanel();
      }, 1000);
    } catch (error) {
      console.error("Error enviando formulario:", error);

      setResultado({
        tipo: "error",
        mensaje: t.contact.error,
      });
    } finally {
      setEnviando(false);
    }
  };

  const resumen = panel?.resumen || {};
  const leads = panel?.leads || [];

  const getPriorityStyle = (prioridad) => {
    const value = String(prioridad || "").toUpperCase();

    if (value === "ALTA" || value === "HIGH") {
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    }

    if (value === "MEDIA" || value === "MEDIUM") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    if (value === "BAJA" || value === "LOW") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#374151",
    };
  };

  const getStatusStyle = (estado) => {
    const value = String(estado || "").toUpperCase();

    if (
      value.includes("NUEVO") ||
      value.includes("NEW") ||
      value === "PRUEBA"
    ) {
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };
    }

    if (
      value.includes("SEGUIMIENTO") ||
      value.includes("FOLLOW") ||
      value.includes("CONTACT")
    ) {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    if (
      value.includes("CERRADO") ||
      value.includes("CLIENTE") ||
      value.includes("CUSTOMER")
    ) {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#374151",
    };
  };

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <>
      <div className="site">
        {/* =================================================
            NAVBAR
            ================================================= */}
        <nav className="navbar">
          <div className="container nav">
            <a
              href="#inicio"
              className="logo"
              onClick={() => setMenuAbierto(false)}
            >
              ZAYVERO<span>.</span>
            </a>

            <div className={`nav-links ${menuAbierto ? "open" : ""}`}>
              <a
                href="#servicios"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.services}
              </a>

              <a
                href="#sectores"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.sectors}
              </a>

              <a
                href="#proceso"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.process}
              </a>

              <a
                href="#precios"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.pricing}
              </a>

              <a
                href="#panel-comercial"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.panel}
              </a>

              <a
                href="#preguntas"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.faq}
              </a>

              <a
                href="#contacto"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.contact}
              </a>
            </div>

            <div className="nav-actions">
              {/* SELECTOR DE IDIOMA */}
              <select
                value={idioma}
                onChange={(e) =>
                  cambiarIdioma(e.target.value)
                }
                aria-label={t.language}
                style={{
                  border: "1px solid rgba(148,163,184,.35)",
                  borderRadius: "10px",
                  background: "rgba(15,23,42,.75)",
                  color: "#fff",
                  padding: "9px 10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="es">🇪🇸 ES</option>
                <option value="en">🇺🇸 EN</option>
                <option value="pt">🇧🇷 PT</option>
              </select>

              <a
                href="#contacto"
                className="nav-cta"
                onClick={() => setMenuAbierto(false)}
              >
                {t.nav.cta}
              </a>

              <button
                className={`menu-toggle ${
                  menuAbierto ? "active" : ""
                }`}
                type="button"
                aria-label={
                  menuAbierto
                    ? "Cerrar menú"
                    : "Abrir menú"
                }
                aria-expanded={menuAbierto}
                onClick={() =>
                  setMenuAbierto((actual) => !actual)
                }
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </nav>

        {/* =================================================
            HERO
            ================================================= */}
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">
                <span className="dot"></span>
                {t.hero.eyebrow}
              </div>

              <h1>
                {t.hero.title1}{" "}
                <span className="gradient">
                  {t.hero.title2}
                </span>
              </h1>

              <p className="hero-text">
                {t.hero.text}
              </p>

              <div className="hero-actions">
                <a
                  href="#contacto"
                  className="primary"
                >
                  {t.hero.primary}
                </a>

                <a
                  href="#servicios"
                  className="secondary"
                >
                  {t.hero.secondary}
                </a>
              </div>

              <div className="small-note">
                {t.hero.note}
              </div>
            </div>

            <div className="demo-wrap">
              <div className="demo-glow"></div>

              <video
                src="/zayvero-video.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  maxWidth: "340px",
                  borderRadius: "20px",
                  boxShadow:
                    "0 20px 60px rgba(17, 24, 39, 0.18)",
                  display: "block",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t.hero.videoFallback}
              </video>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <div className="trust-bar">
          <div className="container trust-inner">
            {t.trust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {/* =================================================
            PROBLEM
            ================================================= */}
        <section>
          <div className="container">
            <div className="label">
              {t.problem.label}
            </div>

            <h2 className="title">
              {t.problem.title}
            </h2>

            <p className="description">
              {t.problem.description}
            </p>

            <div className="problem-grid">
              {t.problem.cards.map((card) => (
                <div className="card" key={card.title}>
                  <div className="icon">{card.icon}</div>

                  <h3>{card.title}</h3>

                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            PROCESS
            ================================================= */}
        <section
          className="flow-section"
          id="proceso"
        >
          <div className="container">
            <div className="label">
              {t.process.label}
            </div>

            <h2 className="title">
              {t.process.title}
            </h2>

            <p className="description">
              {t.process.description}
            </p>

            <div className="flow">
              {t.process.steps.map((step, index) => (
                <div
                  key={step[0]}
                  style={{
                    display: "contents",
                  }}
                >
                  <div className="flow-box">
                    <div className="flow-number">
                      {step[0]}
                    </div>

                    <strong>{step[1]}</strong>

                    <span>{step[2]}</span>
                  </div>

                  {index <
                    t.process.steps.length - 1 && (
                    <div className="flow-arrow">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            SERVICES
            ================================================= */}
        <section id="servicios">
          <div className="container">
            <div className="label">
              {t.services.label}
            </div>

            <h2 className="title">
              {t.services.title}
            </h2>

            <p className="description">
              {t.services.description}
            </p>

            <div className="services">
              {t.services.items.map(
                ([title, description], index) => (
                  <div
                    className="service"
                    key={title}
                  >
                    <div className="service-icon">
                      {iconosServicios[index]}
                    </div>

                    <h3>{title}</h3>

                    <p>{description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            PRICING
            ================================================= */}
        <section id="precios">
          <div className="container">
            <div className="label">
              {t.pricing.label}
            </div>

            <h2 className="title">
              {t.pricing.title}
            </h2>

            <p className="description">
              {t.pricing.description}
            </p>

            <div className="services">
              {t.pricing.plans.map((plan, index) => (
                <div
                  className="service"
                  key={plan.name}
                  style={
                    plan.popular
                      ? {
                          border:
                            "2px solid #1d4ed8",
                          position: "relative",
                        }
                      : undefined
                  }
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-15px",
                        left: "50%",
                        transform:
                          "translateX(-50%)",
                        background: "#1d4ed8",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "5px 16px",
                        borderRadius: "20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.popular}
                    </div>
                  )}

                  <h3>{plan.name}</h3>

                  <p>{plan.description}</p>

                  <div
                    style={{
                      margin: "18px 0 4px",
                      fontSize: "38px",
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    {plan.price}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      color: "#d1d5db",
                      marginBottom: "16px",
                    }}
                  >
                    {plan.monthly}
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 22px",
                      fontSize: "15px",
                      color: "#e5e7eb",
                      lineHeight: "2.1",
                    }}
                  >
                    {plan.features.map(
                      (feature) => (
                        <li key={feature}>
                          ✓ {feature}
                        </li>
                      )
                    )}
                  </ul>

                  <a
                    href="#contacto"
                    className="secondary"
                  >
                    {plan.button}
                  </a>
                </div>
              ))}
            </div>

            {/* WEB */}
            <div
              style={{
                marginTop: "8px",
                border: "1px solid #1d4ed8",
                borderRadius: "16px",
                padding: "22px 26px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "16px",
                background:
                  "rgba(29, 78, 216, 0.08)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <Icono color="#ec4899">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />
                    <line
                      x1="2"
                      y1="12"
                      x2="22"
                      y2="12"
                    />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </Icono>

                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {t.pricing.web.title}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    color: "#d1d5db",
                  }}
                >
                  {t.pricing.web.text}{" "}
                  <strong
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    {t.pricing.web.price}
                  </strong>{" "}
                  {t.pricing.web.suffix}
                </div>
              </div>

              <a
                href="#contacto"
                className="secondary"
              >
                {t.pricing.web.button}
              </a>
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280",
                marginTop: "28px",
              }}
            >
              {t.pricing.footnote}
            </p>
          </div>
        </section>

        {/* =================================================
            SECTORS
            ================================================= */}
        <section id="sectores">
          <div className="container">
            <div className="label">
              {t.sectors.label}
            </div>

            <h2 className="title">
              {t.sectors.title}
            </h2>

            <p className="description">
              {t.sectors.description}
            </p>

            <div className="sectors">
              {t.sectors.items.map(
                ([icon, title, text]) => (
                  <div
                    className="sector"
                    key={title}
                  >
                    <div className="sector-icon">
                      {icon}
                    </div>

                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            CASE
            ================================================= */}
        <section>
          <div className="container">
            <div className="label">
              {t.caseStudy.label}
            </div>

            <h2 className="title">
              {t.caseStudy.title}
            </h2>

            <p className="description">
              {t.caseStudy.description}
            </p>

            <div className="case">
              <div className="case-left">
                <span className="case-tag">
                  {t.caseStudy.tag}
                </span>

                <h3>{t.caseStudy.title2}</h3>

                <p>{t.caseStudy.text}</p>

                <a
                  href="#contacto"
                  className="primary"
                >
                  {t.caseStudy.button}
                </a>
              </div>

              <div className="case-flow">
                {t.caseStudy.steps.map(
                  ([icon, title, text]) => (
                    <div
                      className="case-step"
                      key={title}
                    >
                      <div className="case-step-icon">
                        {icon}
                      </div>

                      <div>
                        <strong>{title}</strong>
                        <span>{text}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            BEFORE / AFTER
            ================================================= */}
        <section>
          <div className="container">
            <div className="label">
              {t.beforeAfter.label}
            </div>

            <h2 className="title">
              {t.beforeAfter.title}
            </h2>

            <div className="ba">
              <div className="ba-box ba-before">
                <h3>{t.beforeAfter.before}</h3>

                <div className="list">
                  {t.beforeAfter.beforeItems.map(
                    (item) => (
                      <div
                        className="list-row"
                        key={item}
                      >
                        <span className="bad">
                          ✕
                        </span>
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="ba-box ba-after">
                <h3>{t.beforeAfter.after}</h3>

                <div className="list">
                  {t.beforeAfter.afterItems.map(
                    (item) => (
                      <div
                        className="list-row"
                        key={item}
                      >
                        <span className="good">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            METHOD
            ================================================= */}
        <section>
          <div className="container">
            <div className="label">
              {t.method.label}
            </div>

            <h2 className="title">
              {t.method.title}
            </h2>

            <div className="method">
              {t.method.items.map(
                ([num, title, text]) => (
                  <div
                    className="method-card"
                    key={num}
                  >
                    <div className="method-num">
                      {num}
                    </div>

                    <h3>{title}</h3>

                    <p>{text}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            DIFFERENCE
            ================================================= */}
        <section>
          <div className="container">
            <div className="difference-box">
              <div className="label">
                {t.difference.label}
              </div>

              <h2>{t.difference.title}</h2>

              <p>{t.difference.text}</p>

              <div className="pills">
                {t.difference.pills.map(
                  (pill) => (
                    <span
                      className="pill"
                      key={pill}
                    >
                      {pill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PANEL COMERCIAL
            ===================================================== */}
        <section
          id="panel-comercial"
          style={{
            padding: "90px 0",
            background: "#0b1322",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "flex-end",
                gap: "20px",
                marginBottom: "35px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div className="label">
                  {t.panel.label}
                </div>

                <h2 className="title">
                  {t.panel.title}
                </h2>

                <p className="description">
                  {t.panel.description}
                </p>
              </div>

              <button
                type="button"
                onClick={cargarPanel}
                disabled={panelCargando}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  cursor: panelCargando
                    ? "wait"
                    : "pointer",
                  fontWeight: "700",
                  background: "#2563eb",
                  color: "#fff",
                  opacity: panelCargando
                    ? 0.7
                    : 1,
                }}
              >
                {panelCargando
                  ? t.panel.updating
                  : t.panel.refresh}
              </button>
            </div>

            {panelError && (
              <div
                style={{
                  background: "#fff1f2",
                  border:
                    "1px solid #fecdd3",
                  color: "#9f1239",
                  borderRadius: "14px",
                  padding: "18px",
                  marginBottom: "25px",
                }}
              >
                {panelError}
              </div>
            )}

            {panelCargando && !panel && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "30px",
                  textAlign: "center",
                  border:
                    "1px solid #e5e7eb",
                }}
              >
                {t.panel.loading}
              </div>
            )}

            {panel && (
              <>
                {/* CABECERA */}
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginBottom: "25px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                    }}
                  >
                    {t.panel.lastReview}{" "}
                    <strong
                      style={{
                        color: "#f9fafb",
                      }}
                    >
                      {panel.fecha_revision ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                    }}
                  >
                    {t.panel.status}{" "}
                    <strong
                      style={{
                        color: "#16a34a",
                      }}
                    >
                      {t.panel.connected}
                    </strong>
                  </div>
                </div>

                {/* MÉTRICAS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(170px, 1fr))",
                    gap: "16px",
                    marginBottom: "25px",
                  }}
                >
                  {[
                    [
                      <Icono color="#3b82f6">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle
                          cx="9"
                          cy="7"
                          r="4"
                        />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </Icono>,
                      t.panel.metrics[0],
                      resumen.total_leads ??
                        0,
                    ],
                    [
                      <Icono color="#22c55e">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </Icono>,
                      t.panel.metrics[1],
                      resumen.leads_activos ??
                        0,
                    ],
                    [
                      <Icono color="#8b5cf6">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />
                        <line
                          x1="12"
                          y1="8"
                          x2="12"
                          y2="16"
                        />
                        <line
                          x1="8"
                          y1="12"
                          x2="16"
                          y2="12"
                        />
                      </Icono>,
                      t.panel.metrics[2],
                      resumen.nuevos ?? 0,
                    ],
                    [
                      <Icono color="#f59e0b">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </Icono>,
                      t.panel.metrics[3],
                      resumen.por_contactar ??
                        0,
                    ],
                    [
                      <Icono color="#06b6d6">
                        <polyline points="23 4 23 10 17 10" />
                        <polyline points="1 20 1 14 7 14" />
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </Icono>,
                      t.panel.metrics[4],
                      resumen.en_seguimiento ??
                        0,
                    ],
                    [
                      <Icono color="#ef4444">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </Icono>,
                      t.panel.metrics[5],
                      resumen.prioridad_alta ??
                        0,
                    ],
                    [
                      <Icono color="#ec4899">
                        <rect
                          x="2"
                          y="7"
                          width="20"
                          height="14"
                          rx="2"
                        />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </Icono>,
                      t.panel.metrics[6],
                      resumen.quieren_contratar ??
                        0,
                    ],
                    [
                      <Icono color="#14b8a6">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="6"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2"
                        />
                      </Icono>,
                      t.panel.metrics[7],
                      resumen.oportunidades ??
                        0,
                    ],
                  ].map(
                    ([icon, titulo, valor]) => (
                      <div
                        key={titulo}
                        style={{
                          background: "#fff",
                          border:
                            "1px solid #e5e7eb",
                          borderRadius: "18px",
                          padding: "22px",
                          minHeight: "120px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "24px",
                            marginBottom: "12px",
                          }}
                        >
                          {icon}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                            marginBottom: "5px",
                          }}
                        >
                          {titulo}
                        </div>

                        <div
                          style={{
                            fontSize: "30px",
                            lineHeight: "1",
                            fontWeight: "800",
                            color: "#111827",
                          }}
                        >
                          {valor}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* RESUMEN / ATENCIÓN */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                    marginBottom: "35px",
                  }}
                >
                  <div
                    style={{
                      background: "#141e33",
                      border:
                        "1px solid #2b3a5c",
                      color: "#fff",
                      borderRadius: "20px",
                      padding: "28px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        letterSpacing:
                          "0.12em",
                        fontWeight: "700",
                        opacity: 0.7,
                        marginBottom: "14px",
                      }}
                    >
                      {t.panel.summary}
                    </div>

                    <div
                      style={{
                        whiteSpace:
                          "pre-line",
                        lineHeight: "1.7",
                        fontSize: "14px",
                        opacity: 0.95,
                      }}
                    >
                      {panel.resumen_texto ||
                        t.panel.noSummary}
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#fff",
                      border:
                        "1px solid #e5e7eb",
                      borderRadius: "20px",
                      padding: "28px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        letterSpacing:
                          "0.12em",
                        fontWeight: "700",
                        color: "#6b7280",
                        marginBottom: "14px",
                      }}
                    >
                      {t.panel.attention}
                    </div>

                    {panel.atencion?.length >
                    0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection:
                            "column",
                          gap: "12px",
                        }}
                      >
                        {panel.atencion.map(
                          (item, index) => (
                            <div
                              key={index}
                              style={{
                                padding: "14px",
                                borderRadius:
                                  "12px",
                                background:
                                  "#f9fafb",
                                border:
                                  "1px solid #e5e7eb",
                              }}
                            >
                              <strong>
                                {item.nombre ||
                                  item.empresa ||
                                  `Lead ${
                                    index + 1
                                  }`}
                              </strong>

                              {item.resumen && (
                                <div
                                  style={{
                                    marginTop:
                                      "5px",
                                    fontSize:
                                      "13px",
                                    color:
                                      "#6b7280",
                                  }}
                                >
                                  {
                                    item.resumen
                                  }
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: "20px",
                          background:
                            "#f0fdf4",
                          borderRadius:
                            "12px",
                          color:
                            "#166534",
                          fontSize:
                            "14px",
                        }}
                      >
                        {t.panel.noAttention}
                      </div>
                    )}
                  </div>
                </div>

                {/* LEADS */}
                <div>
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        letterSpacing:
                          "0.12em",
                        fontWeight: "700",
                        color:
                          "#6b7280",
                        marginBottom:
                          "8px",
                      }}
                    >
                      {t.panel.crm}
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize:
                          "26px",
                        color:
                          "#f9fafb",
                      }}
                    >
                      {t.panel.crmTitle}
                    </h3>

                    <p
                      style={{
                        margin:
                          "8px 0 0",
                        color:
                          "#6b7280",
                        fontSize:
                          "14px",
                      }}
                    >
                      {t.panel.crmText}
                    </p>
                  </div>

                  {leads.length > 0 ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      {leads.map(
                        (lead, index) => {
                          const priorityStyle =
                            getPriorityStyle(
                              lead.prioridad
                            );

                          const statusStyle =
                            getStatusStyle(
                              lead.estado
                            );

                          const leadKey =
                            lead.id ||
                            lead.telefono ||
                            lead.nombre ||
                            lead.empresa ||
                            index;

                          return (
                            <div
                              key={leadKey}
                              style={{
                                background:
                                  "#fff",
                                border:
                                  "1px solid #e5e7eb",
                                borderRadius:
                                  "20px",
                                padding:
                                  "24px",
                                boxShadow:
                                  "0 8px 30px rgba(17, 24, 39, 0.05)",
                              }}
                            >
                              {/* IDENTIDAD */}
                              <div
                                style={{
                                  display:
                                    "flex",
                                  justifyContent:
                                    "space-between",
                                  alignItems:
                                    "flex-start",
                                  gap: "12px",
                                  marginBottom:
                                    "18px",
                                }}
                              >
                                <div
                                  style={{
                                    minWidth: 0,
                                  }}
                                >
                                  <h4
                                    style={{
                                      margin: 0,
                                      fontSize:
                                        "20px",
                                      color:
                                        "#111827",
                                      wordBreak:
                                        "break-word",
                                    }}
                                  >
                                    {lead.nombre ||
                                      lead.empresa ||
                                      `Lead ${
                                        index +
                                        1
                                      }`}
                                  </h4>

                                  {lead.empresa && (
                                    <div
                                      style={{
                                        marginTop:
                                          "5px",
                                        color:
                                          "#6b7280",
                                        fontSize:
                                          "14px",
                                      }}
                                    >
                                      {
                                        lead.empresa
                                      }
                                    </div>
                                  )}
                                </div>

                                <span
                                  style={{
                                    ...priorityStyle,
                                    display:
                                      "inline-flex",
                                    alignItems:
                                      "center",
                                    borderRadius:
                                      "999px",
                                    padding:
                                      "6px 10px",
                                    fontSize:
                                      "11px",
                                    fontWeight:
                                      "800",
                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  {lead.prioridad ||
                                    t.panel
                                      .noPriority}
                                </span>
                              </div>

                              {/* ESTADO */}
                              <div
                                style={{
                                  display:
                                    "flex",
                                  flexWrap:
                                    "wrap",
                                  gap: "8px",
                                  marginBottom:
                                    "18px",
                                }}
                              >
                                <span
                                  style={{
                                    ...statusStyle,
                                    borderRadius:
                                      "999px",
                                    padding:
                                      "6px 10px",
                                    fontSize:
                                      "11px",
                                    fontWeight:
                                      "700",
                                  }}
                                >
                                  {lead.estado ||
                                    t.panel
                                      .noStatus}
                                </span>

                                {lead.nivel_interes && (
                                  <span
                                    style={{
                                      background:
                                        "#ede9fe",
                                      color:
                                        "#6d28d9",
                                      borderRadius:
                                        "999px",
                                      padding:
                                        "6px 10px",
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "700",
                                    }}
                                  >
                                    {
                                      lead.nivel_interes
                                    }
                                  </span>
                                )}
                              </div>

                              {/* ESTADO */}
                              <div
                                style={{
                                  marginBottom:
                                    "18px",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize:
                                      "11px",
                                    fontWeight:
                                      "700",
                                    color:
                                      "#6b7280",
                                    marginBottom:
                                      "6px",
                                  }}
                                >
                                  {
                                    t.panel
                                      .changeStatus
                                  }
                                </div>

                                <select
                                  value={
                                    t.panel.states.includes(
                                      lead.estado
                                    )
                                      ? lead.estado
                                      : t.panel
                                          .states[0]
                                  }
                                  disabled={
                                    guardandoEstado ===
                                    index
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    cambiarEstadoLead(
                                      lead,
                                      index,
                                      e.target
                                        .value
                                    )
                                  }
                                  style={{
                                    width:
                                      "100%",
                                    border:
                                      "1px solid #d1d5db",
                                    borderRadius:
                                      "10px",
                                    padding:
                                      "10px 12px",
                                    fontSize:
                                      "13px",
                                    fontWeight:
                                      "600",
                                    color:
                                      "#111827",
                                    background:
                                      "#fff",
                                    cursor:
                                      guardandoEstado ===
                                      index
                                        ? "wait"
                                        : "pointer",
                                  }}
                                >
                                  {t.panel.states.map(
                                    (estado) => (
                                      <option
                                        key={
                                          estado
                                        }
                                        value={
                                          estado
                                        }
                                      >
                                        {estado}
                                      </option>
                                    )
                                  )}
                                </select>

                                {guardandoEstado ===
                                  index && (
                                  <div
                                    style={{
                                      fontSize:
                                        "12px",
                                      color:
                                        "#6b7280",
                                      marginTop:
                                        "6px",
                                    }}
                                  >
                                    {
                                      t.panel
                                        .saving
                                    }
                                  </div>
                                )}
                              </div>

                              {/* DATOS */}
                              <div
                                style={{
                                  display:
                                    "grid",
                                  gap: "10px",
                                  marginBottom:
                                    "18px",
                                }}
                              >
                                {lead.servicio_interes && (
                                  <div
                                    style={{
                                      padding:
                                        "12px",
                                      background:
                                        "#f9fafb",
                                      borderRadius:
                                        "12px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize:
                                          "11px",
                                        color:
                                          "#6b7280",
                                        fontWeight:
                                          "700",
                                        marginBottom:
                                          "3px",
                                      }}
                                    >
                                      {
                                        t.panel
                                          .serviceInterest
                                      }
                                    </div>

                                    <div
                                      style={{
                                        fontSize:
                                          "14px",
                                        color:
                                          "#111827",
                                        fontWeight:
                                          "600",
                                      }}
                                    >
                                      {
                                        lead.servicio_interes
                                      }
                                    </div>
                                  </div>
                                )}

                                {lead.intencion && (
                                  <div
                                    style={{
                                      padding:
                                        "12px",
                                      background:
                                        "#f9fafb",
                                      borderRadius:
                                        "12px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize:
                                          "11px",
                                        color:
                                          "#6b7280",
                                        fontWeight:
                                          "700",
                                        marginBottom:
                                          "3px",
                                      }}
                                    >
                                      {
                                        t.panel
                                          .intention
                                      }
                                    </div>

                                    <div
                                      style={{
                                        fontSize:
                                          "14px",
                                        color:
                                          "#111827",
                                        fontWeight:
                                          "600",
                                      }}
                                    >
                                      {
                                        lead.intencion
                                      }
                                    </div>
                                  </div>
                                )}

                                {lead.tipo_necesidad && (
                                  <div
                                    style={{
                                      padding:
                                        "12px",
                                      background:
                                        "#f9fafb",
                                      borderRadius:
                                        "12px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize:
                                          "11px",
                                        color:
                                          "#6b7280",
                                        fontWeight:
                                          "700",
                                        marginBottom:
                                          "3px",
                                      }}
                                    >
                                      {
                                        t.panel
                                          .need
                                      }
                                    </div>

                                    <div
                                      style={{
                                        fontSize:
                                          "14px",
                                        color:
                                          "#111827",
                                        fontWeight:
                                          "600",
                                      }}
                                    >
                                      {
                                        lead.tipo_necesidad
                                      }
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* CONTACTO */}
                              <div
                                style={{
                                  borderTop:
                                    "1px solid #e5e7eb",
                                  paddingTop:
                                    "16px",
                                  marginBottom:
                                    "18px",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize:
                                      "12px",
                                    fontWeight:
                                      "700",
                                    color:
                                      "#6b7280",
                                    marginBottom:
                                      "10px",
                                  }}
                                >
                                  {
                                    t.panel
                                      .contact
                                  }
                                </div>

                                <div
                                  style={{
                                    display:
                                      "grid",
                                    gap: "7px",
                                    fontSize:
                                      "13px",
                                  }}
                                >
                                  {lead.telefono && (
                                    <div>
                                      <strong>
                                        📱{" "}
                                        {
                                          t.panel
                                            .whatsapp
                                        }
                                      </strong>{" "}
                                      <span>
                                        {
                                          lead.telefono
                                        }
                                      </span>
                                    </div>
                                  )}

                                  {lead.email && (
                                    <div
                                      style={{
                                        wordBreak:
                                          "break-word",
                                      }}
                                    >
                                      <strong>
                                        ✉️{" "}
                                        {
                                          t.panel
                                            .email
                                        }
                                      </strong>{" "}
                                      <span>
                                        {
                                          lead.email
                                        }
                                      </span>
                                    </div>
                                  )}

                                  {lead.fecha_entrada && (
                                    <div>
                                      <strong>
                                        📅{" "}
                                        {
                                          t.panel
                                            .entry
                                        }
                                      </strong>{" "}
                                      <span>
                                        {
                                          lead.fecha_entrada
                                        }
                                      </span>
                                    </div>
                                  )}

                                  {(lead.proximo_seguimiento ||
                                    lead.proximo_seguimiento_manual) && (
                                    <div>
                                      <strong>
                                        ⏰{" "}
                                        {
                                          t.panel
                                            .followup
                                        }
                                      </strong>{" "}
                                      <span>
                                        {lead.proximo_seguimiento ||
                                          lead.proximo_seguimiento_manual}
                                      </span>
                                    </div>
                                  )}

                                  {lead.responsable && (
                                    <div>
                                      <strong>
                                        👤{" "}
                                        {
                                          t.panel
                                            .responsible
                                        }
                                      </strong>{" "}
                                      <span>
                                        {
                                          lead.responsable
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* RESUMEN */}
                              {lead.resumen && (
                                <div
                                  style={{
                                    marginBottom:
                                      "14px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "700",
                                      color:
                                        "#6b7280",
                                      marginBottom:
                                        "5px",
                                    }}
                                  >
                                    {
                                      t.panel
                                        .summaryLabel
                                    }
                                  </div>

                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize:
                                        "13px",
                                      lineHeight:
                                        "1.6",
                                      color:
                                        "#374151",
                                    }}
                                  >
                                    {
                                      lead.resumen
                                    }
                                  </p>
                                </div>
                              )}

                              {/* OPORTUNIDAD */}
                              {lead.oportunidad && (
                                <div
                                  style={{
                                    marginBottom:
                                      "14px",
                                    padding:
                                      "13px",
                                    borderRadius:
                                      "12px",
                                    background:
                                      "#eff6ff",
                                    border:
                                      "1px solid #dbeafe",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "800",
                                      color:
                                        "#1d4ed8",
                                      marginBottom:
                                        "5px",
                                    }}
                                  >
                                    {
                                      t.panel
                                        .opportunity
                                    }
                                  </div>

                                  <div
                                    style={{
                                      fontSize:
                                        "13px",
                                      lineHeight:
                                        "1.6",
                                      color:
                                        "#1e3a8a",
                                    }}
                                  >
                                    {
                                      lead.oportunidad
                                    }
                                  </div>
                                </div>
                              )}

                              {/* PRÓXIMA ACCIÓN */}
                              {lead.proxima_accion && (
                                <div
                                  style={{
                                    marginBottom:
                                      "14px",
                                    padding:
                                      "13px",
                                    borderRadius:
                                      "12px",
                                    background:
                                      "#f0fdf4",
                                    border:
                                      "1px solid #dcfce7",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "800",
                                      color:
                                        "#166534",
                                      marginBottom:
                                        "5px",
                                    }}
                                  >
                                    {
                                      t.panel
                                        .nextAction
                                    }
                                  </div>

                                  <div
                                    style={{
                                      fontSize:
                                        "13px",
                                      lineHeight:
                                        "1.6",
                                      color:
                                        "#166534",
                                    }}
                                  >
                                    {
                                      lead.proxima_accion
                                    }
                                  </div>
                                </div>
                              )}

                              {/* ACCIONES */}
                              <div
                                style={{
                                  borderTop:
                                    "1px solid #e5e7eb",
                                  paddingTop:
                                    "16px",
                                  marginTop:
                                    "16px",
                                  marginBottom:
                                    "14px",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize:
                                      "11px",
                                    fontWeight:
                                      "800",
                                    color:
                                      "#6b7280",
                                    marginBottom:
                                      "10px",
                                    letterSpacing:
                                      "0.05em",
                                  }}
                                >
                                  {
                                    t.panel
                                      .commercialActions
                                  }
                                </div>

                                <div
                                  style={{
                                    display:
                                      "flex",
                                    flexWrap:
                                      "wrap",
                                    gap: "9px",
                                  }}
                                >
                                  {/* WHATSAPP */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      contactarPorWhatsApp(
                                        lead
                                      )
                                    }
                                    disabled={
                                      !lead.telefono
                                    }
                                    aria-label={
                                      t.panel
                                        .contactWhatsapp
                                    }
                                    style={{
                                      border:
                                        "none",
                                      borderRadius:
                                        "10px",
                                      padding:
                                        "11px 14px",
                                      background:
                                        lead.telefono
                                          ? "#25D366"
                                          : "#d1d5db",
                                      color:
                                        "#fff",
                                      fontWeight:
                                        "700",
                                      fontSize:
                                        "12px",
                                      cursor:
                                        lead.telefono
                                          ? "pointer"
                                          : "not-allowed",
                                      display:
                                        "inline-flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "center",
                                      gap: "8px",
                                    }}
                                  >
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                      focusable="false"
                                      style={{
                                        flexShrink:
                                          0,
                                        fill:
                                          "currentColor",
                                      }}
                                    >
                                      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.14 1.6 5.95L.06 24l6.31-1.66a11.85 11.85 0 0 0 5.68 1.45h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.23-6.15-3.41-8.43ZM12.06 21.82h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.21-3.75.99 1-3.65-.23-.37a9.85 9.85 0 1 1 8.38 4.61Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z" />
                                    </svg>

                                    <span>
                                      {
                                        t.panel
                                          .contactWhatsapp
                                      }
                                    </span>
                                  </button>

                                  {/* COPIAR */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      copiarMensajeComercial(
                                        lead,
                                        leadKey
                                      )
                                    }
                                    disabled={
                                      !lead.mensaje_comercial
                                    }
                                    style={{
                                      border:
                                        "1px solid #d1d5db",
                                      borderRadius:
                                        "10px",
                                      padding:
                                        "11px 14px",
                                      background:
                                        copiadoLead ===
                                        leadKey
                                          ? "#ecfdf5"
                                          : "#fff",
                                      color:
                                        copiadoLead ===
                                        leadKey
                                          ? "#166534"
                                          : "#111827",
                                      fontWeight:
                                        "700",
                                      fontSize:
                                        "12px",
                                      cursor:
                                        lead.mensaje_comercial
                                          ? "pointer"
                                          : "not-allowed",
                                      display:
                                        "inline-flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "center",
                                      gap: "7px",
                                    }}
                                  >
                                    {copiadoLead ===
                                    leadKey ? (
                                      <>
                                        <span>
                                          ✓
                                        </span>
                                        <span>
                                          {
                                            t.panel
                                              .copied
                                          }
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span>
                                          📋
                                        </span>
                                        <span>
                                          {
                                            t.panel
                                              .copyMessage
                                          }
                                        </span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* MENSAJE COMERCIAL */}
                              {lead.mensaje_comercial && (
                                <details
                                  style={{
                                    marginTop:
                                      "14px",
                                    borderTop:
                                      "1px solid #e5e7eb",
                                    paddingTop:
                                      "14px",
                                  }}
                                >
                                  <summary
                                    style={{
                                      cursor:
                                        "pointer",
                                      fontSize:
                                        "13px",
                                      fontWeight:
                                        "700",
                                      color:
                                        "#111827",
                                    }}
                                  >
                                    {
                                      t.panel
                                        .commercialMessage
                                    }
                                  </summary>

                                  <div
                                    style={{
                                      marginTop:
                                        "10px",
                                      padding:
                                        "12px",
                                      background:
                                        "#f9fafb",
                                      borderRadius:
                                        "10px",
                                      fontSize:
                                        "13px",
                                      lineHeight:
                                        "1.6",
                                      color:
                                        "#374151",
                                    }}
                                  >
                                    {
                                      lead.mensaje_comercial
                                    }
                                  </div>
                                </details>
                              )}

                              {/* MENSAJE ORIGINAL */}
                              {lead.mensaje && (
                                <details
                                  style={{
                                    marginTop:
                                      "10px",
                                  }}
                                >
                                  <summary
                                    style={{
                                      cursor:
                                        "pointer",
                                      fontSize:
                                        "13px",
                                      fontWeight:
                                        "700",
                                      color:
                                        "#6b7280",
                                    }}
                                  >
                                    {
                                      t.panel
                                        .originalMessage
                                    }
                                  </summary>

                                  <div
                                    style={{
                                      marginTop:
                                        "10px",
                                      padding:
                                        "12px",
                                      background:
                                        "#f9fafb",
                                      borderRadius:
                                        "10px",
                                      fontSize:
                                        "13px",
                                      lineHeight:
                                        "1.6",
                                      color:
                                        "#374151",
                                    }}
                                  >
                                    {lead.mensaje}
                                  </div>
                                </details>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        background: "#fff",
                        border:
                          "1px solid #e5e7eb",
                        borderRadius: "20px",
                        padding:
                          "40px 25px",
                        textAlign:
                          "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "42px",
                          marginBottom:
                            "12px",
                        }}
                      >
                        👥
                      </div>

                      <h3
                        style={{
                          margin:
                            "0 0 8px",
                          color:
                            "#111827",
                        }}
                      >
                        {t.panel.noLeads}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color:
                            "#6b7280",
                          fontSize:
                            "14px",
                        }}
                      >
                        {t.panel.noLeadsText}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* =================================================
            FAQ
            ================================================= */}
        <section id="preguntas">
          <div className="container">
            <div className="label">
              {t.faq.label}
            </div>

            <h2 className="title">
              {t.faq.title}
            </h2>

            <div className="faq-list">
              {t.faq.items.map(
                ([question, answer]) => (
                  <div
                    className="faq-item"
                    key={question}
                  >
                    <h3>{question}</h3>

                    <p>{answer}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            CTA
            ================================================= */}
        <section className="cta">
          <div className="container">
            <div className="cta-box">
              <div className="label">
                {t.cta.label}
              </div>

              <h2>{t.cta.title}</h2>

              <p>{t.cta.text}</p>

              <a
                href="https://wa.me/18496505777?text=Hola%20ZAYVERO%2C%20quiero%20automatizar%20mi%20negocio"
                target="_blank"
                rel="noreferrer"
                className="primary"
              >
                {t.cta.button}
              </a>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTACTO
            ================================================= */}
        <section id="contacto">
          <div className="container contact">
            <div>
              <div className="label">
                {t.contact.label}
              </div>

              <h2>{t.contact.title}</h2>

              <p className="contact-description">
                {t.contact.description}
              </p>

              <div className="contact-points">
                {[
                  ["🤖", t.contact.points[0]],
                  ["💬", t.contact.points[1]],
                  ["📊", t.contact.points[2]],
                  ["⚙️", t.contact.points[3]],
                ].map(([icon, text]) => (
                  <div
                    className="contact-point"
                    key={text}
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}

                <a
                  className="whatsapp-link"
                  href="https://wa.me/18496505777?text=Hola%20ZAYVERO%2C%20quiero%20conocer%20sus%20soluciones%20de%20automatizaci%C3%B3n"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="whatsapp-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M20.5 3.5A11.85 11.85 0 0 0 12.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L.03 24l6.28-1.65a11.86 11.86 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.17-3.44-8.41ZM12.04 21.84h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.73.98.99-3.64-.23-.37a9.9 9.9 0 1 1 8.37 4.62Zm5.43-7.42c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>

                  <span>
                    {t.contact.whatsapp}
                  </span>
                </a>
              </div>
            </div>

            <div className="form">
              {resultado ? (
                <div className="success">
                  {resultado.tipo ===
                  "success" ? (
                    <>
                      <div className="success-icon">
                        ✓
                      </div>

                      <h3>
                        {t.contact.received}
                      </h3>

                      <p>
                        {resultado.mensaje}
                      </p>

                      <button
                        className="primary"
                        type="button"
                        onClick={() =>
                          setResultado(
                            null
                          )
                        }
                      >
                        {t.contact.sendAnother}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="error">
                        {resultado.mensaje}
                      </div>

                      <button
                        className="primary"
                        type="button"
                        onClick={() =>
                          setResultado(
                            null
                          )
                        }
                      >
                        {t.contact.retry}
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={enviarFormulario}
                >
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="nombre">
                        {t.contact.name}
                      </label>

                      <input
                        id="nombre"
                        required
                        type="text"
                        placeholder={
                          t.contact
                            .namePlaceholder
                        }
                        value={form.nombre}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nombre:
                              e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="empresa">
                        {t.contact.company}
                      </label>

                      <input
                        id="empresa"
                        required
                        type="text"
                        placeholder={
                          t.contact
                            .companyPlaceholder
                        }
                        value={form.empresa}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            empresa:
                              e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="telefono">
                        {t.contact.phone}
                      </label>

                      <input
                        id="telefono"
                        required
                        type="tel"
                        placeholder={
                          t.contact
                            .phonePlaceholder
                        }
                        value={
                          form.telefono
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            telefono:
                              e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="email">
                        {t.contact.email}
                      </label>

                      <input
                        id="email"
                        required
                        type="email"
                        placeholder={
                          t.contact
                            .emailPlaceholder
                        }
                        value={form.email}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            email:
                              e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="field full">
                      <label htmlFor="servicio">
                        {t.contact.service}
                      </label>

                      <select
                        id="servicio"
                        required
                        value={
                          form.servicio
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            servicio:
                              e.target.value,
                          })
                        }
                      >
                        <option value="">
                          {t.contact.select}
                        </option>

                        {t.contact.services.map(
                          (service) => (
                            <option
                              key={service}
                            >
                              {service}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="field full">
                      <label htmlFor="mensaje">
                        {t.contact.message}
                      </label>

                      <textarea
                        id="mensaje"
                        required
                        placeholder={
                          t.contact
                            .messagePlaceholder
                        }
                        value={form.mensaje}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            mensaje:
                              e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <input
                    className="honeypot"
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.website}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        website:
                          e.target.value,
                      })
                    }
                  />

                  <button
                    className="primary submit"
                    type="submit"
                    disabled={enviando}
                  >
                    {enviando
                      ? t.contact.sending
                      : t.contact.submit}
                  </button>

                  <p className="privacy-note">
                    {t.contact.privacy}

                    <a href="#privacidad">
                      {" "}
                      {
                        t.contact
                          .privacyLink
                      }
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            PRIVACIDAD
            ================================================= */}
        <section
          className="privacy-section"
          id="privacidad"
        >
          <div className="container">
            <div className="privacy-box">
              <div className="label">
                {t.privacy.label}
              </div>

              <h2>{t.privacy.title}</h2>

              <p>{t.privacy.text}</p>
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER
            ================================================= */}
        <footer>
          <div className="container footer">
            <div>
              <div className="footer-logo">
                ZAYVERO.
              </div>

              <div className="footer-small">
                {t.footer.small}
              </div>
            </div>

            <div className="copyright">
              {t.footer.copyright}
            </div>
          </div>
        </footer>

        {/* =================================================
            WHATSAPP FLOAT
            ================================================= */}
        <a
          className="whatsapp-float"
          href="https://wa.me/18496505777?text=Hola%20ZAYVERO%2C%20quiero%20conocer%20sus%20soluciones%20de%20automatizaci%C3%B3n"
          target="_blank"
          rel="noreferrer"
          aria-label={t.whatsappAria}
        >
          <svg
            className="whatsapp-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.6 5.93L.14 24l6.37-1.67a11.8 11.8 0 0 0 5.57 1.42h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.13-3.43-8.41ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.87 9.87 0 0 1-1.52-5.3C2.16 6.38 6.61 1.93 12.09 1.93a9.84 9.84 0 0 1 7.01 2.91 9.84 9.84 0 0 1 2.9 7.01c0 5.48-4.45 9.95-9.91 9.95Zm5.45-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </a>
      </div>
    </>
  );
}