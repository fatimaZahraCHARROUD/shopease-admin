import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Corriger l'importation de Link

const Add_product = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [depots, setDepots] = useState([]); // Liste des dépôts
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imgurl, setimgurl] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(""); // Dépôt sélectionné

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchDepots();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/categorie`);
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/fournisseur`);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des fournisseurs :", error);
    }
  };

  const fetchDepots = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/depot`);
      setDepots(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des dépôts :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/products`, {
        name,
        description,
        price,
        quantity,
        categoryId,
        imgurl,
        suppliers: selectedSuppliers,
        depotId: selectedDepot, // ID du dépôt sélectionné
      });
      resetForm();
      alert("Produit ajouté avec succès !");
      navigate('/admin/produit');

    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategoryId("");
    setimgurl("");
    setSelectedSuppliers([]);
    setSelectedDepot("");
  };

  return (
    <div style={{ marginLeft:"180px" }} className="container mt-5">
      <h1>Ajouter un Produit</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nom du Produit</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantité</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de l'image</label>
          <input
            type="text"
            className="form-control"
            value={imgurl}
            onChange={(e) => setimgurl(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
            multiple
            className="form-control"
            value={selectedSuppliers}
            onChange={(e) =>
              setSelectedSuppliers(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.nomcomplet} - {supplier.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Dépôt</label>
          <select
            className="form-control"
            value={selectedDepot}
            onChange={(e) => setSelectedDepot(e.target.value)}
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
        <button type="submit" className="btn  " style={{ backgroundColor:"rgb(175, 76, 101)",color:"white"}}>
          Ajouter
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={resetForm}
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default Add_product;