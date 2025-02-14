import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  useEffect(() => {
    localStorage.removeItem('adminId');  // Effacer le localStorage lorsque l'utilisateur arrive sur la page d'accueil
  }, []);

  return (
    <div className="min-vh-100">
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <Container>
          <Link className="navbar-brand text-dark" to="/">ShopEase</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#mobile">Mobile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#location">Localisation</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">À propos</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{ borderRadius:"15px", backgroundColor:"black", color:"white" }}>Se connecter</Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav><hr/>

      {/* About Us Section */}
      <section id="about" className="py-5 bg-white mb-6">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={8}>
              <h1>Bienvenue chez <span style={{color:"gray"}}>ShopEase</span></h1>
              <h4 className="text-muted">Votre partenaire de confiance pour une expérience d'achat en ligne exceptionnelle</h4>
              <p className="text-muted">
                Depuis plus de 10 ans, notre entreprise ShopEase s'engage à fournir des services de haute qualité à nos clients. 
                Notre mission est de créer de la valeur durable tout en maintenant les plus hauts standards d'excellence...
              </p>
            </Col>
            <Col xs={12} md={4}>
              <img src="shopease_logo.png" alt="About us" className="img-fluid" style={{ maxWidth: "100%", height: "auto" }} />
            </Col>
          </Row>
        </Container>
      </section><br/><br/><br/> 

      {/* Services Section */}
      <section id="services" className="py-5 bg-gray" style={{backgroundColor:"rgb(245, 244, 244)"}}>
        <Container>
          <h2 className="text-center fw-bold mb-4" style={{color:"black"}}>Nos Services</h2>
          <Row>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="h-100 shadow pt-3">
                <Card.Img variant="top" src="app_mobile_service.png" style={{ height: "200px", width: "150px", objectFit: "cover", display: "block", margin: "auto" }} alt="Service 1" />
                <Card.Body>
                  <Card.Title>Application mobile</Card.Title>
                  <Card.Text className="text-muted">Profitez de notre application mobile pour commander, suivre vos livraisons et accéder à des offres exclusives</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="h-100 shadow pt-3">
                <Card.Img variant="top" src="quic_delivry_service.png" style={{ height: "200px", width: "300px", objectFit: "cover", display: "block", margin: "auto" }} alt="Service 2" />
                <Card.Body>
                  <Card.Title>Livraison rapide</Card.Title>
                  <Card.Text className="text-muted">Recevez vos commandes en un temps record grâce à notre service de livraison express.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="h-100 shadow pt-3">
                <Card.Img variant="top" src="intro3.png" style={{ height: "200px", width: "200px", objectFit: "cover", display: "block", margin: "auto" }} alt="Service 3" />
                <Card.Body>
                  <Card.Title>Paiement à la livraison</Card.Title>
                  <Card.Text className="text-muted">Payez uniquement lorsque vous recevez votre commande, sans risque.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container><br/><br/><br/>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="py-5 bg-white">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={8}>
              <h2 className="fw-bold text-dark">Découvrez notre application mobile</h2>
              <p className="text-muted">
                ShopEase vous offre une expérience d'achat fluide et rapide grâce à notre application mobile.
              </p>
              <h5 className="fw-bold">Fonctionnalités principales :</h5>
              <ul className="list-unstyled">
                <li>🛒 Accédez à un large choix de produits</li>
                <li>🔍 Recherche et filtres avancés pour trouver vos articles rapidement</li>
                <li>💳 Paiement à la livraison</li>
                <li>⏱️ Achetez où et quand vous voulez</li>
              </ul>
            </Col>

            <Col xs={12} md={4} className="text-center">
              <img src="app_mobile_white.png" alt="Application mobile" className="img-fluid" style={{ maxWidth: "100%", borderRadius: "10px" }} />
            </Col>
          </Row>
        </Container><br/>
      </section>

      {/* Location Section */}
      <section id="location" className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-4">Notre Localisation</h2>
          <Row>
            <p className="text-muted">123 Rue Exemple, 75000 Paris, France</p>
            <div className="bg-light rounded overflow-hidden" style={{ height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d13568.049981441294!2d-2.9930716481226547!3d35.011546099688196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sentreprise%20product!5e0!3m2!1sar!2sma!4v1739545528452!5m2!1sar!2sma"
                title="Localisation"
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen
              ></iframe>
            </div>
          </Row>
        </Container><br/><br/>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <h5>Contact</h5>
              <p>Email: contact@entreprisexyz.com</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
              <p>Adresse: 123 Rue Principale, Paris, France</p>
            </Col>
            <Col xs={12} md={4}>
              <h5>Liens rapides</h5>
              <ul className="list-unstyled">
                <li><a href="#services" className="text-white">Services</a></li>
                <li><a href="#mobile" className="text-white">Mobile</a></li>
                <li><a href="#about" className="text-white">À propos</a></li>
              </ul>
            </Col>
            <Col xs={12} md={4}>
              <h5>Adresse</h5>
              <p>ShopEase</p>
              <p>123 Rue Principale</p>
              <p>75000 Paris, France</p>
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col>
              <p className="mb-0">&copy; 2025 ShopEase. Tous droits réservés.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
