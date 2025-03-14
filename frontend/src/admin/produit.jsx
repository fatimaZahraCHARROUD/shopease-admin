import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Product = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();

    useEffect(() => {
      if (!userId) {
        navigate('/signin');
      }
    }, [userId, navigate]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

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
      
      
      
    <div 
      className="content-area"
      style={{ 
        padding: "20px", 
        fontFamily: "Arial",
        marginLeft: "270px",
        transition: "margin-left 0.3s ease"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      ><br/>
{/* Champ de recherche */}
<div className="input-group" style={{ width: "940px" }}>
  <span className="input-group-text" style={{ color:"white", backgroundColor: "rgb(74,138,126)"}}>
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

{/* Bouton Ajouter */}
<Link
  to="/admin/add_produit"
  className="btn"
  style={{marginRight:"10px",
    backgroundColor: "white",
    color: "rgb(74,138,126)",
    fontSize: "20px",
    padding: "5px 15px",
    borderRadius: "5px", // Arrondi léger
  }}
>
  +
</Link>
</div>
<div style={{ 
      overflowX: "auto", 
      maxWidth: "100%", 
      boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
    }}> 

        <table className="table  shadow  " style={{border:"1px solid rgb(237, 237, 237)" }}>
        <thead className="table-light">
            <tr>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Image</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Nom</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Description</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Prix  </th>
             <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Catégorie</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Dépôt</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}> </th>
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
                        style={{  width: '50px', height: '50px'  }}
                      />
                    ) : (
                      "Pas d'image"
                    )}
                  </td>
                  <td>{product.nom}</td>
                  <td>{product.description}</td>
                  <td>{product.prix} DH</td>
                   <td>{product.categorie_nom || "Non défini"}</td>
                  <td>{product.depot_adresse}</td>
                  <td>
  {/* Menu déroulant avec trois points */}
  <div className="dropdown" style={{ marginRight: "40px" }}>
    <button
      className="btn "
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
      </div></div>
    </div>

  );
};

export default Product;
