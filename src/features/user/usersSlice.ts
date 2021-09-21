import {createSlice , PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { IUserState } from '../../common/type';
import userService from '../../services/userService';

let user_raw = localStorage.getItem('user');
let user = user_raw ? JSON.parse(user_raw) : undefined;

const initialState: IUserState = user ? {id: user.id, isAuth:true, loading:false, username: user.username, profileImgUrl: user.profileImgUrl, isError: false, following: user.following, followed: user.followed} :
 {id: "", isAuth:false, loading:false, username:"", profileImgUrl: "", isError: false, following: [], followed: []};

export const login = createAsyncThunk('user/login', async ({username, password}:{username:string, password:string}, {rejectWithValue}) => {

    try {
        const response = await userService.login(username,password);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.data.response);
    }
    
    
});

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        logout: (state) => {
            state =  {id: "", isAuth:false, loading:false, username:"", profileImgUrl: "", isError: false, following: [], followed: []};
            localStorage.removeItem('user');
        }
    },

    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
             state.loading = true;
        })
        .addCase(login.rejected , (state)=>{
            state.loading = false;
            state.isError = true;
        })

        .addCase(login.fulfilled, (state, action:PayloadAction<any>)=>{
            state.loading = false;
            state.isAuth = true;
            state.profileImgUrl = action.payload.profileImgUrl;
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.following = action.payload.following;
            state.followed = action.payload.followed;
        })

    },
});




export const {
    logout
} = userSlice.actions;