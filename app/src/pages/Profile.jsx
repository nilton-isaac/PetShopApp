import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { useAppState } from '../state/AppState.jsx';

const options = [
  { id: 'edit', label: 'Editar perfil', icon: 'edit' },
  { id: 'notifications', label: 'Notificações', icon: 'notifications' },
  { id: 'help', label: 'Ajuda', icon: 'help' },
];

export default function Profile() {
  const { state } = useAppState();

  return (
    <div className="section profile-page">
      <Card className="profile-card">
        <div className="profile-card__header">
          <div className="profile-avatar" aria-hidden="true">
            {state.user.name[0]}
          </div>
          <div>
            <h2 className="profile-card__title">{state.user.name}</h2>
            <p className="profile-card__subtitle">{state.user.city}</p>
          </div>
        </div>

        <div className="profile-contact" role="contentinfo">
          <span className="material-symbols-outlined" aria-hidden="true">
            mail
          </span>
          <div>
            <p className="profile-contact__label">E-mail principal</p>
            <p className="profile-contact__value">{state.user.email}</p>
          </div>
          <Button variant="ghost" size="small" className="profile-contact__action">
            Atualizar
          </Button>
        </div>
      </Card>

      <Card tonal className="profile-options">
        <h3 className="profile-options__title">Preferências</h3>
        <ul className="profile-options__list">
          {options.map((option, index) => (
            <li key={option.id} className="profile-options__item">
              <button type="button" className="profile-options__button">
                <span className="profile-options__icon material-symbols-outlined" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="profile-options__label">{option.label}</span>
                <span className="profile-options__chevron material-symbols-outlined" aria-hidden="true">
                  chevron_right
                </span>
              </button>
              {index < options.length - 1 && <span className="profile-options__divider" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
