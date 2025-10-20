import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';

export default function RegisterUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError('As senhas não conferem. Verifique e tente novamente.');
      return;
    }

    navigate('/pets/add');
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <header className="auth-header">
          <span aria-hidden="true" className="auth-icon material-symbols-outlined">
            badge
          </span>
          <div className="auth-header__text">
            <h1>Cadastre-se</h1>
            <p>
              Compartilhe alguns dados para receber recomendações sob medida para o seu pet.
            </p>
          </div>
        </header>
        <div className="auth-fields">
          <InputField
            id="nome"
            label="Nome Completo"
            icon={<span className="material-symbols-outlined">person</span>}
            inputProps={{
              value: formData.name,
              onChange: handleChange('name'),
              required: true,
              placeholder: 'Seu nome completo',
            }}
          />
          <InputField
            id="email"
            label="Email"
            icon={<span className="material-symbols-outlined">alternate_email</span>}
            inputProps={{
              value: formData.email,
              onChange: handleChange('email'),
              type: 'email',
              required: true,
              placeholder: 'nome@exemplo.com',
            }}
          />
          <InputField
            id="celular"
            label="Celular"
            icon={<span className="material-symbols-outlined">call</span>}
            inputProps={{
              value: formData.phone,
              onChange: handleChange('phone'),
              type: 'tel',
              required: true,
              placeholder: '(11) 99999-9999',
            }}
          />
          <InputField
            id="senha"
            label="Senha"
            type="password"
            showPasswordToggle
            icon={<span className="material-symbols-outlined">lock</span>}
            inputProps={{
              value: formData.password,
              onChange: handleChange('password'),
              required: true,
              minLength: 6,
              placeholder: 'Crie uma senha',
            }}
          />
          <InputField
            id="confirmar-senha"
            label="Confirmar Senha"
            type="password"
            showPasswordToggle
            icon={<span className="material-symbols-outlined">lock_reset</span>}
            inputProps={{
              value: formData.confirmPassword,
              onChange: handleChange('confirmPassword'),
              required: true,
              minLength: 6,
              placeholder: 'Repita a senha',
            }}
          />
        </div>
        {formError && (
          <p role="alert" className="auth-error">
            {formError}
          </p>
        )}
        <Button type="submit" variant="primary" fullWidth>
          Cadastrar
        </Button>
        <footer className="auth-footer">
          <div className="auth-footer__cta">
            <span>Já tem uma conta?</span>
            <Button to="/login" variant="ghost" size="small">
              Já tenho uma conta
            </Button>
          </div>
        </footer>
      </form>
    </section>
  );
}
