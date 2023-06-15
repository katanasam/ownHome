import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//-- import models
import Post from "../models/Post.js"
import User from "../models/User.js";

/* POST ACTION */
// Contient toutes les fonctions liées au post par le user

// Réccupération des informations sur un user pour afficher son profil
// La réccupération se fait en partant de son id dans la route 


export const createPost = async(request, response) => {
    try {

        const { userId, description, picturePath } = request.body
        console.log(userId, description,picturePath)

        const user_found = await User.findById(userId)
        console.log(user_found.email)

        const new_Post = new Post ({
            userId,
            emailUser: user_found.email,
            description,
            picturePath,
            // location: user_found.location ,
            // userPicturePath: user_found.picturePath,
            // likes: {},
            // comments:[]
        })

        await new_Post.save()

        // On renvoie tous les posts dans la reponse
        // que les posts qu'il a crées
        // il faudrait lancer une recherche  de post avec email identique au user user_found

        const posts_recup = await Post.find()

        response.status(200).json(posts_recup)
        

 
    } catch(err) {
        response.status(500).json({sms: err.message,"err create post":"ici"})
    }
}

// --------- à revoir

export const deletePost = async(request, response) => {
    try {

        const { postId } = request.params
        await Post.findByIdAndDelete({id: postId})

        const posts_list = Post.find()


        response.status(200).json(posts_lists)
        

 
    } catch(err) {
        response.status(500).json({sms: err.message})
    }
}

export const getAllPosts = async(request, response) => {
    try {

        const posts_recup = await Post.find()

        response.status(200).json(posts_recup)
        
        
    } catch(err) {
        response.status(500).json({sms: err.message},)
    }
}

export const getUserPosts = async(request, response) => {
    try {

        const {userId} = request.params
        // lancement de la recherche de posts liées à cette user
        const posts_recup = Post.find({userId})

        response.status(200).json(posts_recup)
 
    } catch(err) {
        response.status(500).json({sms: err.message}, )
    }
}

export const likePost = async(request, response) => {
    try {

        const {postId} = request.params
        const {userId} = request.body
        const post_recup = await Post.findById({id:postId})

        // si le post est déja like controle
        const isLiked = post_recup.likes.get(userId)

        if(isLiked){
            post_recup.likes.delete(userId)
        }else {
            post_recup.likes.set(userId,true)
        }

        const updated_post = await Post.findByIdAndUpdate(
            {id: postId}, 
            {likes : post_recup.likes},
            { new : true }
            )
            
            response.status(200).json(updated_post)

    } catch(err) {
        response.status(500).json({sms: err.message})
    }
}
