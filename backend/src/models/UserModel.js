// UserModel.js
import db from "../config/database.js";  // Assure-toi que la connexion à la base de données est correcte

// Fonction pour authentifier l'utilisateur
export const authenticateUser = (email, password, admin, callback) => {
  const query = `
    SELECT id, email, password, type_user
    FROM utilisateur
    WHERE email = ? AND password = ? AND type_user = ?  
  `;
  
  db.query(query, [email, password, admin], (err, results) => {
    callback(err, results);  // Exécution du callback avec les résultats
  });
};

// Exportation par défaut de la fonction ou de l'objet contenant les fonctions
export default { authenticateUser };
