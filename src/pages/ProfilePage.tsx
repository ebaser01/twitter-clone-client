import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/userService';
import { IAuthorType, IPost } from '../common/type';
import PostItem from '../components/Post/PostItem';
import ProfileBanner from '../components/ProfileBanner';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { fetchUserPosts } from '../features/post/postsSlice';




const ProfilePage = ()=>{

    const {username} = useParams<{username:string}>();
    
    const dispatch = useAppDispatch();

    const [user, setUser] = useState<IAuthorType>();
    const [loading, setLoading] = useState<boolean>();

    const posts = useAppSelector(state=> state.post.posts);

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const userData = await userService.fetchUser(username);
                await dispatch(fetchUserPosts(username));
                setUser(userData?.data.user);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    },[])

    return(
        <div style={{borderRight: "solid 1px #cccccc"}}>
                {(!loading && posts && user) && <ProfileBanner username={user.username} image_url={user.image_url} followingCount={user.following.length} followers={user.followed} postCount={posts.length}></ProfileBanner>}
                {loading && <i className="fas fa-spinner fa-spin"/>}
                {(!loading && posts) && posts.map((post:IPost)=>{
                    return <PostItem key={post._id} likes={post.likes} numberOfComments={post.comments.length} date={moment(post.created).format("MMM D HH:mm")} id={post._id} author={post.author.username} content={post.content} img={post.author.image_url}></PostItem>
                })}
            
        </div>
    );

}

export default ProfilePage;