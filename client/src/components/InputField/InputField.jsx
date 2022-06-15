import React from 'react';

/**
 * @description General input field to use in forms
 * @param {String} type the input type
 * @param {String} placeholder the input placeholder
 * @param {String} ariaLabel to allow accessibility
 * @param {String} name input identificator
 * @param {String} inputClass custom class names for the input
 * @param {Boolean} required indicates if input is mandatory
 * @param {String} invalidInfo data to present tooltip errors for forms
 * @param {children} children the child view
 * @returns
 */
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
