import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8800/products");
      console.log("Produits récupérées :", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  // Fonction pour supprimer un produit

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        const response = await axios.delete(`http://localhost:8800/products/${id}`);
        alert(response.data.message);
        // Rechargez les produits après suppression
        fetchProducts();
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };


  return (
    <div style={{ marginLeft:"180px" }} className="container mt-5" >
      <h1>Liste des Produits</h1>
      <button
        className="btn  mb-3" style={{ backgroundColor:"rgb(175, 76, 127)", color:"white" }}
        onClick={() => navigate("/admin/add_produit")}
      >
        Ajouter un produit
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix Unitaire</th>
            <th>Quantité</th>
            <th>Catégorie</th>
            <th>depot_id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.imgurl ? (
                  <img
                    src={product.imgurl}
                    alt={product.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "Pas d'image"
                )}
              </td>
              <td>{product.nom}</td>
              <td>{product.description}</td>
              <td>{product.prix} €</td>
              <td>{product.quantite}</td>
              <td>{product.categorie_nom || "Non défini"}</td>
              <td>{product.depot_adresse}</td>
              <td>
                 <button
                  className="btn  me-2" style={{ backgroundColor:"rgb(175, 76, 127)", color:"white" }}
                  onClick={() => navigate(`/admin/update_produit/${product.id}`)}
                >
                  Modifier
                </button> 
                <button
                  className="btn " style={{border:"1px solid rgb(175, 76, 127)", backgroundColor:"white", color:"rgb(175, 76, 127)" }}
                  onClick={() => handleDelete(product.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;