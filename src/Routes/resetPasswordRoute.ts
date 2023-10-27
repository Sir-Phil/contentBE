import express from "express"
import { forgetPassword, receiveTokeReset, resetPassword } from "../Controllers/forgetPasswordToken";

const router = express.Router();


router.post("/rest-password-mail", forgetPassword);
router.get("/reset/:token", receiveTokeReset);
router.post("/reset/:token", resetPassword); 




export default router