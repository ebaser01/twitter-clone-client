import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink =  styled(Link)`
    font-size: 0.9rem;
    color: black;
    text-decoration: none;
    display: block;
    text-align: center;
    &:visited{
        color: black;
    }

    &:hover{
        text-decoration: underline;
        color: var(--background-primary)
    }
`;