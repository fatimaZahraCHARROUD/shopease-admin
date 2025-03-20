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
      <div 
        className="content-area"
        style={{ 
          padding: "20px", 
          fontFamily: "Arial",
          marginLeft: "270px",
          transition: "margin-left 0.3s ease",
          maxWidth: "calc(100% - 270px)"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          <h3 style={{ color: "rgb(74,138,126)" }}>Produits associés</h3>
        </div>
        
        <div style={{ 
          overflowX: "auto", 
          maxWidth: "100%", 
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          borderRadius: "5px"
        }}>
          {produits.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ 
                    color: "rgb(74,138,126)", 
                    backgroundColor: "rgb(206,228,224)",
                    padding: "15px",
                    textAlign: "left" 
                  }}>Image</th>
                  <th style={{ 
                    color: "rgb(74,138,126)", 
                    backgroundColor: "rgb(206,228,224)",
                    padding: "15px",
                    textAlign: "left" 
                  }}>Nom du produit</th>
                  <th style={{ 
                    color: "rgb(74,138,126)", 
                    backgroundColor: "rgb(206,228,224)",
                    padding: "15px",
                    textAlign: "left" 
                  }}>Prix</th>
                  <th style={{ 
                    color: "rgb(74,138,126)", 
                    backgroundColor: "rgb(206,228,224)",
                    padding: "15px",
                    textAlign: "left" 
                  }}>Quantité</th>
                  <th style={{ 
                    color: "rgb(74,138,126)", 
                    backgroundColor: "rgb(206,228,224)",
                    padding: "15px",
                    textAlign: "left" 
                  }}>Catégorie</th>
                  <th style={{ 
                    color: "rgb(74,138,126)", 
                    backgroundColor: "rgb(206,228,224)",
                    padding: "15px",
                    textAlign: "left" 
                  }}>Dépôt</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((produit) => (
                  <tr key={produit.id}>
                    <td style={{ padding: "10px" }}>
                      <img
                        src={produit.imgurl || '/default-image.jpg'}
                        alt={produit.nom}
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    </td>
                    <td style={{ padding: "10px" }}>{produit.nom}</td>
                    <td style={{ padding: "10px" }}>{produit.prix} DH</td>
                    <td style={{ padding: "10px" }}>{produit.quantite_commande}</td>
                    <td style={{ padding: "10px" }}>{produit.categorie}</td>
                    <td style={{ padding: "10px" }}>{produit.depot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ 
              textAlign: "center", 
              padding: "20px",
              color: "#888" 
            }}>
              Aucun produit trouvé pour cette commande.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details_cc;