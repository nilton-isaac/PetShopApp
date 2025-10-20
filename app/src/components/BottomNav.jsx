import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { to: '/home', icon: 'map', label: 'Mapa' },
  { to: '/pets', icon: 'pets', label: 'Meus Pets' },
  { to: '/services', icon: 'cut', label: 'Serviços' },
  { to: '/profile', icon: 'person', label: 'Perfil' },
];

export default function BottomNav() {
  const location = useLocation();
  const hiddenPaths = ['/', '/onboarding', '/login', '/register', '/pets/add'];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            ['bottom-nav__link', isActive ? 'bottom-nav__link--active' : ''].filter(Boolean).join(' ')
          }
        >
          <span aria-hidden="true" className="material-symbols-outlined">
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
