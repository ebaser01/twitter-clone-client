import styled from 'styled-components';


export const StyledInput = styled.input`

    font-family: inherit;
    font-size: 1rem;
    color: #000000;
    height: 3rem;
    width: 16rem;
    padding-left: 1rem;
    outline: 1px solid var(--light-gray);
    border: none;
    background-color: #ffffff;
    transition: .1s cubic-bezier(.65,.05,.36,1);

    &:not(:placeholder-shown) ~ label,
    &:focus ~ label{
        transform: translateX(-50%) translateY(-50%);

        top: 0px;
        left: 50%;
        font-size: 0.8rem;
        color: #000000;
    };

    &:focus{
        outline: 1px solid var(--background-primary);
    };

    &[type='file']{
        line-height: 3rem;
    }
`;