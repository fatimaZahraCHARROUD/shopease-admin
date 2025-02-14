import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

const Depot = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [depots, setDepots] = useState([]);
  const [adresse, setAdresse] = useState("");
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetchDepots();
  }, []);

  // Récupérer la liste des dépôts
  const fetchDepots = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/depot");
      setDepots(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des dépôts :", error);
    }
  };

  // Ajouter ou modifier un dépôt
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adresse.trim()) {
      alert("Le champ adresse est obligatoire !");
      return;
    }

    try {
      if (id) {
        await axios.put(`http://localhost:8800/api/depot/${id}`, { adresse });
        alert("Dépôt modifié avec succès !");
      } else {
        await axios.post(`http://localhost:8800/api/depot`, { adresse });
        alert("Dépôt ajouté avec succès !");
      }

      setAdresse("");
      setId(null);
      fetchDepots();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification :", error);
      alert("Une erreur est survenue lors de l'ajout ou de la modification.");
    }
  };

  // Pré-remplir le formulaire lors de la modification
  const handleEdit = (depot) => {
    setAdresse(depot.adresse);
    setId(depot.id);
  };

  // Supprimer un dépôt
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?")) {
      try {
        await axios.delete(`http://localhost:8800/api/depot/${id}`);
        alert("Dépôt supprimé avec succès !");
        fetchDepots();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  // Filtrer les dépôts selon la recherche
  const filteredDepots = depots.filter((depot) =>
    depot.adresse.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black", marginTop: "20px", marginBottom: "80px" }}> Gestion des Dépôts
        </h1>

        {/* Conteneur pour aligner le bouton et l'input de recherche */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          {/* Formulaire d'ajout/modification */}
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", width: "100%" }}>
            <input
              type="text"
              placeholder="Adresse du dépôt..."
              className="form-control"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
              style={{ maxWidth: "300px" }}
            />
            <button type="submit" className="btn" style={{ backgroundColor: "white", color: "black" }}>
              {id ? "Modifier" : "Ajouter"}
            </button>
          </form>

          {/* Champ de recherche aligné à droite */}
          <div className="input-group" style={{ width: "360px" }}>
            <span className="input-group-text">
              <i className="fa fa-search"></i> {/* Icône FontAwesome */}
            </span>
            <input
              type="text"
              placeholder="Rechercher un dépôt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Tableau des dépôts */}
        <table className="table  shadow  " style={{border:"1px solid rgb(237, 237, 237)" }}>
        <thead className="table-light">
           <tr>
              <th>ID</th>
              <th>Adresse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepots.length > 0 ? (
              filteredDepots.map((depot) => (
                <tr key={depot.id}>
                  <td>{depot.id}</td>
                  <td>{depot.adresse}</td>
                  <td>
  {/* Menu déroulant avec trois points */}
  <div className="dropdown" style={{ marginRight: "40px" }}>
    <button
      className="btn btn-secondary"
      type="button"
      onClick={() => toggleDropdown(depot.id)} // Toggle du dropdown
      style={{
        padding: "5px 10px",
        minWidth: "35px", // Ajuste la largeur du bouton
      }}
    >
      ⋮
    </button>

    {/* Liste déroulante */}
    {activeDropdown === depot.id && (
      <ul
        className="dropdown-menu show"
        aria-labelledby={`dropdownMenuButton-${depot.id}`}
        style={{
          minWidth: "10px", // Ajuster la largeur du menu déroulant
          marginRight: "10px",  // Enlever toute marge droite indésirable
          padding: "0", // Enlever le padding inutile
        }}
      >
        <li>
          <a
            className="dropdown-item"
            onClick={() => handleEdit(depot)}
            style={{  cursor:"pointer" , padding: "10px 15px" }}
          >
            Modifier
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => handleDelete(depot.id)}
            style={{ cursor:"pointer" , padding: "10px 15px" }}
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
                <td colSpan="3" className="text-center">
                  Aucun dépôt trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Depot;
