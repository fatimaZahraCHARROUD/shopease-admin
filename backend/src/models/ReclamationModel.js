// model/reclamation.js

import db from "../config/database.js";

const getAllReclamations = () => {
  const sql = "SELECT r.id, u.nomcomplet , u.email, r.msg, r.date FROM reclamation r , utilisateur u WHERE u.id=r.id_client";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export { getAllReclamations };
