import express from  "express";

// importation des fonctions depuis le controller dans le fichie de route
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js"

import { virifyToken } from "../middlewares/authentification.js"; 

const router = express.Router();

// READ ROUTES
router.get("/:id", virifyToken, getUser)
router.get("/:id/friends", virifyToken, getUserFriends)

// UPDATE ROUTES
router.patch("/:id/:friendId", virifyToken, addRemoveFriend)



export default router;