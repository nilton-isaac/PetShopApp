import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { useAppState } from '../state/AppState.jsx';

export default function Pets() {
  const { state } = useAppState();

  return (
    <div className="section">
      <div className="flow-actions" style={{ marginBottom: 'var(--space-sm)' }}>
        <Button to="/pets/add" variant="primary">
          Novo pet
        </Button>
        <Button variant="ghost" to="/services">
          Encontrar serviços
        </Button>
      </div>
      {state.pets.map((pet) => (
        <Card key={pet.id}>
          <div className="section" style={{ gap: 'var(--space-xs)' }}>
            <div className="list__item" style={{ border: 'none', padding: 0 }}>
              <div className="avatar">{pet.name[0]}</div>
              <div>
                <h3 className="section-title" style={{ fontSize: 'var(--font-size-md)' }}>
                  {pet.name}
                </h3>
                <p className="hero__subtitle">{pet.type}{pet.breed ? ` · ${pet.breed}` : ''}</p>
              </div>
            </div>
            {pet.notes && <p>{pet.notes}</p>}
            <div className="flow-actions">
              <Button variant="secondary" size="small">
                Favoritar motorista
              </Button>
              <Button variant="ghost" size="small">
                Histórico de corridas
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
