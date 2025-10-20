import React from 'react';

export default function InputField({
  id,
  label,
  hint,
  type = 'text',
  multiline = false,
  inputProps = {},
  ...rest
}) {
  const InputComponent = multiline ? 'textarea' : 'input';
  return (
    <div className="input-field" {...rest}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <InputComponent id={id} type={multiline ? undefined : type} {...inputProps} />
      {hint && <p className="input-field__hint">{hint}</p>}
    </div>
  );
}
