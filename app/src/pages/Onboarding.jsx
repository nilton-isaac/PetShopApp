import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const passos = [
  {
    title: 'Conte sobre você',
    description: 'Dados básicos para montar seu perfil e sugerir parceiros na sua região.',
  },
  {
    title: 'Cadastre seus pets',
    description: 'Inclua preferências, restrições e contatos de emergência para cada pet.',
  },
  {
    title: 'Combine corridas e serviços',
    description: 'Escolha o tipo de atendimento, motorista favorito e acompanhe o trajeto em tempo real.',
  },
];

export default function Onboarding() {
  return (
    <div className="section">
      <Card tonal>
        <h2 className="section-title">Como funciona</h2>
        <p>
          Em menos de 5 minutos você configura seu perfil, registra seus pets e já pode solicitar uma corrida
          especializada ou agendar um serviço.
        </p>
      </Card>
      <div className="section">
        {passos.map((passo, index) => (
          <Card key={passo.title}>
            <p className="tag">Passo {index + 1}</p>
            <h3 className="section-title">{passo.title}</h3>
            <p>{passo.description}</p>
          </Card>
        ))}
      </div>
      <div className="flow-actions">
        <Button to="/register" variant="primary">
          Criar minha conta
        </Button>
        <Button to="/login" variant="secondary">
          Já tenho conta
        </Button>
      </div>
    </div>
  );
}
