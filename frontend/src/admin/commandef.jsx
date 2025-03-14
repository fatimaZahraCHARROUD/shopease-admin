import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Commandef = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const [commandef, setCommandef] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker l'ID recherché

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

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (factureId) => {
    setActiveDropdown(activeDropdown === factureId ? null : factureId);
  };

  // 🔎 Filtrage des commandes par ID recherché
  const filteredCommandes = commandef.filter((commande) =>
    searchTerm === "" || commande.id.toString().includes(searchTerm)
  );

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
        ><br/><div className="input-group" style={{ width: "950px" }}>
            <span className="input-group-text" style={{ color: "white", backgroundColor: "rgb(74,138,126)" }}>
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Rechercher par ID de commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control py-2"
            />
          </div>

          {/* Bouton Ajouter */}
          <Link to="/admin/add_commandef" className="btn" style={{ backgroundColor: "white", color: "rgb(74,138,126)", fontSize: "20px", padding: "5px 15px", borderRadius: "5px", marginRight: "10px" }}>
            +
          </Link>
        </div>
        <div style={{ 
      overflowX: "auto", 
      maxWidth: "100%", 
      boxShadow: "0 0 10px rgba(0,0,0,0.1)" 
    }}>
        {/* Tableau des commandes */}
        <table className="table shadow">
          <thead className="table-light">
            <tr>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>ID</th>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Date d'Envoi</th>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Date Possible Réception</th>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Date Réception</th>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>État</th>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}>Fournisseur</th>
              <th style={{ color: "rgb(74,138,126)", backgroundColor: "rgb(206,228,224)" }}> </th>
            </tr>
          </thead>
          <tbody>
            {filteredCommandes.length > 0 ? (
              filteredCommandes.map((commande) => (
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
                    {/* Menu déroulant */}
                    <div className="dropdown" style={{ marginRight: "40px" }}>
                      <button className="btn" type="button" onClick={() => toggleDropdown(commande.id)} style={{ padding: "5px 10px", minWidth: "35px" }}>
                        ⋮
                      </button>
                      {activeDropdown === commande.id && (
                        <ul className="dropdown-menu show" style={{ minWidth: "10px", marginRight: "10px", padding: "0" }}>
                          <li><Link to={`/admin/produit_cf/${commande.id}`} className="dropdown-item" style={{ padding: "10px 15px" }}>Détails</Link></li>
                          <li><Link to={`/admin/details_facture/${commande.id_facture}`} className="dropdown-item" style={{ padding: "10px 15px" }}>Voir Facture</Link></li>
                          {commande.etat !== 'reçue' && (
                            <li><Link to={`/admin/update_commandef/${commande.id}`} className="dropdown-item" style={{ padding: "10px 15px" }}>Modifier</Link></li>
                          )}
                          <li><a className="dropdown-item" onClick={() => deleteCommandef(commande.id)} style={{ padding: "10px 15px" }}>Supprimer</a></li>
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
    </div></div>
  );
};

export default Commandef;
