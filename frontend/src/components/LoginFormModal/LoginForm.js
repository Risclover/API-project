import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.replace("/");

    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).then(() => setShowModal(false));
  };

  return (
    <div className="loginform-container">
      <div className="loginform-header">
        <i className="fa-solid fa-xmark"></i>
        <p>Log in</p>
        <div></div>
      </div>
      <div className="loginform-content">
        <h1 className="loginform-title">Welcome to Airbnbeezy</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

          <input
            className="loginform-input-under"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
          <button onClick={handleDemo}>Demo Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
