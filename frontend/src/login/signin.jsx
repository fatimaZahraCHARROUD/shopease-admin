import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  <div style={{   margin: "0" }}>
    <style>
      {`
        .form {
          width: 900px;
          margin: 50px auto;
          padding: 0 0 0 20px; 
          border: 1px solid #ccc;
          border-radius: 50px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          background-color: #fff;
        }
        .form h1 {
          text-align: center;
          color: #222;
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
          background-color: rgb(74,138,126); /* Vert émeraude */
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: background-color 0.3s ease-in-out;
        }
        .form button:hover {
          background-color: rgb(56, 102, 93); /* Vert foncé */
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
    <Container>
          <Row className="align-items-center">
            <Col   md={6}>
    
      <h1>Bienvenu à <strong style={{ color:"rgb(74,138,126)"}} >ShopEase </strong></h1><br />
      <form onSubmit={handleSignIn}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {errorMessage && <div className="message error">{errorMessage}</div>}
      {successMessage && <div className="message success">{successMessage}</div>}
    </Col>
    <Col   md={6}>
              <img src="signin.jpg" alt="About us" className="img-fluid" style={{borderRadius:" 0 50px 50px 0", width: "420px", height: "480px" ,marginLeft:"20px" }} />
            </Col>
          </Row>
        </Container>
        </div>
  </div>
);

  
};

export default Signin;
