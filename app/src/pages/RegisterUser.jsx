import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import InputField from '../components/InputField.jsx';

export default function RegisterUser() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/pets/add');
  };

  return (
    <Card as="form" onSubmit={handleSubmit} className="section">
      <div>
        <h2 className="section-title">Informações do tutor</h2>
        <p className="hero__subtitle">Esses dados nos ajudam a personalizar recomendações e agilizar corridas.</p>
      </div>
      <InputField id="nome" label="Nome completo" inputProps={{ required: true, placeholder: 'Seu nome' }} />
      <InputField id="telefone" label="Telefone" inputProps={{ type: 'tel', placeholder: '(11) 99999-9999' }} />
      <InputField id="bairro" label="Bairro" inputProps={{ placeholder: 'Digite seu bairro' }} />
      <InputField id="referencia" label="Ponto de referência" hint="Ajude o motorista a encontrar sua casa." multiline inputProps={{ placeholder: 'Ex: portaria azul, ao lado da praça' }} />
      <Button type="submit" variant="primary">
        Continuar para pets
      </Button>
    </Card>
  );
}
