import React, { createContext, useContext, useMemo, useState } from 'react';

const AppStateContext = createContext();

const initialState = {
  user: {
    name: 'Amanda',
    city: 'São Paulo, SP',
    email: 'amanda@petriders.app',
  },
  pets: [
    {
      id: 'pet-1',
      name: 'Lola',
      type: 'Cachorro',
      breed: 'Vira-lata caramelo',
      notes: 'Adora passeios curtos e motoristas tranquilos.',
    },
    {
      id: 'pet-2',
      name: 'Mingau',
      type: 'Gato',
      breed: 'Siamês',
      notes: 'Prefere viagens pela manhã e caixas de transporte fechadas.',
    },
  ],
  upcomingServices: [
    {
      id: 'srv-1',
      title: 'Banho & Tosa Estilo',
      scheduledFor: 'Sexta, 14h',
      petId: 'pet-1',
      status: 'confirmado',
    },
  ],
};

export function AppStateProvider({ children }) {
  const [state, setState] = useState(initialState);

  const addPet = (pet) => {
    setState((prev) => ({
      ...prev,
      pets: [
        ...prev.pets,
        {
          id: `pet-${Date.now()}`,
          ...pet,
        },
      ],
    }));
  };

  const value = useMemo(
    () => ({
      state,
      addPet,
    }),
    [state],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState deve ser utilizado dentro de AppStateProvider');
  }
  return context;
}
