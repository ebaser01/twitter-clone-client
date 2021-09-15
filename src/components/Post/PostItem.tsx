import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { apiRequest, reqMethod } from '../../api/RequestHandler';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { postLiked } from '../../features/post/postsSlice';
import { StyledImg } from './ProfilePic';


const StyledLi = styled.li`

    border-bottom: solid 1px #cccccc;
    display: grid;
    grid-template-columns: 4rem auto;
    grid-template-rows: auto;
    min-height: 8rem;
    padding: 1rem 1rem;
`;



const TextContainer = styled.div`
    grid-column-start: 2;
`;

const Username = styled.div`
    margin-bottom: 0.5rem;
    font-weight: bolder;
`;

const StyledLink = styled(Link)`
    font-size: 0.9rem;
    color: black;
    text-decoration: none;
    display: block;
    &:visited{
        color: black;
    }
    &:hover{
        text-decoration: underline;
        color: var(--background-primary)
    }
`;

const StyledDate = styled.div`
    grid-column-start: 2;
    justify-self: end;
    font-style: italic;
`;

const PostActions = styled.div`
    grid-column-start: 2;
    grid-row-start: 3;
`; 

const zoomIn = keyframes`
    from{
        transform: scale(0.2);
    }
    to{
        transform: scale(1);
    }
`;

const StyledAction = styled.span`
    background: none;
    border: none;
    margin-right: 15px;

    &:hover{
        cursor: pointer;
    }

    & .fas.fa-heart{
        animation: ${zoomIn} 0.2s;
    }
`;




const PostItem = (props: {author:string, content:string, img:string, date:string, id: string, numberOfComments: number, likes: Array<string>})=>{

    const [likes, setLikes]= useState<number>(props.likes.length);
    const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);

    const user = useAppSelector(state=> state.user);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        setAlreadyLiked(props.likes.includes(user.id));
        setLikes(props.likes.length);
    },[props.likes])

    const handleLike = async ()=>{
        try {
            await dispatch(postLiked({postId: props.id, username: props.author}));
            setAlreadyLiked(!alreadyLiked);
        } catch (error) {
            console.log(error);
        }
        
    }
    
    return(

        <StyledLi>
    
            <Link to={'/users/' + props.author}><StyledImg src={props.img} alt=""/></Link>
            <div>
                <Username> <StyledLink to={`/users/` + props.author}>{props.author}</StyledLink></Username>
                <Link style={{textDecoration:"none", color:'inherit', gridColumnStart: '2'}} to={"/users/" + props.author + "/posts/" + props.id}>
                    <TextContainer>
                        {props.content}
                    </TextContainer>   
                </Link>
            </div>
                <PostActions>
                    <StyledAction>
                        <Link style={{textDecoration:"none", color:'inherit', gridColumnStart: '2'}} to={"/users/" + props.author + "/posts/" + props.id}>
                        <i style={{marginRight: "5px", color: 'var(--background-primary)'}} className="far fa-comment"></i>{props.numberOfComments}
                        </Link>
                        </StyledAction>
                    <StyledAction onClick={handleLike}>
                        {alreadyLiked ? <i style={{marginRight: "5px", color: 'var(--background-primary)'}} className="fas fa-heart"></i> :
                        <i key={+new Date()} style={{marginRight: "5px", color: 'var(--background-primary)'}} className="far fa-heart"></i>}
                        {likes}
                    </StyledAction>
                </PostActions>
            <StyledDate>{props.date}</StyledDate>
        </StyledLi>
    );
}

export default PostItem;