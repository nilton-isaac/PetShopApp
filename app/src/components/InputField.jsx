import React, { useState } from 'react';

export default function InputField({
  id,
  label,
  hint,
  type = 'text',
  multiline = false,
  inputProps = {},
  icon = null,
  showPasswordToggle = false,
  ...rest
}) {
  const InputComponent = multiline ? 'textarea' : 'input';
  const isPasswordField = !multiline && type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const resolvedType = inputProps.type ?? type;
  const finalType = isPasswordField ? (isPasswordVisible ? 'text' : 'password') : resolvedType;

  const handleToggleVisibility = () => {
    setIsPasswordVisible((previous) => !previous);
  };

  const inputClassName = ['input-field__input', inputProps.className]
    .filter(Boolean)
    .join(' ');

  const finalInputProps = {
    id,
    ...inputProps,
    className: inputClassName,
  };

  if (!multiline) {
    finalInputProps.type = finalType;
  }

  const controlClassName = [
    'input-field__control',
    icon ? 'input-field__control--with-icon' : '',
    isPasswordField && showPasswordToggle ? 'input-field__control--with-action' : '',
    multiline ? 'input-field__control--multiline' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-field" {...rest}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <div className={controlClassName}>
        {icon && (
          <span aria-hidden="true" className="input-field__icon">
            {icon}
          </span>
        )}
        <InputComponent {...finalInputProps} />
        {isPasswordField && showPasswordToggle && (
          <button
            type="button"
            className="input-field__action"
            onClick={handleToggleVisibility}
            aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <span aria-hidden="true" className="material-symbols-outlined">
              {isPasswordVisible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
      {hint && <p className="input-field__hint">{hint}</p>}
    </div>
  );
}
