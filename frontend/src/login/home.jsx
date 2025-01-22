import {React} from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  useEffect(() => {
    // Effacer le localStorage lorsque l'utilisateur arrive sur la page d'accueil
    localStorage.removeItem('adminId');  // Exemple pour supprimer un ID utilisateur
   }, []);
  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="position-relative " style={{ height: "500px", backgroundColor:"rgb(175, 76, 127)" }}>
        <div className="position-absolute w-100 h-100">
          <img
            src="https://via.placeholder.com/1920x1080"
            alt="Enterprise hero"
            className="w-100 h-100 object-fit-cover opacity-50"
          />
        </div>
        <div className="position-relative d-flex align-items-center justify-content-center h-100">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bold mb-3">Entreprise XYZ</h1>
            <p className="fs-4">Solutions innovantes pour votre business</p>
             <Link to="/signin" className="btn  mt-3" style={{ color :"rgb(175, 76, 127)" , backgroundColor:"white" , border:"1px solid rgb(175, 76, 127)" }}>
      Sign in
    </Link>       
        </div> 
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center fw-bold mb-4">À Propos de Nous</h2>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://via.placeholder.com/600x400"
                alt="About us"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <p className="text-muted">
                Depuis plus de 10 ans, notre entreprise s'engage à fournir des services
                de haute qualité à nos clients. Notre mission est de créer de la valeur
                durable tout en maintenant les plus hauts standards d'excellence.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-4">Nos Services</h2>
          <Row>
            {[
              { title: "Service 1", description: "Description détaillée du service 1" },
              { title: "Service 2", description: "Description détaillée du service 2" },
              { title: "Service 3", description: "Description détaillée du service 3" },
            ].map((service, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title className="mb-3">{service.title}</Card.Title>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Location Section */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center fw-bold mb-4">Notre Localisation</h2>
          <Row>
            <Col md={6}>
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
                <span className="fs-1">📍</span>
              </div>
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-center">
              <h3 className="fw-bold mb-3">Adresse</h3>
              <p className="text-muted">
                123 Rue Exemple<br />
                75000 Paris, France
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-4">Contactez-Nous</h2>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3">📞</span>
                  <p className="mb-0">+33 1 23 45 67 89</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3">✉️</span>
                  <p className="mb-0">contact@entreprise.com</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3">📍</span>
                  <p className="mb-0">123 Rue Exemple, 75000 Paris</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Votre nom" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Votre email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={4} placeholder="Votre message" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Envoyer
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container className="text-center">
          <p className="mb-0">&copy; 2025 Entreprise XYZ. Tous droits réservés.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
