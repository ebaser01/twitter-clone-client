import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0%{transform: translateX(-1rem);}
    33% {transform: translateX(1rem);}
    66% {transform: translateX(-1rem);}
    100% {transform: translateX(0);}
`;

export const StyledError = styled.div`
    text-align: center;
    background-color: rgba(255,50,0,0.9);
    font-weight: bold;
    font-size: 0.8rem;
    color: #ffffff;
    width: 100%;
    width: 16rem;
    padding: 0.9rem;
    margin: 5px 0px;
    line-height: 1.2rem;
    animation: ${fadeIn} 0.3s cubic-bezier(.56,.02,.25,1);

    &:first-letter {
    text-transform:capitalize;
    }
;
`;

