import React from 'react';
import Button from '../components/Button.jsx';

export default function Welcome() {
  return (
    <>
        <div className="welcome__image">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGkdzLDz1LhwQA0rf62ul1x0uen1BJ2yKs1Xy3dE3ib1Trd0B-zwD17ZwEpwPUT3igPVjrCcXlt6GUZnH5nlRILcPEVBthklavk5crpZHmCK3e9X56jZFPbHm0reT7eoEzuFsW3btqbdZU2_yCxYecQpl-essFKC9hBar-2SFf5Rt173MmYqJbyuz2LHoh6pTigovD6nmj34I3rZzWmQ1gDaILDg6pyPL7DlqXzyRC34f55aTxwGyDzk-k0JFqTtTATwXHpadjpAsw"
            alt="Gato adulto e filhote sentados lado a lado" 
            loading="lazy" 
          />
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
    </>
  );
}
