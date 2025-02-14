import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const Details_cf = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/produit_cf/${id}`);
        setProduits(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
      }
    };
    fetchProduits();
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold" }}>
        Détails des Produits - Commande #{id}
      </h1>

      <div className="text-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="btn"
          style={{ backgroundColor: "#289dd2", color: "white", fontWeight: "bold" }}
        >
          Retour aux commandes
        </button>
      </div>

      <div className="row">
        {produits.length > 0 ? (
          produits.map((produit) => (
            <div key={produit.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={produit.imgurl || '/default-image.jpg'}
                  alt={produit.nom}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>
                    {produit.nom}
                  </h5>
                  <p className="card-text"><strong>Prix :</strong> {produit.prix}€</p>
                  <p className="card-text"><strong>Quantité :</strong> {produit.quantite_commande}</p>
                  <p className="card-text"><strong>Catégorie :</strong> {produit.categorie}</p>
                  <p className="card-text"><strong>Dépôt :</strong> {produit.depot}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center" style={{ color: "#888" }}>
            Aucun produit trouvé pour cette commande.
          </p>
        )}
      </div>
    </div>
  );
};

export default Details_cf;
