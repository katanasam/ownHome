
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//-- import models
import User from "../models/User.js";

/* USER ACTION */
// Contient toutes les fonctions liées au USER

// Réccupération des informations sur un user pour afficher son profil
// La réccupération se fait en partant de son id dans la route 
export const getUser = async(request, response) => {
    try {

        const {id} = request.params
        const user_found = await User.findById(id)

        response.status(200).json(user_found)

 
    } catch(err) {
        response.status(500).json({sms: err.message}, "controller -> users --> getUser fonction ")
    }
}


export const getUserFriends = async(request, response) => {
    try {

        const {id} = request.params
        const user_found = await User.findById(id)

        const friends = await Promise.all(
            user_found.friends.map((id) => User.findById(id))
        )
        
        // controle de la variable friends
        console.log(friends,"friends var -->")
        
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath}
            })
        
        
        response.status(200).json(formattedFriends)

    } catch(err) {
        response.status(500).json({sms: err.message}, "controller -> users --> getUserFriends fonction ")
    }
}


export const addRemoveFriend = async(request, response) => {
    try {
        // Réccupération des paramètres dans la route 
        const {id , friendId} = request.params
        const user_found = await User.findById(id)
        const friend_found = await User.findById(friendId)

        // Vérification de la présence du friend la liste d'amis
        if (user_found.friends.includes(friendId)){

            // Il faut faire une suppression de chaque coté 
            // -- il faut le supprimer de ma liste d'amis
            // -- mais il faut aussi me supprimer de sa liste d'amis

            // Supprime le user de la liste d'amis
            // Il va copier tous le tableau dans la variable sauf 
            // Sauf si l'élément id est égale au friendId

            // je peux prendre la variable (friendId) ou (friend_found.id) car c'est le même valeur
            user_found.friends = user_found.friends.filter((id) => id !== friendId )

            // je peux prendre la variable (id) ou (user_found.id) car c'est le même valeur
            friend_found.friends = friend_found.friends.filter((id) => id !== user_found.id )

        }




    } catch(err) {
        response.status(500).json({sms: err.message}, "controller -> users --> addRemoveFriend fonction ")
    }
}