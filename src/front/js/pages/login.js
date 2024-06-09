import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {store, actions} = useContext(Context);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { email, password };
    actions.login(dataToSend)
    };

  return (
    <div className="container mt-5">
        {store.auth === true ? <Navigate to="/Demo"/>: <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">
                Iniciar sesión
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-success mt-5">
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>}
      
    </div>
  );
};

export default Login;