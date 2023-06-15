import express from  "express";
import { login } from "../controllers/authentification_Controller.js"

const router = express.Router();


router.post("/login", login)


export default router;