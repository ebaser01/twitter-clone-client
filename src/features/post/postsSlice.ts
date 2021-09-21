import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import { IPost } from '../../common/type';
import userService from '../../services/userService';

export const fetchFeed = createAsyncThunk('post/fetchFeed', async ({username}:{username:string}, {rejectWithValue})=>{
    
    try {
        const response = await userService.fetchFeed(username);
        if(!response) throw new Error("No response");
        return response.data.postList;
        
    } catch (error) {
        localStorage.removeItem('user');
    }
    

});

export const fetchSinglePost = createAsyncThunk('post/fetchSinglePost', async ({username, postId}:{username:string, postId:string}, {rejectWithValue})=>{
    
    try {
        const response = await userService.fetchSinglePost(username, postId);
        if(!response) throw new Error("No response");
        return response.data.post;
        
    } catch (error) {
        localStorage.removeItem('user');
    }
    

});

export const fetchUserPosts = createAsyncThunk('post/fetchUserPosts', async (username:string, {rejectWithValue})=>{

    try {
        const response = await userService.fetchUserPosts(username);
        if(!response) throw new Error("No response");
        return response.data.postList;
        
    } catch (error) {
        localStorage.removeItem('user');
    }
    

})

export const createPost = createAsyncThunk('post/createPost', async ({username, content}:{username:string, content:string}, {rejectWithValue})=>{
    
    try {
        const response = await userService.createPost(username,content); 
        if(!response) throw new Error("No response");
        return response.data;
    } catch (error) {
        console.log(error.response.data.msg);
        localStorage.removeItem('user');
    }
    

});

export const postLiked = createAsyncThunk('post/likePost', async ({postId, username}:{postId:string, username:string}, {rejectWithValue})=>{
    try {
        const response = await userService.likePost(username,postId); 
        if(!response) throw new Error("No response");
        return {...response.data, postId};
    } catch (error) {
        console.log(error.response.data.msg);
        localStorage.removeItem('user');
    }
    

});


const initialState:{posts:Array<any>, post: any, loading:boolean} = {
    posts: [],
    post: {},
    loading: true,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,

    reducers:{

    },

    extraReducers: (builder)=>{
        builder.addCase(fetchFeed.pending, (state)=>{
            state.posts= [];
            state.loading = true;
        })
        .addCase(fetchFeed.fulfilled, (state, action:PayloadAction<any>)=>{
            state.posts = action.payload;
            state.loading = false; 
        })
        .addCase(fetchSinglePost.pending, (state)=>{
            state.posts= [];
            state.loading = true;
        })
        .addCase(fetchSinglePost.fulfilled, (state, action:PayloadAction<any>)=>{
            state.posts = [action.payload];
            state.loading = false; 
        })
        .addCase(fetchUserPosts.pending, (state)=>{
            state.posts= [];
            state.loading = true;
        })
        .addCase(fetchUserPosts.fulfilled, (state, action:PayloadAction<any>)=>{
            state.posts = action.payload;
            state.loading = false; 
        })
        .addCase(createPost.pending, (state, action:PayloadAction<any>)=>{
            state.loading= true;
        })
        .addCase(createPost.fulfilled, (state, action:PayloadAction<any>)=>{
            state.loading= false;
            state.posts = [action.payload, ...state.posts];
        })
        .addCase(postLiked.fulfilled, (state,action)=>{
            let post:any = current(state.posts).filter((e: IPost)=>{
                return e._id === action.payload.postId;
            });
            if(action.payload.liked === -1){
                let arr = post[0].likes.filter((e: string)=>{
                    return e !== JSON.parse(localStorage.user).id;
                });
                let newPosts = current(state.posts).map(e=>{
                    if(e._id===action.payload.postId){
                        return {...e, likes:arr}
                    }
                    else return e;
                })
                state.posts = newPosts;
            }
            else{
                let newPosts = current(state.posts).map(e=>{
                    if(e._id===action.payload.postId){
                        return {...e, likes: [...e.likes, JSON.parse(localStorage.user).id]}
                    }
                    else return e;
                })
                state.posts = newPosts;
            }
            
        })
    }
});
