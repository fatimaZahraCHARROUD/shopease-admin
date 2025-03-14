import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCommandef = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
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

  useEffect(() => {
    axios.get("http://localhost:8800/api/fournisseur")
      .then((response) => setFournisseurs(response.data))
      .catch((err) => console.error("Erreur récupération fournisseurs:", err));
  }, []);

  const fetchProduitsFournisseur = (fournisseurId) => {
    axios.get(`http://localhost:8800/api/fournir/${fournisseurId}`)
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
      await axios.post(`http://localhost:8800/api/commandef`, {
        id_fournisseur: commandef.id_fournisseur,
        etat: commandef.etat,
        produits: produitsCommande,
      });
      alert("Commande ajoutée avec succès !");
      navigate('/admin/commandef');
    } catch (err) {
      console.error("Erreur lors de l'ajout de la commande:", err);
    }
  };

  return (     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
    <div style={{
      width: "100%",
      maxWidth: "600px", // Largeur max du formulaire
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Ajoutez une Commande Fournisseur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Fournisseur</label>
            <select
              name="id_fournisseur"
              className="form-control"
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
          </div>

          {commandef.id_fournisseur && (
            <div className="mb-3">
              <h4>Produits disponibles</h4>
              <div style={{
                maxHeight: "250px",
                overflowY: "auto",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9"
              }}>
                {produitsFournisseur.map((produit) => (
                  <div key={produit.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #ddd"
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedProducts[produit.id]?.selected || false}
                      onChange={() => handleProductSelection(produit.id)}
                    />
                    <span style={{ flex: 1, marginLeft: "10px" }}>
                      <img src={produit.imgurl} alt={produit.nom} width="40" style={{ marginRight: "10px" }} />
                      {produit.nom} - {produit.prix} DH
                    </span>
                    {selectedProducts[produit.id]?.selected && (
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        style={{ width: "70px", textAlign: "center" }}
                        value={selectedProducts[produit.id]?.quantity || 1}
                        onChange={(e) => handleQuantityChange(produit.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn w-100  "
            style={{   backgroundColor: "rgb(74,138,126)", color: "white", fontWeight: "bold" }}
            disabled={
              !commandef.id_fournisseur ||
              !Object.values(selectedProducts).some((p) => p.selected)
            }
          >
            Créer la commande
          </button>
        </form>
      </div>
    </div> 
  );
};

export default AddCommandef;
