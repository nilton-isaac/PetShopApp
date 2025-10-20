import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { to: '/home', icon: 'map', label: 'Mapa' },
  { to: '/pets', icon: 'pets', label: 'Meus pets' },
  { to: '/services', icon: 'storefront', label: 'Serviços' },
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
          <span aria-hidden="true" className="bottom-nav__icon material-symbols-rounded">
            {item.icon}
          </span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
