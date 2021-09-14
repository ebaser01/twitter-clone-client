import React from 'react';
import styled from 'styled-components';


const StyledHeader = styled.header`
    font-size: 50px;
    text-align: center;
    padding: 2rem;
`;



const Header = ()=>{

    return(
        <StyledHeader>
            OdinBook
        </StyledHeader>
    );

}

export default Header;