import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import InputField from '../components/InputField.jsx';
import PhotoPicker from '../components/PhotoPicker.jsx';
import { useAppState } from '../state/AppState.jsx';

const speciesOptions = ['Cachorro', 'Gato', 'Ave', 'Roedor', 'Outro'];
const sizeOptions = ['Pequeno', 'Médio', 'Grande'];

export default function AddPet() {
  const { addPet } = useAppState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: speciesOptions[0],
    size: sizeOptions[0],
    age: '',
    breed: '',
    notes: '',
    photo: null,
  });

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value === '' ? '' : Number(value),
    }));
  };

  const handleChipSelect = (field, option) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  const handlePhotoChange = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      photo: imageData,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPet({
      ...formData,
      age: formData.age === '' ? null : formData.age,
    });
    navigate('/pets');
  };

  return (
    <Card as="form" className="section pet-form" onSubmit={handleSubmit}>
      <div className="pet-form__header">
        <h2 className="section-title">Cadastrar pet</h2>
        <p className="hero__subtitle">Inclua informações que ajudem motoristas e parceiros a cuidarem melhor dele.</p>
      </div>

      <PhotoPicker
        id="pet-photo"
        label="Foto do pet"
        value={formData.photo}
        onChange={handlePhotoChange}
        hint="Ajuda motoristas a reconhecerem seu pet rapidamente."
      />

      <InputField
        id="pet-name"
        label="Nome"
        inputProps={{ value: formData.name, onChange: handleChange('name'), required: true, placeholder: 'Ex: Lola' }}
      />

      <fieldset className="chip-fieldset" aria-labelledby="pet-type-label">
        <legend id="pet-type-label">Espécie</legend>
        <div className="chip-group">
          {speciesOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={['chip', 'chip--selectable', formData.type === option ? 'chip--selected' : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleChipSelect('type', option)}
              aria-pressed={formData.type === option}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="chip-fieldset" aria-labelledby="pet-size-label">
        <legend id="pet-size-label">Porte</legend>
        <div className="chip-group">
          {sizeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={['chip', 'chip--selectable', formData.size === option ? 'chip--selected' : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleChipSelect('size', option)}
              aria-pressed={formData.size === option}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="form-grid">
        <InputField
          id="pet-breed"
          label="Raça"
          inputProps={{ value: formData.breed, onChange: handleChange('breed'), placeholder: 'Opcional' }}
        />
        <InputField
          id="pet-age"
          label="Idade (anos)"
          type="number"
          inputProps={{
            value: formData.age,
            onChange: handleNumberChange('age'),
            min: 0,
            max: 40,
            step: 1,
            placeholder: 'Ex: 3',
          }}
        />
      </div>

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

      <Button type="submit" variant="primary" fullWidth>
        Salvar pet
      </Button>
    </Card>
  );
}
