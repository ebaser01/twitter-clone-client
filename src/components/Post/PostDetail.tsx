import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiRequest, reqMethod } from '../../api/RequestHandler';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { IAuthorType, IPost } from '../../common/type';
import {fetchComments } from '../../features/comment/commentSlice';
import NewComment from './NewComment';
import PostItem from './PostItem';
import Comment from './Comment';


const StyledLoading = styled.div`
    position: relative;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
`;

const PostDetail = ()=>{

    const [post, setPost] = useState<IPost>();

    const comments = useAppSelector(state=> state.comment);
    const dispatch = useAppDispatch();

    let {userId, postId} = useParams<{userId:string, postId:string}>();

    useEffect(()=>{
        const fetchPost = async ()=>{
            try {
                const postData = await apiRequest(reqMethod.GET, `user/${userId}/posts/${postId}`);
                await dispatch(fetchComments({username: userId, postId: postId}));
                setPost(postData?.data.post);

            } catch (error) {
                console.log(error);
            } 
        }
        fetchPost();
        
    }, [])

    return(
        <div>
        {comments.loading && <StyledLoading className="fas fa-spinner fa-spin"/>}

        {(!comments.loading && post) && 
        <div>

        <PostItem author={post.author.username} likes={post.likes} numberOfComments={comments.comments.length}  content={post.content} img={post.author.image_url} id={post._id} date={moment(post.created).format("DD/MM/YY HH:mm")}/>
        <NewComment postId={post._id}></NewComment>
        {comments.comments.length!==0 &&
        <ul>
            {comments.comments.map((comment,index)=>{
                return <Comment parent={post.author.username} key={comment._id} author={comment.author.username} date={moment(comment.created).format("MMM D HH:mm")} content={comment.content} img={comment.author.image_url}/>
            })}
        </ul>
        }
        </div>}

        </div>
    )
}

export default PostDetail;


