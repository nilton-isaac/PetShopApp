import React, { useEffect, useMemo, useState } from 'react';
import MapView from '../components/MapView.jsx';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';
import { useAppState } from '../state/AppState.jsx';
import { fetchNearbyServices } from '../services/locations.js';
import { getServiceColorVar, getServiceGlyph, getServiceLabel } from '../components/mapIcons.js';

const DEFAULT_CENTER = [-23.561684, -46.655981];
const DEFAULT_ZOOM = 14;

export default function Home() {
  const { state } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [viewCenter, setViewCenter] = useState(DEFAULT_CENTER);
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [activePetIds, setActivePetIds] = useState(() => state.pets.map((pet) => pet.id));

  useEffect(() => {
    setActivePetIds((current) => {
      const existing = state.pets.map((pet) => pet.id);
      const filtered = current.filter((id) => existing.includes(id));
      return filtered.length ? filtered : existing;
    });
  }, [state.pets]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchNearbyServices({ query: searchTerm, coords: DEFAULT_CENTER, signal: controller.signal })
      .then((data) => {
        setServices(data);
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') {
          return;
        }
        setError('Não foi possível carregar os serviços no momento.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [searchTerm]);

  const activePetTypes = useMemo(() => {
    const selectedPets = state.pets.filter((pet) => activePetIds.includes(pet.id));
    return new Set(selectedPets.map((pet) => pet.type));
  }, [activePetIds, state.pets]);

  const filteredServices = useMemo(() => {
    if (!services.length) {
      return [];
    }

    if (activePetTypes.size === 0) {
      return services;
    }

    return services.filter((service) =>
      service.supportedPets?.some((petType) => activePetTypes.has(petType)),
    );
  }, [activePetTypes, services]);

  const markers = useMemo(
    () =>
      filteredServices.map((service) => ({
        id: service.id,
        position: service.position,
        title: service.name,
        description: service.description,
        address: service.address,
        distance: service.distance,
        category: service.category,
        categoryLabel: getServiceLabel(service.category),
      })),
    [filteredServices],
  );

  const summaryText = useMemo(() => {
    if (isLoading) {
      return 'Buscando serviços próximos...';
    }
    if (error) {
      return error;
    }
    if (!filteredServices.length) {
      return 'Nenhum serviço encontrado para os filtros selecionados.';
    }
    return `${filteredServices.length} locais disponíveis`;
  }, [error, filteredServices.length, isLoading]);

  const handleTogglePet = (petId) => {
    setActivePetIds((current) => {
      const isSelected = current.includes(petId);
      if (isSelected && current.length === 1) {
        return current;
      }
      if (isSelected) {
        return current.filter((id) => id !== petId);
      }
      return [...current, petId];
    });
  };

  const handleSelectService = (service) => {
    if (!service) {
      return;
    }

    setActiveServiceId(service.id);
    setViewCenter([...service.position]);
    if (mapInstance) {
      mapInstance.flyTo(service.position, Math.max(mapInstance.getZoom(), 15), {
        duration: 0.5,
      });
    }
  };

  const handleZoom = (delta) => {
    if (!mapInstance) {
      return;
    }
    mapInstance.setZoom(mapInstance.getZoom() + delta);
  };

  const handleRecenter = () => {
    setActiveServiceId(null);
    setViewCenter([...DEFAULT_CENTER]);
    if (mapInstance) {
      mapInstance.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 0.6 });
    }
  };

  const upcomingService = state.upcomingServices[0];
  const upcomingPet = upcomingService
    ? state.pets.find((pet) => pet.id === upcomingService.petId)
    : null;

  return (
    <section className="home-map">
      <MapView
        center={viewCenter}
        zoom={DEFAULT_ZOOM}
        markers={markers}
        activeMarkerId={activeServiceId}
        onReady={setMapInstance}
        onMarkerClick={handleSelectService}
      >
        <>
          <div className="map-view__overlay home-map__search" role="search">
            <InputField
              aria-label="Buscar por serviços pet"
              icon={<span className="material-symbols-outlined">search</span>}
              inputProps={{
                value: searchTerm,
                onChange: (event) => setSearchTerm(event.target.value),
                placeholder: 'Buscar serviços ou localizações',
                autoComplete: 'off',
              }}
            />
            <div className="home-map__status" role="status">
              {summaryText}
            </div>
            {upcomingService && (
              <div className="home-map__upcoming" aria-live="polite">
                <span className="material-symbols-outlined" aria-hidden="true">
                  event_upcoming
                </span>
                Próximo agendamento: {upcomingService.title} · {upcomingService.scheduledFor}
                {upcomingPet ? ` · ${upcomingPet.name}` : ''}
              </div>
            )}
          </div>
          <div className="map-view__overlay home-map__chips" aria-label="Filtrar por pet">
            {state.pets.map((pet) => {
              const isActive = activePetIds.includes(pet.id);
              return (
                <button
                  key={pet.id}
                  type="button"
                  className={['home-map__chip', isActive ? 'home-map__chip--active' : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleTogglePet(pet.id)}
                  aria-pressed={isActive}
                >
                  <span className="home-map__chip-avatar" aria-hidden="true">
                    {pet.name.slice(0, 1)}
                  </span>
                  <span className="home-map__chip-label">{pet.name}</span>
                </button>
              );
            })}
          </div>
          <div className="map-view__overlay home-map__floating-actions" aria-label="Controles do mapa">
            <button
              type="button"
              className="home-map__action-button"
              onClick={() => handleZoom(1)}
              aria-label="Aproximar mapa"
              disabled={!mapInstance}
            >
              <span className="material-symbols-outlined" aria-hidden="true">add</span>
            </button>
            <button
              type="button"
              className="home-map__action-button"
              onClick={() => handleZoom(-1)}
              aria-label="Afastar mapa"
              disabled={!mapInstance}
            >
              <span className="material-symbols-outlined" aria-hidden="true">remove</span>
            </button>
            <button
              type="button"
              className="home-map__action-button"
              onClick={handleRecenter}
              aria-label="Centralizar mapa em São Paulo"
            >
              <span className="material-symbols-outlined" aria-hidden="true">my_location</span>
            </button>
          </div>
          <div className="map-view__overlay home-map__cards" aria-live="polite">
            <div className="home-map__card-list">
              {filteredServices.slice(0, 4).map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={['home-map__card', isActive ? 'home-map__card--active' : '']
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSelectService(service)}
                  >
                    <span
                      className="home-map__card-icon material-symbols-outlined"
                      style={{ color: `var(${getServiceColorVar(service.category)})` }}
                      aria-hidden="true"
                    >
                      {getServiceGlyph(service.category)}
                    </span>
                    <div className="home-map__card-content">
                      <p className="home-map__card-title">{service.name}</p>
                      <p className="home-map__card-meta">
                        {service.distance.toFixed(1)} km · {getServiceLabel(service.category)}
                      </p>
                      <p className="home-map__card-address">{service.address}</p>
                    </div>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      chevron_right
                    </span>
                  </button>
                );
              })}
              <Button to="/services" variant="ghost" size="small" className="home-map__all-services">
                Ver todos os serviços
              </Button>
            </div>
          </div>
        </>
      </MapView>
    </section>
  );
}

