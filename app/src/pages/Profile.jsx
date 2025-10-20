import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { useAppState } from '../state/AppState.jsx';

export default function Profile() {
  const { state } = useAppState();

  return (
    <div className="section" style={{ gap: 'var(--space-lg)' }}>
      <Card>
        <div className="section" style={{ gap: 'var(--space-sm)' }}>
          <div className="list__item" style={{ border: 'none', padding: 0 }}>
            <div className="avatar">{state.user.name[0]}</div>
            <div>
              <h2 className="section-title">{state.user.name}</h2>
              <p className="hero__subtitle">{state.user.city}</p>
            </div>
          </div>
          <p>{state.user.email}</p>
          <div className="flow-actions">
            <Button variant="secondary" size="small">
              Editar perfil
            </Button>
            <Button variant="ghost" size="small">
              Preferências de corrida
            </Button>
          </div>
        </div>
      </Card>
      <Card tonal>
        <h3 className="section-title">Comunidade</h3>
        <p>
          Entre em contato com tutores próximos, compartilhe indicações e organize caronas colaborativas para seu bairro.
        </p>
        <Button variant="primary" size="small">
          Acessar comunidade beta
        </Button>
      </Card>
    </div>
  );
}
