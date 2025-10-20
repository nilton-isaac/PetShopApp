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

export async function fetchNearbyServices({ query = '', coords, signal } = {}) {
  // Placeholder para futura integração com APIs como Mapbox Geocoding ou Google Places.
  // Quando disponível, utilize os parâmetros `query` e `coords` para montar a requisição real.
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, DEFAULT_DELAY);

    const handleAbort = () => {
      clearTimeout(timeout);
      reject(new DOMException('Operação cancelada', 'AbortError'));
    };

    signal?.addEventListener('abort', handleAbort, { once: true });
  });

  if (signal?.aborted) {
    throw new DOMException('Operação cancelada', 'AbortError');
  }

  const baseData = filterByQuery(SIMULATED_SERVICES, query);

  return baseData.map((service) => ({
    ...service,
    // Enquanto a API real não estiver conectada, mantemos distâncias simuladas.
    // Com dados reais, utilize a coordenada `coords` para calcular distâncias reais.
    distance: service.distance,
  }));
}

