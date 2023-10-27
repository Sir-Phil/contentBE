import express from "express";
import { createUser, deleteUser, getLoggedUser, loginUser, updateUserInfo } from "../Controllers/user";


const router = express.Router();

router.post("/create-user", createUser);
router.post("/user-login", loginUser);
router.put("/update-user/:userId", updateUserInfo)
router.get("/user-details", getLoggedUser)
router.delete("/delete-account/:id", deleteUser)

export default router;