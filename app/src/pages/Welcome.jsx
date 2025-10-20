import React, { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const mensagensBoasVindas = [
  'Conecte-se aos melhores serviços pet da sua vizinhança.',
  'Solicite um motorista com experiência em transporte de animais com poucos toques.',
  'Centralize cuidados, registros e deslocamentos do seu pet em um só lugar.',
  'Acompanhe corridas em tempo real e compartilhe indicações com vizinhos confiáveis.',
];

const curiosidades = [
  'Cães podem aprender mais de 1000 palavras com treinamento consistente!',
  'Gatos passam 70% da vida dormindo — perfeito para uma viagem relaxante.',
  'Coelhos adoram passeios calmos, ideais para nossos motoristas cuidadosos.',
  'Hamsters enxergam melhor no escuro, por isso preferem viagens noturnas.',
];

export default function Welcome() {
  const [refreshSeed, setRefreshSeed] = useState(0);

  const mensagemAleatoria = useMemo(() => {
    const indice = Math.floor(Math.random() * mensagensBoasVindas.length);
    return mensagensBoasVindas[indice];
  }, [refreshSeed]);

  const curiosidadeAleatoria = useMemo(() => {
    const indice = Math.floor(Math.random() * curiosidades.length);
    return curiosidades[indice];
  }, [refreshSeed]);

  return (
    <Card tonal>
      <div className="section" style={{ gap: 'var(--space-md)' }}>
        <h2 className="section-title">Boas-vindas</h2>
        <p>{mensagemAleatoria}</p>
        <p>
          <span className="tag" style={{ background: 'rgba(31, 18, 8, 0.08)' }}>Curiosidade</span>{' '}
          {curiosidadeAleatoria}
        </p>
        <div className="flow-actions">
          <Button to="/onboarding" variant="primary">
            Começar agora
          </Button>
          <Button variant="ghost" onClick={() => setRefreshSeed((value) => value + 1)}>
            Ver outra mensagem
          </Button>
        </div>
      </div>
    </Card>
  );
}
