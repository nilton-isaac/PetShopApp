import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <header className="auth-header">
          <span aria-hidden="true" className="auth-icon material-symbols-outlined">
            pets
          </span>
          <div className="auth-header__text">
            <h1>Entre na sua conta</h1>
            <p>
              Conecte-se para encontrar serviços confiáveis e cuidar do seu pet com praticidade.
            </p>
          </div>
        </header>
        <div className="auth-fields">
          <InputField
            id="email"
            label="Email"
            icon={<span className="material-symbols-outlined">alternate_email</span>}
            inputProps={{ type: 'email', required: true, placeholder: 'nome@exemplo.com' }}
          />
          <InputField
            id="senha"
            label="Senha"
            type="password"
            showPasswordToggle
            icon={<span className="material-symbols-outlined">lock</span>}
            inputProps={{ required: true, minLength: 6, placeholder: 'Sua senha' }}
          />
        </div>
        <Button type="submit" variant="primary" fullWidth>
          Entrar
        </Button>
        <footer className="auth-footer">
          <button type="button" className="auth-link-button">
            Esqueci minha senha?
          </button>
          <div className="auth-footer__cta">
            <span>É novo por aqui?</span>
            <Button to="/register" variant="ghost" size="small">
              Criar Conta
            </Button>
          </div>
        </footer>
      </form>
    </section>
  );
}
