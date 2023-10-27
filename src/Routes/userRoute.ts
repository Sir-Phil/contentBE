import express from "express";
import { createUser, deleteUser, getLoggedUser, loginUser, updateUserInfo } from "../Controllers/user";
import { isAuthenticated } from "../Middlewares/authService";


const router = express.Router();

router.post("/create-user", createUser);
router.post("/user-login", loginUser);
router.put("/update-user/:userId", isAuthenticated, updateUserInfo)
router.get("/user-details", isAuthenticated, getLoggedUser)
router.delete("/delete-account/:id", isAuthenticated, deleteUser)

export default router;