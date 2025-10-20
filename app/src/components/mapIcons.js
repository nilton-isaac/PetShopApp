import L from 'leaflet';

const CATEGORY_CONFIG = {
  vet: {
    label: 'Clínica veterinária',
    glyph: 'medical_services',
    colorVar: '--color-category-vet',
  },
  grooming: {
    label: 'Banho & tosa',
    glyph: 'content_cut',
    colorVar: '--color-category-grooming',
  },
  hotel: {
    label: 'Loja · hotel · ração',
    glyph: 'storefront',
    colorVar: '--color-category-hotel',
  },
};

const iconCache = new Map();

function createIcon({ glyph, colorVar }) {
  return L.divIcon({
    className: 'map-icon__wrapper',
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -36],
    html: `
      <div class="map-icon" style="--map-icon-color: var(${colorVar});">
        <span class="material-symbols-outlined" aria-hidden="true">${glyph}</span>
      </div>
    `,
  });
}

export function getServiceLabel(category) {
  return CATEGORY_CONFIG[category]?.label ?? 'Serviço pet';
}

export function getServiceGlyph(category) {
  return CATEGORY_CONFIG[category]?.glyph ?? 'location_on';
}

export function getServiceColorVar(category) {
  return CATEGORY_CONFIG[category]?.colorVar ?? '--color-primary';
}

export function getServiceIcon(category) {
  const key = category ?? 'default';

  if (iconCache.has(key)) {
    return iconCache.get(key);
  }

  const config = CATEGORY_CONFIG[key] ?? {
    label: 'Serviço pet',
    glyph: 'location_on',
    colorVar: '--color-primary',
  };

  const icon = createIcon(config);
  iconCache.set(key, icon);
  return icon;
}

export const SERVICE_CATEGORIES = Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
  id,
  label: config.label,
}));

