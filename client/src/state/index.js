import { createSlice } from "@reduxjs/toolkit"

// createSlice == craetePost
// Gestion du state et du partage d'information entre les composents
// Rend les informations axécible dans toutes l'app
// -- npm install @reduxjs/toolkit

// Les variables à initialiser, à la naissance du composent ou (component)
// On utilise ensuite des fonction pour modifier le state Initial (initialState)
 
// etas initial
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []

};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        setMode:(state) => {

            state.mode = state.mode === "light" ? "dark" : "light";
        },
        
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state)=> {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.error(" user friends non-existent ")
            } 
        },

        setPosts:(state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post_id) return action.payload.post;
                return post;
            })

            state.post = updatedPosts;
        }


    }
})


export const {setMode, setLogin, setFriends,setLogout,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer;