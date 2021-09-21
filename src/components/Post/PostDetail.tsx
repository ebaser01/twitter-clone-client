import moment from 'moment';
import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {fetchComments } from '../../features/comment/commentSlice';
import NewComment from './NewComment';
import PostItem from './PostItem';
import Comment from './Comment';
import { fetchSinglePost } from '../../features/post/postsSlice';


const StyledLoading = styled.div`
    position: relative;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
`;

const PostDetail = ()=>{

    const comments = useAppSelector(state=> state.comment);
    const post = (useAppSelector(state=> state.post.posts))[0];
    const loading = useAppSelector(state=> state.post.loading);
    const dispatch = useAppDispatch();

    let {username, postId} = useParams<{username:string, postId:string}>();

    useEffect(()=>{
        const fetchPost = async ()=>{
            try {
                await dispatch(fetchSinglePost({username: username, postId: postId}));
                await dispatch(fetchComments({username: username, postId: postId}));

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

        {(!loading) && <PostItem author={post.author.username} likes={post.likes} numberOfComments={comments.comments.length}  content={post.content} 
        img={post.author.image_url} id={post._id} date={moment(post.created).format("DD/MM/YY HH:mm")}/>}    
        
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


