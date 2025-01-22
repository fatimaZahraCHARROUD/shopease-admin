import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";

const depot = () => { 
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
    const [depot, setdepot] = useState([]); 
   const fetchdepot = async () => { 
      try {
      const response = await axios.get("http://localhost:8800/depot");
            setdepot(response.data);
         } catch (err) {
      console.error("Erreur lors de la récupération des depot :", err);
    }
  };
 

  useEffect(() => {
    fetchdepot();
 }, []); 

   const deletedepot = async (depotId) => {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce depot ?");

    if (isConfirmed) {
    try {
      await axios.delete(`http://localhost:8800/depot/${depotId}`);
           alert("depot supprimé avec succès !");
      fetchdepot(); 
      } catch (err) {
      console.error("Erreur lors de la suppression de depot :", err);
    }}
  };

  return (
    <div style={{ marginLeft:"180px",padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
    <h1 style={{ fontWeight:"bold" , textAlign: "center", color: "rgb(175, 76, 101)" }}>Liste des depot</h1>
    <div className="users" style={{ marginTop: "20px" }}> 
    <Link
                    to="/admin/add_depot"
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
                    Ajouter un depot
                </Link><br/><br/>
     {depot.length > 0 ? (
                 depot.map((e) => (
                   <div key={e.id} className="user" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                
                    <p style={{ color: "#666" }}>Adresse : {e.adresse}</p>
                    
                   
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
                          to={`/admin/update_depot/${e.id}`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >  
                          Modifier
                        </Link> 
                      </button>
                      <button
                        onClick={() => deletedepot(e.id)}
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
                <p style={{ textAlign: "center", color: "#888" }}>Aucun depot trouvé.</p>
              )}
            </div>
      
    </div>
  );
};

export default depot;
