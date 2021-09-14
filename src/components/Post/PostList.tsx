
import moment from 'moment';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { IPost } from '../../common/type';
import { fetchPosts } from '../../features/post/postsSlice';
import NewPost from './NewPost';
import PostItem from './PostItem';

const StyledList = styled.ul`
    border-right: solid 1px #cccccc;
`;


const StyledLoading = styled.div`
    position: relative;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
`;

const PostList = () => {

    //const [posts, setPosts] = useState<Array<{post: IPostType, comments:Array<IPostType>}>>();

    const user = useAppSelector(state=> state.user);
    const postsState = useAppSelector(state=> state.post);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchPosts({username: user.username}));
    },[]);

    return(
            
            <StyledList>
                <NewPost></NewPost>
                {postsState.loading && <StyledLoading className="fas fa-spinner fa-spin"/>}
                {postsState.posts && postsState.posts.map((post:IPost, index)=>{
                    return <PostItem key={post._id} likes={post.likes} numberOfComments={post.comments.length} date={moment(post.created).format("MMM D HH:mm")} id={post._id} author={post.author.username} content={post.content} img={post.author.image_url}></PostItem>
                })}
            </StyledList>
        
    );
}

export default PostList;