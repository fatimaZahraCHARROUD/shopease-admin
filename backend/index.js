import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import fournisseurRoutes from "./src/routes/FournisseurRoutes.js";
import employeRoutes from "./src/routes/EmployeRoutes.js";
import depotRoutes from "./src/routes/DepotRoutes.js";
import commandeClientRoutes from "./src/routes/CommandeClientRoutes.js";
import commandeFournisseurRoutes from "./src/routes/CommandeFournisseurRoutes.js";
import stockRoutes from "./src/routes/StockRoutes.js";
import categorieRoutes from "./src/routes/CategorieRoutes.js";
import productRoutes from "./src/routes/ProductRoutes.js";
import factureRoutes from "./src/routes/FactureRoutes.js";
import FournirRoutes from "./src/routes/FournirRoutes.js";
import db from "./src/config/database.js";
import clientRoutes from "./src/routes/ClientRoutes.js";              
import dashboardRoutes from "./src/routes/DashboardRoutes.js"; 
import userRoutes from "./src/routes/UserRoutes.js";              
import reclamationRoutes from './src/routes/ReclamationRoutes.js';


dotenv.config();
const app = express();

app.use(express.json()); // ✅ Correct
app.use(cors()); // ✅ Correct



// 1.gestion des fournisseurs
app.use("/api", fournisseurRoutes);
// 2.gestion des employes
app.use("/api", employeRoutes);
// 3.gestion des depot
app.use("/api", depotRoutes);
// 4.gestion des commandes clients
app.use("/api", commandeClientRoutes);
// 5.gestion des commandes fournisseurs
app.use("/api", commandeFournisseurRoutes);
//6.gestion de stock
app.use("/api", stockRoutes);
//7.gestion des catégories
app.use("/api", categorieRoutes);
//8.gestion des produits
app.use("/api", productRoutes);
//9.gestion des factures fournisseurs
app.use("/api", factureRoutes);
//10. les produit d'un fournisseur specifique
app.use("/api", FournirRoutes);
//11. donnees de dashboard
app.use("/api/dashboard", dashboardRoutes);
// 12.gestion des client
app.use("/api", clientRoutes);
// 13.gestion d'authentification
app.use("/", userRoutes);
// 14.gestion des reclamation
app.use("/api", reclamationRoutes);

 



// //5.authentification
// app.post('/signin', (req, res) => {
//   const { email, password } = req.body;
//   const admin = "admin";
//   // Vérification de l'utilisateur dans la base de données
//   const query = `
//       SELECT id, email, password, type_user 
//       FROM utilisateur
//       WHERE email = ? AND password = ? AND type_user = ?  
//     `;
//   db.query(query, [email, password, admin], (err, results) => {
//     if (err) {
//       console.error('Erreur SQL:', err);
//       return res.status(500).json({ success: false, message: 'Erreur serveur !!.' });
//     }
//     if (results.length === 0) {
//       return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
//     }
//     const user = results[0];
//     // Redirection en fonction du type d'utilisateur
//     if (user.type_user === 'admin') {
//       res.status(200).json({ success: true, message: 'Bienvenue, Admin!', redirectUrl: '/admin', idadmin: user.id });
//     } else {
//       res.status(403).json({ success: false, message: 'Accès non autorisé.' });
//     }
//   });
// });





// app.get("/api/reclamations", (req, res) => {
//   const sql = "SELECT r.id, u.nomcomplet , u.email, r.msg, r.date FROM reclamation r , utilisateur u where u.id=r.id_client";
//   db.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// });





//listen to any request to 8800
app.listen(8800, () => {
  console.log("Connected to backend!");
});

