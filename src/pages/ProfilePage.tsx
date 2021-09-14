import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest, reqMethod } from '../api/RequestHandler';
import { IAuthorType, IPost } from '../common/type';
import PostItem from '../components/Post/PostItem';
import ProfileBanner from '../components/ProfileBanner';




const ProfilePage = ()=>{

    const {userId} = useParams<{userId:string}>();

    const [user, setUser] = useState<IAuthorType>();
    const [posts, setPosts] = useState<Array<IPost>>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const userData = await apiRequest(reqMethod.GET, `user/${userId}`);
                const postData = await apiRequest(reqMethod.GET, `user/${userId}/posts`);
                console.log(userData?.data);
                setUser(userData?.data.user);
                setPosts(postData?.data.postList);
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