import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/signin', {
        email,
        password,
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        
        if (response.data.idadmin) {
          localStorage.setItem("adminId", response.data.idadmin);
        }  

        // Redirection si nécessaire
        window.location.href = response.data.redirectUrl;
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
      setSuccessMessage('');
    }
  };

  return (
    <>
      <style>
        {`
          .form {
              width: 300px;
              margin: 50px auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              font-family: Arial, sans-serif;
          }
          .form h1 {
              text-align: center;
              color: #333;
              margin-bottom: 20px;
          }
          .form input {
              width: 100%;
              padding: 10px;
              margin: 10px 0;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
          }
          .form button {
              width: 100%;
              padding: 10px;
              background-color: rgb(175, 76, 127);
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
          }
          .form button:hover {
              background-color: rgb(160, 69, 108);
          }
          .message {
              margin-top: 10px;
              text-align: center;
          }
          .error {
              color: red;
          }
          .success {
              color: green;
          }
        `}
      </style>
      <div className="form">
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        {errorMessage && <div className="message error">{errorMessage}</div>}
        {successMessage && <div className="message success">{successMessage}</div>}
      </div>
    </>
  );
};

export default Signin;
