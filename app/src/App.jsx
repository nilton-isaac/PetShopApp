import { useMemo, useState } from 'react';
import './index.css';

const mensagensBoasVindas = [
  'Bem-vindo ao Pet Ride! Seu pet merece viagens confortáveis.',
  'Olá! Vamos agendar o próximo passeio do seu pet juntos?',
  'Que tal reservar um carro e levar seu pet para um dia de cuidados?',
  'Pronto para conectar seu pet aos melhores serviços da cidade?',
  'Seu pet está em boas patas! Explore nossos serviços exclusivos.',
];

const curiosidades = [
  'Cães podem aprender mais de 1000 palavras com treinamento consistente!',
  'Gatos passam 70% da vida dormindo — perfeito para uma viagem relaxante.',
  'Coelhos adoram passeios calmos, ideais para nossos motoristas cuidadosos.',
  'Hamsters enxergam melhor no escuro, por isso preferem viagens noturnas.',
];

export default function App() {
  const [contador, setContador] = useState(0);

  const mensagemAleatoria = useMemo(() => {
    const indice = Math.floor(Math.random() * mensagensBoasVindas.length);
    return mensagensBoasVindas[indice];
  }, [contador]);

  const curiosidadeAleatoria = useMemo(() => {
    const indice = Math.floor(Math.random() * curiosidades.length);
    return curiosidades[indice];
  }, [contador]);

  return (
    <main>
      <section className="welcome-card">
        <h1>Pet Ride</h1>
        <p>{mensagemAleatoria}</p>
        <p>
          <span className="highlight">Curiosidade:</span> {curiosidadeAleatoria}
        </p>
        <button type="button" onClick={() => setContador((value) => value + 1)}>
          Mostrar outra mensagem
        </button>
      </section>
    </main>
  );
}
