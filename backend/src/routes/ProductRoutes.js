import express from "express";
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  editProduct, 
  removeProduct, 
  searchProducts 
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", removeProduct);
router.get("/produits/recherche", searchProducts);

export default router;
