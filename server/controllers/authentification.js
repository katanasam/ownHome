import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//-- import models
import User from "../models/User.js";

/* AUTHENTIFICATION */
// Contient toutes les fonctions liées à l'enregistrement

// ------> REGISTER USER ---->
/**/
export const register = async (request, response) => {
    try {

        // Extractions des variables du body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = request.body;

        // Cryptage du password 
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        // Création d'un nouvel user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:33 ,
            impressions:33,
        })

        // Sauvegarde du user et envoie d'un réponse
        const savedUser = await newUser.save();
        response.status(201).json(savedUser);

    }catch (err) {
        response.status(500).json({error: err.message})
        console.log( "Fonction <-- register --> /controller/authentification.js ",err.message)
    }
}


// ------> LOGIN IN APP ---->
/**/
export const login = async (request, response) => {
    try {

        // Extractions des variables du body
        const { email,password } = request.body;

        // Recherche du user en base de données
        const user_found  = await User.findOne({email: email})
        
        // Controlle
        console.log(user_found)

        // Si l'utilisateur n'est pas trouvé dans la base de données
        if (!user_found) return response.status(400).json({ sms: " login fonction controller/authentification.js -> Utilisateur non présent en base de données"})
        
        // Comparaison des passwords
        const isMatch = await bcrypt.compare(password, user_found.password)
        if (!isMatch) return response.status(400).json({sms: "login fonction -> Le mot de pass de correspond pas !"})

        // Si tout est ok ON ENVOIE UN TOKEN DE CONNEXION
        const token = jwt.sign({ id: user_found._id }, process.env.JWT_SECRET)

        // Delete de password
        delete user_found.password;
        response.status(200).json({token ,user_found})

    }catch (err) {
        response.status(500).json({error: err.message})
        console.log( "Fonction <-- register --> /controller/authentification.js ",err.message)
    }
}