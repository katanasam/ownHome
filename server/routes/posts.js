import express   from "express";
import { getAllPosts, getUserPosts, likePost, deletePost } from "../controllers/posts.js"

import {verifyToken} from "../middlewares/authentification.js"

const router = express.Router()

// READ LECTURE
router.get("/",verifyToken ,getAllPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

// UPDATE
router.patch("/:postId/like",verifyToken, likePost)

// DELETE
router.delete("/:postId/delete",verifyToken, deletePost)


export default router;