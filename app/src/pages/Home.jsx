import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { useAppState } from '../state/AppState.jsx';

const nearbyServices = [
  { id: 'near-1', title: 'Clínica Vet ABC', distance: '2,5 km', category: 'Veterinário 24h' },
  { id: 'near-2', title: 'Pet Store & Hotel', distance: '1,2 km', category: 'Hotel + Creche' },
  { id: 'near-3', title: 'Banho & Tosa Estilo', distance: '3 km', category: 'Banho & Tosa' },
];

export default function Home() {
  const { state } = useAppState();

  return (
    <div className="section" style={{ gap: 'var(--space-lg)' }}>
      <Card className="map-card">
        <div className="map-card__chips">
          {state.pets.map((pet) => (
            <span key={pet.id} className="tag">
              {pet.name}
            </span>
          ))}
        </div>
        <div>
          <h2 className="section-title">Pet services próximos</h2>
          <p className="hero__subtitle">Veja onde estão os parceiros mais bem avaliados em tempo real.</p>
          <div className="map-card__actions">
            <Button to="/services" variant="primary" size="small">
              Abrir lista completa
            </Button>
            <Button variant="ghost" size="small">
              Atualizar mapa
            </Button>
          </div>
        </div>
      </Card>
      <section className="section">
        <h3 className="section-title">Agendamentos</h3>
        <div className="list">
          {state.upcomingServices.map((service) => {
            const pet = state.pets.find((item) => item.id === service.petId);
            return (
              <div key={service.id} className="list__item">
                <div className="avatar">{pet?.name?.[0] ?? '?'}</div>
                <div>
                  <p className="section-title" style={{ fontSize: 'var(--font-size-sm)' }}>
                    {service.title}
                  </p>
                  <p className="hero__subtitle">{service.scheduledFor} · {pet?.name}</p>
                </div>
                <Button variant="ghost" size="small">
                  Ver detalhes
                </Button>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section">
        <h3 className="section-title">Locais próximos</h3>
        <div className="list">
          {nearbyServices.map((service) => (
            <div key={service.id} className="list__item">
              <div className="avatar" aria-hidden="true">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="section-title" style={{ fontSize: 'var(--font-size-sm)' }}>
                  {service.title}
                </p>
                <p className="hero__subtitle">{service.category} · {service.distance}</p>
              </div>
              <Button variant="ghost" size="small">
                Solicitar corrida
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
