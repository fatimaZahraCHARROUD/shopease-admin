import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/signin');
      }
    }, [userId, navigate]);
    
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [depots, setDepots] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState("");


  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchDepots();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/categorie");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/fournisseur");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des fournisseurs :", error);
    }
  };

  const fetchDepots = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/depot");
      setDepots(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des dépôts :", error);
    }
  };

  const handleSupplierChange = (supplierId) => {
    setSelectedSuppliers((prev) =>
      prev.includes(supplierId)
        ? prev.filter((id) => id !== supplierId) // Uncheck
        : [...prev, supplierId] // Check
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/products", {
        name,
        description,
        price,
        quantity,
        categoryId,
        imgurl,
        suppliers: selectedSuppliers,
        depotId: selectedDepot,
      });
      resetForm();
      alert("Produit ajouté avec succès !");
      navigate("/admin/produit");
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
    setImgurl("");
    setSelectedSuppliers([]);
    setSelectedDepot("");
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
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          Ajouter un Produit
        </h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setImgurl(e.target.value)}
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
            <div>
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`supplier-${supplier.id}`}
                    value={supplier.id}
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={() => handleSupplierChange(supplier.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`supplier-${supplier.id}`}
                  >
                    {supplier.nomcomplet} - {supplier.email}
                  </label>
                </div>
              ))}
            </div>
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
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "rgb(74,138,126)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Ajouter
          </button>
        </form>
      </div>
    </div> 
  );
};

export default AddProduct;
