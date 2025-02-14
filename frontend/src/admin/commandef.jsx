import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Commandef = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [commandef, setCommandef] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetchCommandef();
  }, []);

  const fetchCommandef = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/commandef");
      setCommandef(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes :", err);
    }
  };

  const deleteCommandef = async (commandeId) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande fournisseur ?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8800/api/commandef/${commandeId}`);
        alert("Commande fournisseur supprimée avec succès !");
        fetchCommandef();
      } catch (err) {
        console.error("Erreur lors de la suppression de la commande :", err);
      }
    }
  };
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
      <h1 style={{ fontWeight: "bold", textAlign: "center", color: "black",marginTop:"20px" }}>Gestion des Commandes Fournisseurs</h1>
      <div className="d-flex justify-content-between mb-3 my-5">
        <Link to="/admin/add_commandef" className="btn text-black" style={{ backgroundColor: "white" , color:"black" }}>
          Ajouter une Commande
        </Link>
      </div>
      <table className="table table-bordered shadow">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Date d'Envoi</th>
            <th>Date Possible Réception</th>
            <th>Date Réception</th>
            <th>État</th>
            <th>Fournisseur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandef.length > 0 ? (
            commandef.map((commande) => (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>{new Date(commande.date).toLocaleDateString('fr-FR')}</td>
                <td>{commande.date_possible ? new Date(commande.date_possible).toLocaleDateString('fr-FR') : "-"}</td>
                <td>{commande.date_reçue ? new Date(commande.date_reçue).toLocaleDateString('fr-FR') : "-"}</td>
                <td>
                  <span className={`badge ${commande.etat === "reçue" ? "bg-success" : "bg-warning"}`}>
                    {commande.etat}
                  </span>
                </td>
                <td>{commande.nomcomplet} - {commande.email}</td>
                <td>
  {/* Menu déroulant avec trois points */}
  <div className="dropdown" style={{ marginRight: "40px" }}>
    <button
      className="btn btn-sm btn-outline-secondary"
      type="button"
      onClick={() => toggleDropdown(commande.id)} // Toggle du dropdown
      style={{
        padding: "5px 10px",
        minWidth: "35px", // Ajuste la largeur du bouton
      }}
    >
      ⋮
    </button>

    {/* Liste déroulante */}
    {activeDropdown === commande.id && (
      <ul
        className="dropdown-menu show"
        aria-labelledby={`dropdownMenuButton-${commande.id}`}
        style={{
          minWidth: "10px", // Ajuster la largeur du menu déroulant
          marginRight: "10px",  // Enlever toute marge droite indésirable
          padding: "0", // Enlever le padding inutile
        }}
      >
        <li>
          <Link
            to={`/admin/produit_cf/${commande.id}`}
            className="dropdown-item"
            style={{ padding: "10px 15px" }}
          >
            Détails
          </Link>
        </li>
        <li>
          <Link
            to={`/admin/facture`}
            className="dropdown-item"
            style={{ padding: "10px 15px" }}
          >
            Voir Facture
          </Link>
        </li>
        {commande.etat !== 'reçue' && (
          <li>
            <Link
              to={`/admin/update_commandef/${commande.id}`}
              className="dropdown-item"
              style={{ padding: "10px 15px" }}
            >
              Modifier
            </Link>
          </li>
        )}
        <li>
          <a
            className="dropdown-item"
            onClick={() => deleteCommandef(commande.id)}
            style={{ padding: "10px 15px" }}
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
              <td colSpan="7" className="text-center text-muted">Aucune commande trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Commandef;
