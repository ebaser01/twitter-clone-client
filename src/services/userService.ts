import api from '../api/ApiCommon'


function userService(){
    return{
        login: (username:string, password:string)=> 
        api.post('login', {username, password}),

        fetchUser: (username:string)=> 
        api.get(`user/${username}`),

        fetchUsers: ()=>
        api.get('user/'),

        fetchFeed: (username:string)=> 
        api.get(`user/${username}/feed/`),

        fetchUserPosts: (username:string)=> 
        api.get(`user/${username}/posts`),

        fetchSinglePost: (username:string, postId:string)=> 
        api.get(`user/${username}/posts/${postId}`),

        createPost: (username: string, content: string)=> 
        api.post(`user/${username}/posts/`, {content: content}),

        deletePost: (username: string, postId: string)=> 
        api.delete(`user/${username}/posts/${postId}`),

        likePost: (username:string,postId:string)=> 
        api.put(`user/${username}/posts/${postId}/like`),

        fetchComments: (username: string, postId: string)=> 
        api.get(`user/${username}/posts/${postId}/comments`),

        createComment: (username: string, postId: string, content:string)=> 
        api.post(`user/${username}/posts/${postId}/comments`, {content: content}),

        followUser: (username: string)=> 
        api.put(`user/${username}/follow`),
    }
}

export default userService();