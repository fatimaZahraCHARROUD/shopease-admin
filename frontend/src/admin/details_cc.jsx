import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const Details_cc = () => {
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
        const response = await axios.get(`http://localhost:8800/api/produit_cc/${id}`);
        setProduits(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
      }
    };
    fetchProduits();
  }, [id]);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
    <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>
      <h1 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold" }}>
        Détails des Produits - Commande #{id}
      </h1>

    

      {/* Table des produits */}
      <div className="table-responsive">
        {produits.length > 0 ? (
          <table className="table shadow">
            <thead className="table-light">
              <tr>
              <th>Image</th>

                <th>Nom du produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Catégorie</th>
                <th>Dépôt</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit.id}>
                    <td>
                    <img
                      src={produit.imgurl || '/default-image.jpg'}
                      alt={produit.nom}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{produit.nom}</td>
                  <td>{produit.prix} DH</td>
                  <td>{produit.quantite_commande}</td>
                  <td>{produit.categorie}</td>
                  <td>{produit.depot}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center" style={{ color: "#888" }}>
            Aucun produit trouvé pour cette commande.
          </p>
        )}
      </div>
    </div></div>
  );
};

export default Details_cc;
