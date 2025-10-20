import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav.jsx';
import { useAppState } from '../state/AppState.jsx';

const headerTitles = {
  '/': 'Pet Ride',
  '/onboarding': 'Comece sua jornada',
  '/login': 'Entrar',
  '/register': 'Criar conta',
  '/home': 'Mapa de serviços',
  '/pets': 'Meus pets',
  '/pets/add': 'Cadastrar pet',
  '/services': 'Serviços',
  '/profile': 'Perfil',
};

export default function AppShell() {
  const location = useLocation();
  const { state } = useAppState();
  const title = headerTitles[location.pathname] ?? 'Pet Ride';

  const isRoot = location.pathname === '/';
  const isAuthFlow = location.pathname === '/login' || location.pathname === '/register';
  const isFullBleed = location.pathname === '/home';
  const shouldRenderHeader = !isAuthFlow;

  return (
    <div className={['app-shell', isAuthFlow ? 'app-shell--auth' : ''].filter(Boolean).join(' ')}>
      {shouldRenderHeader && (
        <header className={['app-header', isRoot ? 'app-header--landing' : 'app-header--minimal']
          .filter(Boolean)
          .join(' ')}>
          <div className="app-header__title">
            {isRoot ? (
              <>
                <span aria-hidden="true" role="img">🐾</span>
                {title}
              </>
            ) : (
              <span>{title}</span>
            )}
          </div>
          {isRoot && state.user?.city && (
            <p className="app-header__subtitle">Operando em {state.user.city}</p>
          )}
        </header>
      )}
      <main
        className={['app-main', isAuthFlow ? 'app-main--auth' : '', isFullBleed ? 'app-main--fullbleed' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <Outlet />
      </main>
      {!isAuthFlow && <BottomNav />}
    </div>
  );
}
