import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getRecommendedProducts,getProductsByCategory, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute,adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/",protectRoute,adminRoute, createProduct);// tuyen duong de admin co the tao san pham 
router.patch("/:id",protectRoute,adminRoute, toggleFeaturedProduct);// tuyen duong de admin co the thay doi noi bat
router.delete("/:id",protectRoute,adminRoute, deleteProduct);// tuyen duong de admin co the xoa san pham
export default router;
//put khi cap nhat toan bo tai lieu
//patch khi chi sua 1 tai lieu