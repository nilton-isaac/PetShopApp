import React, { useRef } from 'react';
import Button from './Button.jsx';

export default function PhotoPicker({ id, label, value, onChange, hint }) {
  const inputRef = useRef(null);

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      onChange(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        file,
        preview: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePickPhoto = () => {
    inputRef.current?.click();
  };

  const handlePreviewKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePickPhoto();
    }
  };

  const previewStyle = value?.preview
    ? { backgroundImage: `url(${value.preview})` }
    : undefined;

  return (
    <div className="photo-picker">
      <div className="photo-picker__header">
        <label htmlFor={id} className="photo-picker__label">
          {label}
        </label>
        <Button type="button" variant="secondary" size="small" onClick={handlePickPhoto}>
          Selecionar foto
        </Button>
        <input
          id={id}
          ref={inputRef}
          className="photo-picker__input"
          type="file"
          accept="image/*"
          onChange={handleFileSelection}
        />
      </div>
      <div
        className="photo-picker__preview"
        style={previewStyle}
        role="button"
        tabIndex={0}
        onClick={handlePickPhoto}
        onKeyDown={handlePreviewKeyDown}
        aria-label={
          value?.file
            ? `Pré-visualização da foto de ${value.file.name}. Clique para substituir.`
            : 'Pré-visualização da foto do pet. Clique para adicionar.'
        }
      >
        {!value?.preview && (
          <div className="photo-picker__placeholder">
            <span aria-hidden="true" className="material-symbols-outlined">
              pets
            </span>
            <p>Adicione uma foto charmosa do seu pet</p>
          </div>
        )}
      </div>
      {hint && <p className="photo-picker__hint">{hint}</p>}
    </div>
  );
}
