import styled from 'styled-components';



interface ButtonProps {
    readonly size: String;
}

export const Button = styled.button<ButtonProps>`
    width: ${(props)=>{
        switch(props.size){
            case 's': 
                return '6rem';
            case 'm':
                return '10rem';
            case 'l': 
                return '14rem';
            case 'xl':
                return '18rem';
        }
    }};
    height: 2rem;
    padding: 0.5rem;
    margin: 1rem 0.2rem;
    background-color: var(--background-primary);
    color: white;
    border-radius: 1rem;
    border: none;

    &:hover{
        background-color: white;
        color: #444444;
        border: solid 1px var(--background-primary);
        transition: transform .5s;
        cursor: pointer;
    }
`;