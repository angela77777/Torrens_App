import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import useAuth from '../../context/AuthProvider';
import { toast } from 'react-toastify';

/**
 * Contains the register needed to create a new user
 * @returns Register Form component
 */
const RegisterForm = () => {
  const { auth, createUser, cleanError } = useAuth()
  const [formErrors, setErrors] = useState({})

  useEffect(() => {
    if (auth.error?.errors != null) {
      let errors = auth.error?.errors
      let formErrorsTemp = {}
      for (let i = 0; i < errors.length; i++) {
        Object.getOwnPropertyNames(errors[i]).forEach(function (val, idx, array) {
          formErrorsTemp[val] = errors[i][val]
        });
      }
      setErrors(formErrorsTemp)
    } else if (auth.error?.message != null) {
      toast.error(auth.error.message, {
        position: toast.POSITION.TOP_CENTER,
        toastId: auth.error.message
      })
      cleanError()
      setErrors({})
    } else {
      setErrors({})
    }
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { names, lastNames, email, password, phone, role } =
      event.target.elements;

    const user = {
      names: names.value,
      lastNames: lastNames.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      role: role.value,
    };
    createUser(user);
  };

  return (
    <form
      className="form-container col-11 col-sm-9 col-md-8 col-lg-6"
      onSubmit={handleSubmit}
    >
      <div className="col-sm-11 col-md-10">
        <h3 className="title">REGISTRO DE USUARIO</h3>
        <div className="row">
          <InputField
            type="text"
            placeholder="Nombres"
            ariaLabel="nombres"
            name="names"
            inputClass="col-md-6"
            invalidInfo={formErrors?.names}
            required={true}
          />
          <InputField
            type="text"
            placeholder="Apellidos"
            ariaLabel="apellidos"
            name="lastNames"
            inputClass="col-md-6"
            invalidInfo={formErrors?.lastNames}
            required={true}
          />
        </div>
        <div className="row">
          <InputField
            type="text"
            placeholder="Correo electrónico"
            ariaLabel="correo"
            name="email"
            inputClass="col-md-6"
            invalidInfo={formErrors?.email}
            required={true}
          />
          <InputField
            type="password"
            placeholder="Contraseña"
            ariaLabel="contrasena"
            name="password"
            inputClass="col-md-6"
            invalidInfo={formErrors?.password}
            required={true}
          />
        </div>
        <div className="row">
          <InputField
            type="text"
            placeholder="Teléfono"
            ariaLabel="telefono"
            name="phone"
            inputClass="col-md-6"
            invalidInfo={formErrors?.phone}
            required={true}
          />
          <div className="form-group col-md-6">
            <div className="input-group textfield-group mb-4">
              <select
                className="form-select clear-outline shadow-none"
                aria-label="Selecciona el rol"
                name="role"
                required
              >
                <option value="standard">Estándar</option>
                <option value="administrator">Administrador</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn submit-button">
          Registrarse
        </button>
        <div className="d-flex flex-row justify-content-center mt-4">
          <p className="fs-6 m-0 align-self-center">¿Ya tienes cuenta?</p>
          <Link className="btn secondary-button ms-4" to={'/'}>
            Inicia sesión
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
