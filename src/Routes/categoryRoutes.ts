import express from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../Controllers/category";



const router = express.Router();

router.post("/add-category", createCategory);
router.get("/", getCategories);
router.put("/update-category/:categoryId", updateCategory);
router.delete("/delete-category/:categoryId", deleteCategory);

export default router;