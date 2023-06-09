import jwt from "jsonwebtoken"

export const virifyToken = async (request , response, next) => {
    try {    

        let token = request.header("Authorization")

        if (!token)
        return response.status(500).json(" Access Denied -> virifytoken le token n'éxiste pas !")

        // Réccupération du token dans le header authorization
        // Le token se trouve aprés le mot "Bearer "
        if (token.startsWith("Bearer ")){
            validToken = token.slice(7, token.length).trimleft()
        }

        const verifyToken = jwt.verify(validToken, process.env.JWT_SECRET)

        request.user = verifyToken ;

        // Ensuite il fera appele à une autre fonction
        next()

    }catch (err) {
        response.status(500).json({ error:  err.message} , "midddleware vérifytoken --> le token n'est pas valide ! ")

    }
}