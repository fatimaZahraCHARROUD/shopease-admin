import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Employe = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [employes, setEmployes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null); // Gestion de l'élément actif du dropdown

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  const fetchEmployes = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/employe");
      setEmployes(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des employés :", err);
    }
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

  const deleteEmploye = async (employeId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      try {
        await axios.delete(`http://localhost:8800/api/employe/${employeId}`);
        alert("Employé supprimé avec succès !");
        fetchEmployes();
      } catch (err) {
        console.error("Erreur lors de la suppression de l'employé :", err);
      }
    }
  };

  const filteredEmployes = employes.filter((e) =>
    e.nomcomplet.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div style={{ marginLeft: "300px", padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black",marginTop:"20px" }}>
          Liste des Employés
        </h1>

        {/* Conteneur pour aligner le bouton et l'input de recherche */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px",marginTop:"80px" }}>
          <Link
            to="/admin/add_employe"
            className="btn  "
            style={{ backgroundColor: "white", color: "black" }}
          >
            Ajouter un employé
          </Link>

          <div className="input-group" style={{ width: "360px" }}>
            <span className="input-group-text">
              <i className="fa fa-search"></i> {/* Icône FontAwesome */}
            </span>
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"

            />
          </div>
        </div>

        {/* Tableau des employés */}
        <table className="table shadow">
        <thead className="table-light">
        <tr>
              <th>Nom </th>
              <th>Email</th>
              <th>Mot de passe</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployes.length > 0 ? (
              filteredEmployes.map((e) => (
                <tr key={e.id}>
                  <td>{e.nomcomplet}</td>
                  <td>{e.email}</td>
                  <td>{e.password}</td>
                  <td>{e.adresse}</td>
                  <td>{e.tel}</td>
                  <td>
  {/* Menu déroulant avec trois points */}
  <div className="dropdown" style={{ marginRight: "40px" }}>
    <button
      className="btn btn-secondary"
      type="button"
      onClick={() => toggleDropdown(e.id)} // Toggle du dropdown
      style={{
        padding: "5px 10px",
        minWidth: "35px", // Ajuste la largeur du bouton
      }}
    >
      ⋮
    </button>

    {/* Liste déroulante */}
    {activeDropdown === e.id && (
      <ul
        className="dropdown-menu show"
        aria-labelledby={`dropdownMenuButton-${e.id}`}
        style={{
          minWidth: "10px", // Ajuster la largeur du menu déroulant
          marginRight: "10px",  // Enlever toute marge droite indésirable
          padding: "0", // Enlever le padding inutile
        }}
      >
        <li>
          <Link
            to={`/admin/update_employe/${e.id}`}
            className="dropdown-item"
            style={{ padding: "10px 15px" }}
          >
            Modifier
          </Link>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => deleteEmploye(e.id)}
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
                <td colSpan="6" className="text-center">
                  Aucun employé trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employe;
