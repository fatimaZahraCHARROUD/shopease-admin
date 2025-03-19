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
    //Dans le cas des formulaires, cela empêche l'envoi du formulaire au serveur, ce qui permet de traiter les données avec JavaScript sans rafraîchir la page.
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

        window.location.href = response.data.redirectUrl;
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="signin-container">
      <div className="background-image"></div>
      <div className="overlay">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={5}>
              <Card className="p-4">
                <h1 className="title">Bienvenue à <span style={{ color: "rgb(74,138,126)" }}>ShopEase</span></h1>
                <form onSubmit={handleSignIn}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entrez votre email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      required
                    />
                  </div>
                  <button type="submit" className="btn w-100" style={{ color: "white", backgroundColor: "rgb(74,138,126)" }}>
                    Se connecter
                  </button>
                </form>
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <style>
        {`
          .signin-container {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            overflow: hidden;
          }
          .background-image {
            position: absolute;
            width: 100%;
            height: 100%;
            background: url('signwalp.jpg') no-repeat center center/cover;
            filter: blur(3px);
            z-index: -1;
          }
          .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
          .title {
            text-align: left;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .form-label {
            font-weight: 600;
            text-align: left;
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default Signin;