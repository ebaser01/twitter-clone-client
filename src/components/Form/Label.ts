import styled from "styled-components";

export const StyledLabel = styled.label`


    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    background-color: #ffffff;

    color: var(--dark-gray);
    text-align: center;
    transition: .2s cubic-bezier(.65,.05,.36,1);
    pointer-events: none;
    padding: 0 2px;

`;