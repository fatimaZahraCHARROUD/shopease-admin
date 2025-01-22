import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom"; // Corriger l'importation de Link
 
const commandef = () => {
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
    window.location.href="signin";
     // navigate('/signin');
    }
  }, [userId, navigate]);
  const [commandef, setcommandef] = useState([]);
 
  // Récupération des commandes
  const fetchcommandef = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/commandef`);
      setcommandef(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes :", err);
    }
  };

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
 
  useEffect(() => {
   
    fetchcommandef();
   }, []);

   const deletecommandef = async (commandeId) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande fournisseur ?");

if (isConfirmed) {
try {
  await axios.delete(`http://localhost:8800/commandef/${commandeId}`);
       alert("commande fournisseur supprimé avec succès !");
       fetchcommandef(); 
  } catch (err) {
  console.error("Erreur lors de la suppression de commande fournisseur :", err);
}}
};

  return (
    <div style={{marginLeft:"180px", padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
      <h1 style={{ fontWeight: "bold", textAlign: "center", color: "rgb(175, 76, 101)" }}>
        Liste des commandes fournisseurs  
      </h1>
      <Link
                          to="/admin/add_commandef"
                          style={{
                              display: "inline-block",
                              padding: "8px 12px",
                              backgroundColor: "rgb(175, 76, 101)",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "4px",
                              fontWeight: "bold",
                          }}
                      >
                          Ajouter une commande fournisseur
                      </Link> <br/>
      <div className="users" style={{ marginTop: "20px" }}>
        {commandef.length > 0 ? (
          commandef.map((commande) => (
            <div key={commande.id} className="user" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                       <h1 style={{ color: "#666" }}>ID: {commande.id }</h1>

            <p style={{ color: "#666" }}>Date envoyer commande: {new Date(commande.date).toLocaleDateString('fr-FR')}</p>
            <p style={{ color: "#666" }}> Date possible de reçue la commande: {   commande.date_possible    ? new Date(commande.date_possible).toLocaleDateString('fr-FR')     : '-' }</p>
            <p style={{ color: "#666" }}>  Date reçue la commande: { commande.date_reçue   ? new Date(commande.date_reçue).toLocaleDateString('fr-FR')  : '-' }</p>
              <p style={{ color: "#666" }}>Etat : {commande.etat}</p>
              <p style={{ color: "#666" }}>Fournisseur : {commande.nomcomplet} -{commande.email}  </p>

              
                                          <Link
                                         to={`/admin/produit_cf/${commande.id}`}
                                         style={{
                                            
                                           color: "rgb(175, 76, 101)",
                                         }}
                                       >  
                                         plus de details
                                       </Link> <br/>
                                        <Link
                                         to={`/admin/facture`}
                                         style={{
                                            
                                           color: "rgb(175, 76, 101)",
                                         }}
                                       >  
                                         voir facture
                                       </Link> <br/><br/>
                                       {commande.etat !== 'reçue' && (
  <button
    style={{
      marginRight: "10px",
      padding: "8px 12px",
      backgroundColor: "rgb(175, 76, 101)",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    }}
  >
    <Link
      to={`/admin/update_commandef/${commande.id}`}
      style={{
        textDecoration: "none",
        color: "white",
      }}
    >
      Modifier
    </Link>
  </button>
)}

                                                             <button
                        onClick={() => deletecommandef(commande.id)}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "white",
                          color: "rgb(175, 76, 101)",
                          border: "1px solid rgb(175, 76, 101)",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Supprimer
                      </button>
              <hr />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>Aucune commande trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default commandef;
