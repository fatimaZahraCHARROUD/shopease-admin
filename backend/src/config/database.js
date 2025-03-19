import mysql from "mysql2";//Permet d'interagir avec une base de données MySQL
import dotenv from "dotenv";//Charge les variables d'environnement depuis un fichier .env 

//Chargement des variables d'environnement
dotenv.config();

// Création de la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//tente d'établir la connexion.
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion MySQL :", err);
    return;
  }
  console.log("Connecté à MySQL");
});

//permet d'utiliser la connexion MySQL dans d'autres fichiers.
export default db;
