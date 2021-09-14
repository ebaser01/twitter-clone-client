import React, { useEffect, useState } from 'react';
import { Button } from '../Buttons';
import styled from 'styled-components';
import { StyledImg } from './ProfilePic';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { createComment } from '../../features/comment/commentSlice';

const Container = styled.div`
    position: relative;
    display:flex;
    padding: 1rem;
    border-bottom: solid 1px #cccccc;
    border-top: none;
    align-items: center;
`;

const CommentButton = styled(Button)`
`;

const StyledInput = styled.textarea`
    width: 100%;
    resize: none;
    border: none;
    padding: 0.9rem 1rem;
    font-family: inherit;
    font-size: inherit;
    &:focus{
        outline: none;
    }
`;

const NewComment = ({postId}:{postId:string})=>{

    const user = useAppSelector(state=> state.user);
    const [commentText, setCommentText] = useState<string>("");

    const dispatch = useAppDispatch();

    useEffect(()=>{
    },[]);

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>)=>{
        if(commentText!==""){
            try {
                await dispatch(createComment({username: user.username,content: commentText, postId: postId}));
            } catch (error) {
                console.log(error);
            }
        }
        else{
            setCommentText("Text field can not be empty");
        }
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.currentTarget.value);
    }
    return(
        <div>
            <Container>
                <StyledImg src={user.profileImgUrl}></StyledImg>
                <StyledInput  placeholder={"Share your comment"} onChange={handleChange} value={commentText} cols={5} minLength={1} maxLength={140} ></StyledInput>
                <CommentButton onClick={handleSubmit} size="m">Comment</CommentButton>
            </Container>
            
        </div>
    )
}

export default NewComment