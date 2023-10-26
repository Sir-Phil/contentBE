import express from "express";
import { createUser } from "../Controllers/user";


const router = express.Router();

router.post("/create-user", createUser);

export default router;