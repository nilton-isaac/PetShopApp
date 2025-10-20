import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav.jsx';
import Button from '../components/Button.jsx';
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
  const navigate = useNavigate();
  const { state } = useAppState();
  const title = headerTitles[location.pathname] ?? 'Pet Ride';

  const shouldShowQuickActions = location.pathname === '/';

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__title">
          <span aria-hidden="true" role="img">🐾</span>
          {title}
        </div>
        {state.user?.city && (
          <p className="app-header__subtitle">Operando em {state.user.city}</p>
        )}
      </header>
      <main className="app-main">
        {shouldShowQuickActions && (
          <section className="section">
            <div className="hero">
              <p className="tag">Beta fechado</p>
              <h1 className="hero__title">Motoristas confiáveis para o cuidado do seu pet</h1>
              <p className="hero__subtitle">
                Solicite corridas, encontre serviços e compartilhe indicações com vizinhos em poucos toques.
              </p>
            </div>
            <div className="flow-actions">
              <Button onClick={() => navigate('/pets/add')} variant="primary">
                Cadastrar pet
              </Button>
              <Button onClick={() => navigate('/home')} variant="secondary">
                Ver mapa
              </Button>
              <Button onClick={() => navigate('/services')} variant="ghost">
                Explorar serviços
              </Button>
            </div>
          </section>
        )}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
