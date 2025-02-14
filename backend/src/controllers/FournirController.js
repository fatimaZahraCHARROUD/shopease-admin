import { getProduitsByFournisseur } from "../models/FournirModel.js";

// Récupérer les produits d'un fournisseur
export const getFournisseurProduits = (req, res) => {
  const { fournisseurId } = req.params;

  getProduitsByFournisseur(fournisseurId, (err, produits) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
    return res.json(produits);
  });
};
