import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { createPost} from '../../features/post/postsSlice';
import { Button } from '../Buttons';
import { StyledError } from '../Form/Error';
import { InputContainer } from './InputContainer';
import { StyledImg } from './ProfilePic';

const Container = styled.div`
    border-bottom: solid 1px #cccccc;
    border-top: solid 1px #cccccc;
    position: relative;
    padding:  1rem 1.2rem 0 1.2rem;
    height: 9rem;
    display:grid;
    grid-template-columns: 1fr 10fr;
`;


const StyledInput = styled.textarea`
    height: 5rem;
    width: 100%;
    resize: none;
    border: none;
    padding-left: 1rem;
    padding-top: 10px;
    font-family: inherit;
    font-size: inherit;
    &:focus{
        outline: none;
    }
`;

const PostButton = styled(Button)`
    position: absolute;
    right:0;
    bottom: 0;
`;

const Error = styled(StyledError)`
    position: absolute;
    height: 2rem;
    bottom: 0;
    padding: 0.5rem;
    z-index: 9;
`;

const NewPost = ()=>{

    const [content, setContent] = useState<string>("");
    const [err, setErr] = useState<string>("");
    
    const dispatch = useAppDispatch();

    const user = useAppSelector(state=> state.user);

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>)=>{
        if(content!==""){
            await dispatch(createPost({username: user.username, content: content}));
            setContent("");
            setErr("");
        }
        else{
            setErr("Text field can not be empty")
        }
        
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setContent(e.currentTarget.value);
    };


    return(
        <Container>
            {err && <Error>{err}</Error>}
            <StyledImg src={user.profileImgUrl} alt=""/>
            <InputContainer>
                <StyledInput onFocus={()=> {setErr("")}} placeholder={"What's hapenning?"} onChange={handleChange} value={content} cols={40} minLength={1} maxLength={140}></StyledInput>
                <PostButton onClick={handleSubmit}  size="m">Post</PostButton>
            </InputContainer>
            
        </Container>
    );
}


export default NewPost;