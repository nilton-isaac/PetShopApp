const SIMULATED_SERVICES = [
  {
    id: 'svc-vet-1',
    name: 'Clínica Vet ABC',
    category: 'vet',
    description: 'Atendimento 24h com especialidades em felinos e cães braquicefálicos.',
    address: 'Av. Paulista, 900 - Bela Vista',
    position: [-23.563099, -46.654251],
    distance: 1.6,
    rating: 4.8,
    supportedPets: ['Cachorro', 'Gato'],
    tags: ['plantão', 'vacinas'],
  },
  {
    id: 'svc-grooming-1',
    name: 'Banho & Tosa Estilo',
    category: 'grooming',
    description: 'Pacotes premium com hidratação natural e tosas personalizadas.',
    address: 'R. Augusta, 1400 - Consolação',
    position: [-23.559212, -46.660701],
    distance: 1.1,
    rating: 4.6,
    supportedPets: ['Cachorro'],
    tags: ['delivery', 'banho'],
  },
  {
    id: 'svc-hotel-1',
    name: 'Hotel Pet Dreams',
    category: 'hotel',
    description: 'Suítes climatizadas com monitoramento por câmera e recreação diária.',
    address: 'R. Frei Caneca, 450 - Consolação',
    position: [-23.553821, -46.651352],
    distance: 2.3,
    rating: 4.9,
    supportedPets: ['Cachorro', 'Gato'],
    tags: ['creche', 'monitoramento'],
  },
  {
    id: 'svc-grooming-2',
    name: 'Spa Felino Jardins',
    category: 'grooming',
    description: 'Equipe especializada em gatos com sala silenciosa e aromaterapia.',
    address: 'Al. Campinas, 720 - Jardins',
    position: [-23.570965, -46.651988],
    distance: 2.9,
    rating: 4.7,
    supportedPets: ['Gato'],
    tags: ['felinos'],
  },
  {
    id: 'svc-vet-2',
    name: 'VetCare Especialidades',
    category: 'vet',
    description: 'Fisioterapia, acupuntura e exames de imagem com agendamento rápido.',
    address: 'R. da Consolação, 3200 - Cerqueira César',
    position: [-23.560508, -46.672414],
    distance: 3.2,
    rating: 4.5,
    supportedPets: ['Cachorro', 'Gato'],
    tags: ['especialidades'],
  },
];

const DEFAULT_DELAY = 240;

function filterByQuery(services, query) {
  if (!query) {
    return services;
  }

  const normalized = query.trim().toLowerCase();

  return services.filter((service) => {
    const haystack = [service.name, service.address, ...(service.tags ?? [])]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export async function fetchNearbyServices({ query = '', coords = [-23.561684, -46.655981], signal } = {}) {
  const API_BASE = 'http://localhost:3001';
  const toRad = (deg) => (deg * Math.PI) / 180;
  const kmBetween = (a, b) => {
    const [lat1, lon1] = a;
    const [lat2, lon2] = b;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const c1 = Math.cos(toRad(lat1));
    const c2 = Math.cos(toRad(lat2));
    const h = Math.sin(dLat / 2) ** 2 + c1 * c2 * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  };

  try {
    const res = await fetch(`${API_BASE}/locations`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();

    let services = rows.map((row) => ({
      id: row.id,
      name: row.title ?? 'Serviço',
      category: row.category ?? 'vet',
      description: row.description ?? '',
      address: row.address ?? '',
      position: [row.latitude, row.longitude],
      distance: kmBetween(coords, [row.latitude, row.longitude]),
      supportedPets: ['Cachorro', 'Gato'],
      tags: [],
      rating: 4.6,
    }));

    if (query) {
      services = filterByQuery(services, query);
    }

    return services;
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    // Fallback para dados simulados quando o backend não estiver acessível.
    const baseData = filterByQuery(SIMULATED_SERVICES, query);
    return baseData.map((service) => ({ ...service }));
  }
}

