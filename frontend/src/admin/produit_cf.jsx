import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

const Details_cf = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
  const { id } = useParams(); // Récupère l'ID de la commande depuis l'URL

  const [produits, setProduits] = useState([]); // pour stocker les produits
  
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/produit_cf/${id}`);
        setProduits(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduits();
  }, [id]); // Recharger les produits quand id_cf change

  return (
    <div style={{marginLeft:"180px"}}>
      <h1>Détails des produits pour la commande {id}</h1> {/* Utilisez id_cf ici */}
      
        {produits.length > 0 ? (
          produits.map((produit) => (
            <div key={produit.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Image */}
                <img 
                  src={produit.imgurl || '/default-image.jpg'} // Si produit.img est vide, affiche une image par défaut
                  alt={produit.nom}
                  style={{ width: '100px', height: '100px', marginRight: '15px' }} 
                />
                
                <div>
                  {/* Nom et prix */}
                  <strong>{produit.nom}</strong> - {produit.prix}€
                  <p>Description: {produit.description}</p>
                  <p>Quantité: {produit.quantite_commande}</p>
                  <p>Catégorie: {produit.categorie}</p>
                  <p>Dépôt: {produit.depot}</p>
                </div>
              </div>
              <hr/></div> 
          ))
        ) : (
          <p>Aucun produit trouvé pour cette commande.</p>
        )}
       
    </div>
  );
};

export default Details_cf;
