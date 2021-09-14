import { configureStore, } from '@reduxjs/toolkit';
import { userSlice } from '../features/user/usersSlice';
import { postSlice } from '../features/post/postsSlice';
import { commentSlice } from '../features/comment/commentSlice';




const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        post: postSlice.reducer,
        comment: commentSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 

export default store;