import React from 'react';
import Button from '../components/Button.jsx';
import illustration from '../assets/welcome-illustration.svg';

export default function Welcome() {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <div className="welcome__card">
        <div className="welcome__image">
          <img src={illustration} alt="Cachorro e gato sentados lado a lado" loading="lazy" />
        </div>

        <div className="welcome__content">
          <h1 id="welcome-title" className="welcome__title">
            Bem-vindo ao Pet App!
          </h1>
          <p className="welcome__description">
            Seu pet shop na palma da mão. Agende serviços, compre produtos e cuide do seu melhor amigo com facilidade.
          </p>
        </div>

        <div className="welcome__actions">
          <Button to="/register" variant="primary" fullWidth>
            Criar Conta
          </Button>
          <Button to="/login" variant="secondary" fullWidth>
            Já tenho uma conta. Entrar
          </Button>
        </div>
      </div>
    </section>
  );
}
