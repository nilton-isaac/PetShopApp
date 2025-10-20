import React, { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import illustration from '../assets/welcome-illustration.svg';

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

  const destaques = useMemo(
    () => [
      {
        icon: 'local_taxi',
        titulo: 'Motoristas cuidadosos',
        descricao: 'Escolha condutores avaliados e apaixonados por pets para cada corrida.',
      },
      {
        icon: 'calendar_month',
        titulo: 'Agenda inteligente',
        descricao: 'Organize banhos, consultas e hospedagem sem sair do aplicativo.',
      },
      {
        icon: 'diversity_3',
        titulo: 'Comunidade confiável',
        descricao: mensagemAleatoria,
      },
    ],
    [mensagemAleatoria],
  );

  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <div className="welcome__card">
        <div className="welcome__media" aria-hidden="true">
          <div className="welcome__figure">
            <img src={illustration} alt="Ilustração de um cachorro e um gato juntos" loading="lazy" />
          </div>
          <div className="welcome__blur" />
        </div>
        <div className="welcome__content">
          <span className="welcome__badge">Seu pet merece o melhor trajeto</span>
          <h1 id="welcome-title" className="welcome__title">
            Bem-vindo ao Pet Ride
          </h1>
          <p className="welcome__description">
            Transporte com carinho, serviços confiáveis e uma rede de vizinhos que também amam animais. Tudo em um só lugar.
          </p>
          <ul className="welcome__highlights">
            {destaques.map((item) => (
              <li key={item.titulo} className="welcome__highlight">
                <span className="material-symbols-rounded" aria-hidden="true">
                  {item.icon}
                </span>
                <div className="welcome__highlight-text">
                  <p className="welcome__highlight-title">{item.titulo}</p>
                  <p className="welcome__highlight-description">{item.descricao}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="welcome__actions">
            <Button to="/register" variant="primary" fullWidth>
              Criar conta
            </Button>
            <Button to="/login" variant="secondary" fullWidth>
              Já tenho uma conta. Entrar
            </Button>
          </div>
          <div className="welcome__footer">
            <span className="material-symbols-rounded" aria-hidden="true">
              lightbulb
            </span>
            <p>
              <strong>Curiosidade:</strong> {curiosidadeAleatoria}
            </p>
            <button type="button" className="welcome__refresh" onClick={() => setRefreshSeed((value) => value + 1)}>
              Ver outra
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
