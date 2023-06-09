import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


import { register } from "./controllers/authentification.js"

import authentificationRoutes from "./routes/authentification.js"


/* CONFIGURATION */
//------------------------------------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express()
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));



/* FILE STORAGE */
//------------------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }

});

const upload = multer({ storage });



/* ROUTES WITH FILES */
//------------------------------------------------------------------------------------------------------

// Enregistrement d'un utilisateur avec son image de profil
app.post("/auth/register", upload.single("picture"), register)

// ROUTES 
app.get("/tester", (req, res ) => { res.send({ data: "le serveur est connecté"});})

// authentification == auth
app.use("/auth", authentificationRoutes)



/* MONGOOSE SETUP */
//------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT , () => console.log(`Le serveur est en ecoute sur 
        localhost:6666/(route ?) : ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`))

//------------------------------------------------------------------------------------------------------
