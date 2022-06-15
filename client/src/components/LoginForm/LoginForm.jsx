import React, {useEffect} from 'react';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import useAuth from '../../context/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = (props) => {
  const { auth, authUser, cleanError } = useAuth()
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
  }, [auth])

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements
    authUser(email.value, password.value)
  }

  return (
    <form className="form-container col-11 col-sm-10 col-md-9 col-lg-5" onSubmit={handleSubmit}>
      <div className="col-10 col-lg-8">
        <h3 className="title">INICIO DE SESIÓN</h3>
        <InputField
          type="text"
          placeholder="Correo electrónico"
          ariaLabel="correo"
          name="email"
          invalidInfo={formErrors?.email}
          required={true}
        >
          <div className="input-group-prepend">
            <span className="input-group-text clear-decorations h-100">
              <FontAwesomeIcon icon={faUser} className="primary-color" />
            </span>
          </div>
        </InputField>
        <InputField
          type="password"
          placeholder="Contraseña"
          ariaLabel="contrasena"
          name="password"
          invalidInfo={formErrors?.password}
          required={true}
        >
          <div className="input-group-prepend">
            <span className="input-group-text clear-decorations h-100">
              <FontAwesomeIcon icon={faLock} className="primary-color" />
            </span>
          </div>
        </InputField>
        <button type="submit" className="btn submit-button">
          Iniciar
        </button>
        <div className="d-flex flex-row justify-content-between mt-4">
          <p className="fs-6 m-0 align-self-center">¿No tienes cuenta?</p>
          <Link className="btn secondary-button" to={'/sign-up'}>
            Crea una cuenta
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
