import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";

const employe = () => { 
  const userId = localStorage.getItem("adminId");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!userId) {
      // Si userId est null ou vide, rediriger vers /signin
      navigate('/signin');
    }
  }, [userId, navigate]);
    const [employe, setemploye] = useState([]); 
   const fetchemploye = async () => { 
      try {
      const response = await axios.get("http://localhost:8800/employe");
            setemploye(response.data);
         } catch (err) {
      console.error("Erreur lors de la récupération des employe :", err);
    }
  };
 

  useEffect(() => {
    fetchemploye();
 }, []); 

   const deleteemploye = async (employeId) => {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet employe ?");

    if (isConfirmed) {
    try {
      await axios.delete(`http://localhost:8800/employe/${employeId}`);
           alert("employe supprimé avec succès !");
      fetchemploye(); 
      } catch (err) {
      console.error("Erreur lors de la suppression de employe :", err);
    }}
  };

  return (
    <div style={{ marginLeft:"180px", padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
    <h1 style={{ fontWeight:"bold" , textAlign: "center", color: "rgb(175, 76, 101)" }}>Liste des employe</h1>
    <div className="users" style={{ marginTop: "20px" }}> 
    <Link
                    to="/admin/add_employe"
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
                    Ajouter un employe
                </Link><br/><br/>
     {employe.length > 0 ? (
                 employe.map((e) => (
                   <div key={e.id} className="user" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                    <h2 style={{ color: "#444" }}>Nom : {e.nomcomplet}</h2>
                    <p style={{ color: "#666" }}>Email : {e.email}</p>
                    <p style={{ color: "#666" }}>Password : {e.password}</p>
                    <p style={{ color: "#666" }}>Adresse : {e.adresse}</p>
                    <p style={{ color: "#666" }}>Telephone : {e.tel}</p>
 
                   
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
                          to={`/admin/update_employe/${e.id}`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >  
                          Modifier
                        </Link> 
                      </button>
                      <button
                        onClick={() => deleteemploye(e.id)}
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
                <p style={{ textAlign: "center", color: "#888" }}>Aucun employe trouvé.</p>
              )}
            </div>
      
    </div>
  );
};

export default employe;
