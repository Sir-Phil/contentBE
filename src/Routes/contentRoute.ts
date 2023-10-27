import express from "express";
import { createPost, deletePostedContent, getPostedContent, updatePostedContent } from "../Controllers/content";
import { isAuthenticated } from "../Middlewares/authService";


const router = express.Router();

//Public routes
router.get("/", getPostedContent);


router.post("/post-content", isAuthenticated, createPost);
router.delete("/delete-post/:postId", isAuthenticated, deletePostedContent)
router.put("/update-post/:postId", isAuthenticated, updatePostedContent);

export default router