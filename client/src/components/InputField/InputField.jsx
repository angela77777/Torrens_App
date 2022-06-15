import React from 'react';

const InputField = ({
  type,
  placeholder,
  ariaLabel,
  name,
  inputClass,
  required,
  invalidInfo,
  children,
}) => {
  return (
    <div className={`form-group ${inputClass}`}>
      <div className="input-group has-validation textfield-group mb-4">
        {children}
        <input
          type={type}
          className={`form-control clear-decorations shadow-none ${
            invalidInfo ? 'is-invalid' : ''
          }`}
          placeholder={placeholder}
          aria-label={ariaLabel}
          name={name}
          required={required}
        />
        {invalidInfo ? (
          <div className="invalid-tooltip">{invalidInfo}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
