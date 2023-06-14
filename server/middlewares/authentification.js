import jwt from 'jsonwebtoken'

const l = "--------------------------------------------------------------------------"

export const verifyToken = async (request , response, next) => {
    try {    

        let token = request.header("Authorization")

        if(!token){
            return response.status(403).send(" Access Denied -> virifytoken le token n'éxiste pas !")
        }

        // Réccupération du token dans le header authorization
        // Le token se trouve aprés le mot "Bearer "

        if(token){
            //redéfinition de la variable token
            token = token.split("Bearer ")[1];
            
        }


        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        request.user = verifyToken ;
        // Ensuite il fera appèle à une autre fonction
        next()

    }catch (err) {
        response.status(500).json({ error:  err.message} )

    }
}