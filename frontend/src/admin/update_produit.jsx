import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update_product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    imgurl: "",
    id_categorie: "",
    id_depot: "",
  });

  const [categories, setCategories] = useState([]);
  const [depots, setDepots] = useState([]);
  const [fournisseursList, setFournisseursList] = useState([]);
  const [selectedFournisseurs, setSelectedFournisseurs] = useState([]);

  // Récupération des données
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/products/${id}`);
        const product = response.data;

        setProductData({
          nom: product.nom,
          description: product.description,
          prix: product.prix,
          quantite: product.quantite,
          imgurl: product.imgurl,
          id_categorie: product.id_categorie,
          id_depot: product.id_depot,
        });

        setSelectedFournisseurs(product.fournisseurs || []);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/categorie`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    const fetchDepots = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/depot`);
        setDepots(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des dépôts :", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/fournisseur`);
        setFournisseursList(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fournisseurs :", error);
      }
    };

    fetchProduct();
    fetchCategories();
    fetchDepots();
    fetchSuppliers();
  }, [id]);

  // Mise à jour du produit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/products/${id}`, {
        ...productData,
        fournisseurs: selectedFournisseurs,
      });
      alert("Produit modifié avec succès !");
      navigate("/admin/produit");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error);
    }
  };

  // Gestion des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Gestion des fournisseurs sélectionnés
  const handleSupplierChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFournisseurs(selected);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" ,marginLeft:"250px" }}>
    <div className="card p-4 shadow-lg my-4" style={{ width: "800px", borderRadius: "10px", backgroundColor: "white", padding:"40px" }}>
           <h1>Modifier un Produit</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={productData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            className="form-control"
            name="prix"
            value={productData.prix}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantité</label>
          <input
            type="number"
            className="form-control"
            name="quantite"
            value={productData.quantite}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de l'image</label>
          <input
            type="text"
            className="form-control"
            name="imgurl"
            value={productData.imgurl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select
            className="form-control"
            name="id_categorie"
            value={productData.id_categorie}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Fournisseurs</label>
          <select 
            className="form-control"
            multiple
            value={selectedFournisseurs}
            onChange={handleSupplierChange}
          >
            {fournisseursList.map((fournisseur) => (
              <option key={fournisseur.id} value={fournisseur.id}>
                {fournisseur.nomcomplet}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Dépôt</label>
          <select
            className="form-control"
            name="id_depot"
            value={productData.id_depot}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un dépôt</option>
            {depots.map((depot) => (
              <option key={depot.id} value={depot.id}>
                {depot.adresse}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "black", fontSize: "16px", fontWeight: "bold" }}>
            Mettre à jour
          </button>
      </form>
    </div></div>
  );
};

export default Update_product;
