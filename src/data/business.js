// ────────────────────────────────────────────────────────────────────────────
// Datos del negocio — fuente única de verdad
// Si cambias algo aquí, se propaga a todos los componentes que lo importen.
// Para SEO: actualizar también el JSON-LD en index.html (sincronizado).
// ────────────────────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: 'ALMelectricidad',
  legalName: 'ALMelectricidad',
  url: 'https://almelectricidad.com',

  // Contacto
  phone: '+34605333108',          // formato E.164 (para tel: y schema)
  phoneDisplay: '605 33 31 08',   // formato visible
  whatsapp: '34605333108',        // formato wa.me
  email: 'contacto@almelectricidad.com',

  // Ubicación
  address: {
    locality: 'Ocaña',
    region: 'Castilla-La Mancha',
    country: 'ES',
  },

  // Horario
  hours: {
    weekdays: { opens: '08:00', closes: '20:00' },
    weekend:  { description: 'Solo urgencias 24h' },
  },
  hoursDisplay: {
    weekdays: 'Lun–Vie: 8:00 – 20:00',
    saturday: 'Sáb: solo urgencias',
    sunday:   'Dom: solo urgencias',
  },

  // Reputación (Google reviews)
  rating: {
    value: '5.0',
    count: 25,
  },

  // Negocio
  founded: '2018',
  priceRange: '€€',

  // Áreas de cobertura (para schema)
  serviceCities: [
    'Ocaña',
    'Aranjuez',
    'Madrid',
    'Toledo',
    'Getafe',
    'Alcorcón',
    'Talavera de la Reina',
    'Illescas',
  ],

  // Fundador
  founder: {
    name: 'Jorge Hernández García',
    jobTitle: 'Instalador Electricista Autorizado',
  },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

export const TEL_HREF = `tel:${BUSINESS.phone}`;

/**
 * Construye una URL de WhatsApp con texto opcional.
 * @param {string} [text] - mensaje pre-rellenado
 * @returns {string} URL https://wa.me/...
 */
export function whatsappUrl(text) {
  const base = `https://wa.me/${BUSINESS.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
