// Login.js
import React, { useEffect, useState } from "react";
import "./style.css"; // Import the CSS file
import { login } from "../../services/userService";
import { setCookie } from "../../helper/cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const account = {
      email: email,
      password: password
    }
    const response = await login(account);
    console.log(response)
    if (response.length > 0) {
      const { id, fullName, token, email } = response[0];
      const time = 1;
      setCookie('id', id, time);
      setCookie('fullName', fullName, time);
      setCookie('token', token, time);
      setCookie('email', email, time);
      console.log('thanh cong')
      navigate('/')
    } else {
      console.log('that bai')
    }

  };

  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Quiz</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>

  );
}

export default Login;
