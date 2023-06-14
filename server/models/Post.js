import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        emailUser: {
            type: String,
            default:"",

        },
        description: String,

        picturePath: {
            type: String,
            default:"",
        },

        // likes:{
        //     type: Map,
        //     of: Boolean,
        // },
        // comments: {
        //     type: Array,
        //     default: []
        // },
        // level: {
        //     type: Number,
        //     require: true,
        //     default: 4
        // },
        // location: String,
        // userPicturePath: String,
    },
    {timestamps: true}

);

const Post = mongoose.model("Post" ,PostSchema);

export default Post;