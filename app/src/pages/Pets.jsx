import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { useAppState } from '../state/AppState.jsx';

export default function Pets() {
  const { state } = useAppState();

  return (
    <div className="section pets-page">
      <div className="pets-page__intro">
        <h2 className="section-title">Seus companheiros</h2>
        <p className="pets-page__subtitle">
          Visualize rapidamente o perfil dos seus pets e acesse as ações mais comuns.
        </p>
      </div>

      <div className="pets-page__list">
        {state.pets.map((pet) => (
          <Card key={pet.id} className="pet-card">
            <div className="pet-card__media" aria-hidden="true">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <div className="pet-card__content">
              <div className="pet-card__header">
                <h3 className="pet-card__title">{pet.name}</h3>
                <p className="pet-card__meta">
                  {pet.type}
                  {pet.breed ? ` · ${pet.breed}` : ''}
                </p>
              </div>
              {pet.notes && <p className="pet-card__notes">{pet.notes}</p>}
              <div className="pet-card__actions" aria-label="Atalhos do pet">
                <Button variant="secondary" size="small" className="pet-card__chip">
                  Agenda
                </Button>
                <Button variant="ghost" size="small" className="pet-card__chip">
                  Histórico
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        to="/pets/add"
        variant="primary"
        className="fab"
        aria-label="Adicionar novo pet"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          add
        </span>
      </Button>
    </div>
  );
}
