import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCommandef = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
  const [commandef, setCommandef] = useState({
    id_fournisseur: "",
    etat: "en attente",
    produits: [],
  });

  const [fournisseurs, setFournisseurs] = useState([]);
  const [produitsFournisseur, setProduitsFournisseur] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});

  //Récupération des fournisseurs
  useEffect(() => {
    axios.get("http://localhost:8800/fournisseur")
      .then((response) => setFournisseurs(response.data))
      .catch((err) => console.error("Erreur récupération fournisseurs:", err));
  }, []);

  //Récupération des produits du fournisseur sélectionné
  const fetchProduitsFournisseur = (fournisseurId) => {
    axios.get(`http://localhost:8800/fournir/${fournisseurId}`)
      .then((response) => setProduitsFournisseur(response.data))
      .catch((err) => console.error("Erreur récupération produits:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommandef((prev) => ({ ...prev, [name]: value }));

    if (name === "id_fournisseur" && value) {
      fetchProduitsFournisseur(value);
      setSelectedProducts({});
    }
  };

  const handleProductSelection = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        selected: !prev[productId]?.selected,
        quantity: prev[productId]?.quantity || 1,
      },
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: parseInt(quantity, 10) || 1,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produitsCommande = Object.entries(selectedProducts)
      .filter(([_, details]) => details.selected)
      .map(([id_produit, details]) => ({
        id_produit,
        quantite: details.quantity,
      }));

    try {
      const response = await axios.post(`http://localhost:8800/commandef`, {
        id_fournisseur: commandef.id_fournisseur,
        etat: commandef.etat,
        produits: produitsCommande,
      });
      console.log("Commande ajoutée avec succès:", response.data);
       navigate('/admin/commandef');
    } catch (err) {
      console.error("Erreur lors de l'ajout de la commande:", err);
    }
  };

  return ( <>
  <style>
    {`
        .form {
            width: 500px;
            margin: 50px auto;
            marginLeft:"180px";
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
        }
        .form h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }
        .form input, .form select {
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
            background-color: rgb(175, 76, 127);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        .form button:hover {
            background-color: rgb(143, 61, 97);
        }
        .products-list {
            margin: 20px 0;
            max-height: 300px;
            overflow-y: auto;
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 4px;
        }
        .product-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            padding-left:60px;
            padding-right:200px;
           
            border: 1px solid #eee;
            border-radius: 4px;
        }
        .quantity-input {
            width: 80px !important;
            margin-left: 60px !important;
        }
    `}
  </style>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Nouvelle Commande Fournisseur</h1>

        <select
          name="id_fournisseur"
          value={commandef.id_fournisseur}
          onChange={handleChange}
          required
        >
          <option value="">-- Sélectionnez un fournisseur --</option>
          {fournisseurs.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nomcomplet} - {f.email}
            </option>
          ))}
        </select>

        {commandef.id_fournisseur && (
          <div className="products-list">
            <h3>Produits disponibles :</h3>
            {produitsFournisseur.map((produit) => (
              <div key={produit.id} className="product-item">
                <input
                  type="checkbox"
                  checked={selectedProducts[produit.id]?.selected || false}
                  onChange={() => handleProductSelection(produit.id)}
                />
                <span>
                  <img src={produit.imgurl} alt={produit.nom} width="50" />
                  {produit.nom} - {produit.prix}€
                </span>
                {selectedProducts[produit.id]?.selected && (
                  <input
                    type="number"
                    min="1"
                    value={selectedProducts[produit.id]?.quantity || 1}
                    onChange={(e) => handleQuantityChange(produit.id, e.target.value)}
                    className="quantity-input"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={
            !commandef.id_fournisseur ||
            !Object.values(selectedProducts).some((p) => p.selected)
          }
        >
          Créer la commande
        </button>
      </form>
    </div></>
  );
};

export default AddCommandef;
