import React from 'react';
import useAuth from '../../context/AuthProvider.jsx';
import './index.css';
import '../generalStyles/card.css';

const HomeComponent = () => {
  const { auth } = useAuth();

  return (
    <div class="abs-center d-flex justify-content-center align-items-center">
      <div className="col-10 col-sm-8 col-md-9 col-lg-11">
        <div className="card greeting">
          <div className="card-body greeting-text">
            <h2 className="title fw-bold">¡Hola, {auth.user.names}!</h2>
            <h1 className="bigtitle fw-bold">Bienvenid@</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
