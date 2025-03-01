import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  useEffect(() => {
    localStorage.removeItem('adminId');  // Effacer le localStorage lorsque l'utilisateur arrive sur la page d'accueil
  }, []);

  return (
    <div className="min-vh-100" style={{ backgroundColor:"rgb(246,246,244)"}}>
      
      {/* Navbar */}
      <nav style={{ color:"rgb(74,138,126) "}} className="navbar navbar-expand-lg navbar-light   py-3">
        <Container>
          <Link className="navbar-brand text-dark" to="/"><h1 style={{color:"rgb(223,212,171) " }}>ShopEase</h1></Link>
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
                <Link className="nav-link" to="/signin" style={{ borderRadius:"15px", backgroundColor:"rgb(74,138,126)", color:"white" }}>Se connecter</Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav><hr/>

      {/* About Us Section */}
      <section id="about" className="py-3   mb-6"
      style={{ backgroundColor: "rgb(246,246,244)"}}
      
      >
        <Container>
          <Row className="align-items-center">
            <Col   md={7}>
              <h1>Bienvenue chez <span style={{color:"rgb(74,138,126)"}}>ShopEase</span></h1>
              <h4 className="text-muted">Votre partenaire de confiance pour une expérience d'achat en ligne exceptionnelle</h4>
              <p className="text-muted">
                Depuis plus de 10 ans, notre entreprise ShopEase s'engage à fournir des services de haute qualité à nos clients. 
                Notre mission est de créer de la valeur durable tout en maintenant les plus hauts standards d'excellence...
              </p> 
            </Col>
            <Col   md={5}>
              <img src="bg.jpg" alt="About us" className="img-fluid" style={{ width: "300px", height: "400px" }} />
            </Col>
          </Row>
        </Container>
      </section><br/><br/><br/> 



      <section id="services" className="py-5 bg-gray" style={{ backgroundColor: "rgb(246,246,244)" }}>
  <Container>
    <h2 className="text-center fw-bold mb-4" style={{ color: "rgb(74,138,126)" }}>Nos Services</h2>
    <Row>
      <Col xs={12} md={8} className="mb-4">
        <Card
          className="h-100 shadow pt-3"
          style={{
            backgroundColor: "rgb(74,138,126)",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Card.Body className="text-white">
            <Card.Title><i className="fas fa-info-circle"></i> Notre service</Card.Title>
            <Card.Text className="text-white">
              Nous vous offrons la meilleure expérience d'achat avec des services rapides et fiables. 
              Profitez de notre expertise pour un shopping en toute sérénité !
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-4">
        <Card
          className="h-100 shadow pt-3"
          style={{
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Card.Body>
            <Card.Title><i className="fas fa-mobile-alt"></i> Application mobile</Card.Title>
            <Card.Text className="text-muted">
              Commandez facilement via notre application mobile et suivez vos livraisons en temps réel.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      {[
        { icon: "fas fa-shipping-fast", title: "Livraison rapide", text: "Recevez vos commandes en un temps record grâce à notre service de livraison express." },
        { icon: "fas fa-hand-holding-usd", title: "Paiement à la livraison", text: "Payez uniquement lorsque vous recevez votre commande, sans risque." },
        { icon: "fas fa-star", title: "Meilleurs produits", text: "Nous sélectionnons les meilleurs produits pour vous garantir qualité et satisfaction." },
      ].map((service, index) => (
        <Col key={index} xs={12} sm={6} md={4} className="mb-4">
          <Card
            className="h-100 shadow pt-3"
            style={{
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Card.Body>
              <Card.Title><i className={service.icon}></i> {service.title}</Card.Title>
              <Card.Text className="text-muted">{service.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
 
<br/><br/><br/>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="py-5 " style={{ backgroundColor: "rgb(246,246,244)"}}>
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
      <section id="location" className="py-5 " style={{ backgroundColor: "rgb(246,246,244)"}}>
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
