import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link ,useNavigate} from "react-router-dom";

const categorie = () => {
     const userId = localStorage.getItem("adminId");
      const navigate = useNavigate(); 
    
      useEffect(() => {
        if (userId === "undefined" || userId === null) {
          // Si userId est null ou vide, rediriger vers /signin
          navigate('/signin');
        }
      }, [userId, navigate]);
    
  const [categorie, setcategorie] = useState([]);
  const [nom, setNom] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchcategorie();
  }, []);

  // Fonction pour récupérer les catégories
  const fetchcategorie = async () => {
    try {
      const response = await axios.get("http://localhost:8800/categorie");
      console.log("Données récupérées :", response.data); // Debug
      setcategorie(response.data); // Met à jour l'état avec les données récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  // Fonction pour ajouter ou modifier une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nom.trim()) {
      alert("Le champ nom est obligatoire !");
      return;
    }
  
    try {
      let response; // Déclarez la variable response ici
  
      if (id) {
        response = await axios.put(`http://localhost:8800/categorie/${id}`, { nom });
        alert("Catégorie modifier avec succès !");

      } else {
        response = await axios.post(`http://localhost:8800/categorie`, { nom });
        alert("Catégorie ajouté avec succès !");

      }
  
      console.log("Réponse du serveur :", response.data); // Debug
      setNom(""); // Réinitialiser le champ nom
      setId(null); // Réinitialiser l'ID
      fetchcategorie(); // Recharger les catégories après l'ajout ou la modification
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification :", error);
      alert("Une erreur est survenue lors de l'ajout ou de la modification.");
    }
  };
  

  // Fonction pour pré-remplir le formulaire lors de la modification
  const handleEdit = (category) => {
    setNom(category.nom);
    setId(category.id);
  };

  // Fonction pour supprimer une catégorie
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette categorie ?");

    if (isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:8800/categorie/${id}`); // Utilisation correcte des backticks
      console.log("Catégorie supprimée :", response.data); // Debug
      alert("Catégorie supprimé avec succès !");

      fetchcategorie(); // Recharger les catégories après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }}
  };

  return (
    <div style={{ marginLeft:"180px" ,}} className="container mt-5">
      <h1>Ajouter une catégorie</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
           <input
            type="text" placeholder="nom de categorie "
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <button style={{ backgroundColor:"rgb(175, 76, 127)", color:"white" }} type="submit" className="btn ">
          {id ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categorie.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.nom}</td>
              <td>
                <button style={{ backgroundColor:"rgb(175, 76, 127)", color:"white" }}
                  className="btn   me-2"
                  onClick={() => handleEdit(category)}
                >
                  Modifier
                </button>
                <button
                  className="btn  " style={{border:"1px solid rgb(175, 76, 127)", backgroundColor:"white", color:"rgb(175, 76, 127)" }}
                  onClick={() => handleDelete(category.id)}
                >
                  Supprimer
                </button>
                <Link to={`/admin/details_categorie/${category.id}`}  style={{color:" rgb(175, 76, 127)" }} >
                   Détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default categorie;