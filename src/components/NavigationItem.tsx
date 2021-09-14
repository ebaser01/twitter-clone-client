import React from 'react';
import styled from 'styled-components';



interface INavigationItem {
    text: string,
    icon: string,
}

const StyledListItem = styled.li`
    font-size: 1.2rem;
    padding: 1rem;
    width: fit-content;
    border-radius: 99999px;
    transition: all .2s;
    &:hover{
        background-color: #e4e4e4;
        cursor: pointer;
    }
`;

const StyledSpan = styled.span`
    margin-left: 1rem;
`;



const NavigationItem = ({text, icon}: INavigationItem)=>{



    return(
        <StyledListItem>
            
                <i className={"fas " + icon}></i>
                <StyledSpan>{text}</StyledSpan>
            
            
        </StyledListItem>
    );
};

export default NavigationItem;