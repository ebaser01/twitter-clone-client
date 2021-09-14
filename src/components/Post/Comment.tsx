
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    margin-top: 10px;
    grid-column-start: 2;
`;

const Username = styled.div`
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


const Reply = styled.div`
    font-size: 0.8rem;
`;

const Comment = (props: {author:string, content:string, img:string, date:string, parent:string})=>{

    return(

        <StyledLi>
            
            <Link to={'/users/' + props.author}><StyledImg src={props.img} alt=""/></Link>
            <div>
                <Username> <StyledLink to={`/user/` + props.author}>{props.author}</StyledLink></Username>
                <Reply>Replying to <Link style={{textDecoration: 'none', color:"inherit"}} to={`/user/${props.parent}`}>@{props.parent}</Link></Reply>
                <TextContainer>
                    {props.content}
                </TextContainer>   
                
            </div>
            <StyledDate>{props.date}</StyledDate>
        </StyledLi>
    );
}

export default Comment;