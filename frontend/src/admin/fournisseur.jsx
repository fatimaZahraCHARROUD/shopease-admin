import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";

const Fournisseur = () => { 
  
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
    const [fournisseur, setFournisseur] = useState([]); 
   const fetchFournisseur = async () => { 
      try {
      const response = await axios.get("http://localhost:8800/fournisseur");
            setFournisseur(response.data);
         } catch (err) {
      console.error("Erreur lors de la récupération des fournisseur :", err);
    }
  };
 

  useEffect(() => {
    fetchFournisseur();
 }, []); 

   const deleteFournisseur = async (fournisseurId) => {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce Fournisseur ?");

    if (isConfirmed) {
    try {
      await axios.delete(`http://localhost:8800/fournisseur/${fournisseurId}`);
           alert("Fournisseur supprimé avec succès !");
      fetchFournisseur(); 
      } catch (err) {
      console.error("Erreur lors de la suppression de Fournisseur :", err);
    }}
  };

  return (
    <div style={{marginLeft:"180px", marginLeft:"180px" ,padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
    <h1 style={{ fontWeight:"bold" , textAlign: "center", color: "rgb(175, 76, 101)" }}>Liste des Fournisseur</h1>
    <div className="users" style={{ marginTop: "20px" }}> 
    <Link
                    to="/admin/add_fournisseur"
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
                    Ajouter un fournisseur
                </Link><br/><br/>
     {fournisseur.length > 0 ? (
                 fournisseur.map((f) => (
                   <div key={f.id} className="user" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                    <h2 style={{ color: "#444" }}>Nom : {f.nomcomplet}</h2>
                    <p style={{ color: "#666" }}>Email : {f.email}</p>
                    <p style={{ color: "#666" }}>Tel : {f.tel}</p>
                    <p style={{ color: "#666" }}>Adresse : {f.adresse}</p>

                   
                    <div>
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
                          to={`/admin/update_fournisseur/${f.id}`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >  
                          Modifier
                        </Link> 
                      </button>
                      <button
                        onClick={() => deleteFournisseur(f.id)}
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
                    </div>
                    <hr />
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#888" }}>Aucun fournisseur trouvé.</p>
              )}
            </div>
      
    </div>
  );
};

export default Fournisseur;
