import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Details_cc = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const { id } = useParams();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/produit_cc/${id}`);
        setProduits(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    };

    fetchProduits();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 ">Détails des produits pour la commande {id}</h2>

      {produits.length > 0 ? (
        <div className="row my-5">
          {produits.map((produit) => (
            <div key={produit.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img 
                  src={produit.imgurl || '/default-image.jpg'} 
                  className="card-img-top"
                  alt={produit.nom}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-dark">{produit.nom}</h5>
                  <p className="card-text text-muted">{produit.description}</p>
                  <p><strong>Prix:</strong> {produit.prix}€</p>
                  <p><strong>Quantité:</strong> {produit.quantite_commande}</p>
                  <p><strong>Catégorie:</strong> {produit.categorie}</p>
                  <p><strong>Dépôt:</strong> {produit.depot}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">Aucun produit trouvé pour cette commande.</p>
      )}
    </div>
  );
};

export default Details_cc;
