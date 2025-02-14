import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  // Fonction pour supprimer un produit
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        const response = await axios.delete(`http://localhost:8800/api/products/${id}`);
        alert(response.data.message);
        fetchProducts(); // Recharger les produits après suppression
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  // Filtrer les produits selon la recherche
  const filteredProducts = products.filter((product) =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

   // Fonction pour gérer l'affichage du dropdown
    const [activeDropdown, setActiveDropdown] = useState(null); // Gestion de l'élément actif du dropdown
  
    const toggleDropdown = (factureId) => {
      if (activeDropdown === factureId) {
        setActiveDropdown(null); // Fermer le dropdown si on clique dessus à nouveau
      } else {
        setActiveDropdown(factureId); // Ouvrir le dropdown correspondant
      }
    };
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>

        <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black", marginTop:"20px" }}>
          Liste des produits
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "80px" }}>
          <button
            className="btn"
            style={{ backgroundColor: "white", color: "black" }}
            onClick={() => navigate("/admin/add_produit")}
          >
            Ajouter un produit
          </button>
          {/* Champ de recherche */}
          <div className="input-group" style={{ width: "360px" }}>
            <span className="input-group-text">
              <i className="fa fa-search"></i> {/* Icône FontAwesome */}
            </span>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control py-2"
            />
          </div>

        </div>
        <table className="table  shadow  " style={{border:"1px solid rgb(237, 237, 237)" }}>
        <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix Unitaire</th>
              <th>Quantité</th>
              <th>Catégorie</th>
              <th>Dépôt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
  {/* Menu déroulant avec trois points */}
  <div className="dropdown" style={{ marginRight: "40px" }}>
    <button
      className="btn btn-secondary"
      type="button"
      onClick={() => toggleDropdown(product.id)} // Toggle du dropdown
      style={{
        padding: "5px 10px",
        minWidth: "35px", // Ajuste la largeur du bouton
      }}
    >
      ⋮
    </button>

    {/* Liste déroulante */}
    {activeDropdown === product.id && (
      <ul
        className="dropdown-menu show"
        aria-labelledby={`dropdownMenuButton-${product.id}`}
        style={{
          minWidth: "10px", // Ajuster la largeur du menu déroulant
          marginRight: "10px",  // Enlever toute marge droite indésirable
          padding: "0", // Enlever le padding inutile
        }}
      >
        <li> 
          <a
            className="dropdown-item"
            onClick={() => navigate(`/admin/update_produit/${product.id}`)}
            style={{ cursor :"pointer" , padding: "10px 15px" }}
          >
            Modifier
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => handleDelete(product.id)}
            style={{ cursor :"pointer" , padding: "10px 15px" }}
          >
            Supprimer
          </a>
        </li>
      </ul>
    )}
  </div>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default Product;
