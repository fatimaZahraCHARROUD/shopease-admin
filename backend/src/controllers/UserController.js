// UserController.js

import userModel from "../models/UserModel.js";  // Assurez-vous que le chemin est correct

// Contrôleur pour la connexion
export const signIn = (req, res) => {
  const { email, password } = req.body;
  const admin = "admin";

  userModel.authenticateUser(email, password, admin, (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur !!." });
    }
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    const user = results[0];
    if (user.type_user === "admin") {
      res.status(200).json({
        success: true,
        message: "Bienvenue, Admin!",
        redirectUrl: "/admin",
        idadmin: user.id,
      });
    } else {
      res.status(403).json({ success: false, message: "Accès non autorisé." });
    }
  });
};

export default { signIn };  // L'export par défaut de l'objet contenant signIn
