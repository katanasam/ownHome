import express from  "express";

// importation des fonctions depuis le controller dans le fichie de route
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js"

import { verifyToken } from "../middlewares/authentification.js"; 

const router = express.Router();

// READ ROUTES
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

// UPDATE ROUTES
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)



export default router;