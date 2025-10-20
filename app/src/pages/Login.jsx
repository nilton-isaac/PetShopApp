import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import InputField from '../components/InputField.jsx';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <Card as="form" onSubmit={handleSubmit} className="section">
      <div>
        <h2 className="section-title">Que bom te ver de volta</h2>
        <p className="hero__subtitle">Acesse sua conta para solicitar uma corrida ou acompanhar serviços.</p>
      </div>
      <InputField id="email" label="E-mail" inputProps={{ type: 'email', required: true, placeholder: 'nome@exemplo.com' }} />
      <InputField
        id="senha"
        label="Senha"
        inputProps={{ type: 'password', required: true, minLength: 6, placeholder: 'Sua senha' }}
      />
      <Button type="submit" variant="primary">
        Entrar
      </Button>
      <Button to="/register" variant="ghost">
        Quero criar uma conta
      </Button>
    </Card>
  );
}
