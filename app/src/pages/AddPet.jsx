import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import InputField from '../components/InputField.jsx';
import { useAppState } from '../state/AppState.jsx';

const tipos = ['Cachorro', 'Gato', 'Ave', 'Roedor', 'Outro'];

export default function AddPet() {
  const { addPet } = useAppState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: tipos[0],
    breed: '',
    notes: '',
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPet(formData);
    navigate('/pets');
  };

  return (
    <Card as="form" className="section" onSubmit={handleSubmit}>
      <div>
        <h2 className="section-title">Cadastrar pet</h2>
        <p className="hero__subtitle">Inclua informações que ajudem motoristas e parceiros a cuidarem melhor dele.</p>
      </div>
      <InputField
        id="pet-name"
        label="Nome"
        inputProps={{ value: formData.name, onChange: handleChange('name'), required: true, placeholder: 'Ex: Lola' }}
      />
      <div className="input-field">
        <label htmlFor="pet-type">Tipo de pet</label>
        <select id="pet-type" value={formData.type} onChange={handleChange('type')}>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
      <InputField
        id="pet-breed"
        label="Raça"
        inputProps={{ value: formData.breed, onChange: handleChange('breed'), placeholder: 'Opcional' }}
      />
      <InputField
        id="pet-notes"
        label="Preferências e observações"
        multiline
        hint="Ex.: gosta de janelas abertas, usa peitoral tamanho M, levar brinquedo favorito."
        inputProps={{
          value: formData.notes,
          onChange: handleChange('notes'),
          rows: 3,
          placeholder: 'Compartilhe detalhes importantes',
        }}
      />
      <Button type="submit" variant="primary">
        Salvar pet
      </Button>
    </Card>
  );
}
