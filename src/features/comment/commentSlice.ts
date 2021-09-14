import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiRequest, reqMethod} from '../../api/RequestHandler';


export const fetchComments = createAsyncThunk('comment/fetchComments', async ({username,postId}:{username:string, postId:string}, {rejectWithValue})=>{
    
    try {
        const response = await apiRequest(reqMethod.GET, `user/${username}/posts/${postId}/comments`);
        if(!response) throw new Error("No response");
        console.log(response.data.result);
        return response.data.result.comments;
    } catch (error) {
        console.log(error);
    }
    

});

export const createComment = createAsyncThunk('comment/createPost', async ({username, content, postId}:{username:string, content:string, postId:string}, {rejectWithValue})=>{
    
    try {
        const response = await apiRequest(reqMethod.POST, `user/${username}/posts/${postId}/comments`, {content: content});
        if(!response) throw new Error("No response");
        return response.data;
    } catch (error) {
        console.log(error.response.data.msg);
    }
    

});


const initialState:{comments:Array<any>, loading:boolean} = {
    comments: [],
    loading: false,
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,

    reducers:{

    },

    extraReducers: (builder)=>{
        builder.addCase(fetchComments.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchComments.fulfilled, (state, action:PayloadAction<any>)=>{
            state.comments = action.payload;
            state.loading = false; 
        })
        .addCase(createComment.pending, (state, action:PayloadAction<any>)=>{
            state.loading= true;
        })
        .addCase(createComment.fulfilled, (state, action:PayloadAction<any>)=>{
            state.loading= false;
            if(!state.comments){
                state.comments = action.payload;
            }
            else{
                state.comments = [action.payload, ...state.comments];
            }
            
        })
    }
});
