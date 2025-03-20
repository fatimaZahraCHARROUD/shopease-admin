import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Fournisseur = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const [activeDropdown, setActiveDropdown] = useState(null); // Gestion de l'élément actif du dropdown

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/fournisseur");
      setFournisseurs(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des fournisseurs :", err);
    }
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const deleteFournisseur = async (fournisseurId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      try {
        await axios.delete(`http://localhost:8800/api/fournisseur/${fournisseurId}`);
        alert("Fournisseur supprimé avec succès !");
        fetchFournisseurs();
      } catch (err) {
        console.error("Erreur lors de la suppression du fournisseur :", err);
      }
    }
  };

  // Filtrer les fournisseurs selon la recherche
  const filteredFournisseurs = fournisseurs.filter((f) =>
    f.nomcomplet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer l'affichage du dropdown
  const toggleDropdown = (fournisseurId) => {
    if (activeDropdown === fournisseurId) {
      setActiveDropdown(null); // Fermer le dropdown si on clique dessus à nouveau
    } else {
      setActiveDropdown(fournisseurId); // Ouvrir le dropdown correspondant
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
  <div className="input-group" style={{ width: "960px" }}>
    <span className="input-group-text" style={{ color:"white", backgroundColor: "rgb(74,138,126)"}}>
      <i className="fa fa-search"></i> {/* Icône FontAwesome */}
    </span>
    <input
      type="text"
      placeholder="Rechercher un fournisseur..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control py-2"
    />
  </div>

  {/* Bouton Ajouter */}
  <Link
    to="/admin/add_fournisseur"
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
        {/* Tableau des fournisseurs */}
        <table className="table   shadow">
          <thead className="table-light">
            <tr>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Nom</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Email</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Téléphone</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Adresse</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}>Délais</th>
            <th style={{color:" rgb(74,138,126)", backgroundColor:"rgb(206,228,224)"}}> </th>
            </tr>
          </thead>
          <tbody>
            {filteredFournisseurs.length > 0 ? (
              filteredFournisseurs.map((f) => (
                <tr key={f.id}>
                  <td>{f.nomcomplet}</td>
                  <td>{f.email}</td>
                  <td>0{f.tel}</td>
                  <td>{f.adresse}</td>
                  <td>{f.delais} jours</td>
                  <td>
                    {/* Menu déroulant avec trois points */}
                    <div className="dropdown" style={{ marginRight: "40px" }}>
                      <button
                        className="btn  "
                        type="button"
                        onClick={() => toggleDropdown(f.id)} // Toggle du dropdown
                        style={{
                          padding: "5px 10px",
                          minWidth: "35px", // Ajuste la largeur du bouton
                        }}
                      >
                        ⋮
                      </button>

                      {/* Liste déroulante */}
                      {activeDropdown === f.id && (
                        <ul
                          className="dropdown-menu show"
                          aria-labelledby={`dropdownMenuButton-${f.id}`}
                          style={{
                            minWidth: "10px", // Ajuster la largeur du menu déroulant
                            marginRight: "10px",  // Enlever toute marge droite indésirable
                            padding: "0", // Enlever le padding inutile
                          }}
                        >
                          <li>
                            <Link
                              to={`/admin/update_fournisseur/${f.id}`}
                              className="dropdown-item"
                              style={{ padding: "10px 15px" }}
                            >
                              Modifier
                            </Link>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() => deleteFournisseur(f.id)}
                              style={{ cursor:"pointer" ,padding: "10px 15px" }}
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
                <td colSpan="5" className="text-center">
                  Aucun fournisseur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div> </div>
    </div>
  );
};

export default Fournisseur;
