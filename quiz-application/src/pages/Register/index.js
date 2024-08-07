import React, { useState } from 'react'
import './style.css'
import { generateToken } from '../../helper/generateToken';
import { createtUser } from '../../services/userService';
const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      id: Date.now(),
      fullName: fullName,
      email: email,
      password: password,
      token: generateToken(20)
    }
    try {
      const response = await createtUser(options);
      if (!response) {
        alert('Tao that bai')
      } else {
        alert('Tao thanh cong')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register Form</h2>
        <input
          type="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="login-input"
        />
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
          Register
        </button>
      </form>
    </div>
  )
}

export default Register