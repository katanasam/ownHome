import express from  "express";
import { login } from "../controllers/authentification.js"

const router = express.Router();


router.post("/login", login)


export default router;