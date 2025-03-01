import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

const Categorie = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer les catégories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/categorie");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  // Redirection pour ajouter une catégorie
  const handleAdd = () => {
    navigate("/admin/add_categorie"); // Redirige vers une page de création
  };

  // Redirection pour modifier une catégorie
  const handleEdit = (category) => {
    navigate(`/admin/update_categorie/${category.id}`, {
      state: { category }, // Passe la catégorie à la page suivante
    });
  };

  // Fonction pour supprimer une catégorie
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`http://localhost:8800/api/categorie/${id}`);
        alert("Catégorie supprimée avec succès !");
        fetchCategories();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  // Filtrer les catégories selon la recherche
  const filteredCategories = categories.filter((category) =>
    category.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer l'affichage du dropdown
  const toggleDropdown = (factureId) => {
    if (activeDropdown === factureId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(factureId);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
         <div style={{ marginLeft: "270px", padding: "20px", fontFamily: "Arial" }}>
            
         <div
     style={{
       display: "flex",
       justifyContent: "space-between", // Aligner à gauche et à droite
       alignItems: "center", // Centrer verticalement
       marginBottom: "10px",
       marginTop: "30px", // Ajuster l'espacement si nécessaire
     marginBottom:"30px",
     }}
   >
     {/* Champ de recherche */}
     <div className="input-group" style={{ width: "960px" }}>
       <span className="input-group-text" style={{ color:"white", backgroundColor: "rgb(74,138,126)"}}>
         <i className="fa fa-search"></i> {/* Icône FontAwesome */}
       </span>
       <input
         type="text"
         placeholder="Rechercher une catégorie..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         className="form-control py-2"
       />
     </div>
   
     {/* Bouton Ajouter */}
     <Link
       to="/admin/add_categorie"
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
   
   

        {/* Tableau des catégories */}
        <table className="table shadow" style={{ border: "1px solid rgb(237, 237, 237)" }}>
          <thead className="table-light">
            <tr>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Image</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Nom</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}></th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <img
                      src={`${category.imgurl}`}
                      alt={`Category ${category.id}`}
                      style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{category.nom}</td>
                  <td>
                    {/* Menu déroulant avec trois points */}
                    <div className="dropdown" style={{ marginRight: "40px" }}>
                      <button
                        className="btn "
                        type="button"
                        onClick={() => toggleDropdown(category.id)}
                        style={{
                          padding: "5px 10px",
                          minWidth: "35px",
                        }}
                      >
                        ⋮
                      </button>

                      {/* Liste déroulante */}
                      {activeDropdown === category.id && (
                        <ul
                          className="dropdown-menu show"
                          aria-labelledby={`dropdownMenuButton-${category.id}`}
                          style={{
                            minWidth: "10px",
                            marginRight: "10px",
                            padding: "0",
                          }}
                        >
                          <li>
                            <a
                              className="dropdown-item"
                               onClick={() => handleEdit(category)}
                              style={{cursor:"pointer" ,  padding: "10px 15px" }}
                            >
                              Modifier
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => handleDelete(category.id)}
                              style={{ cursor:"pointer" , padding: "10px 15px" }}
                            >
                              Supprimer
                            </a>
                          </li>
                          <li>
                            <Link
                              to={`/admin/details_categorie/${category.id}`}
                              className="dropdown-item"
                              style={{ padding: "10px 15px", color: "black" }}
                            >
                              Détails
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Aucune catégorie trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorie;
