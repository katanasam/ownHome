import express from "express"
import mongoose from "mongoose"

const app = express()

// mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false" )

mongoose
    .connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT , () => console.log(`SERVER PORT : ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`))