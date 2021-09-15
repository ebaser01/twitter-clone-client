
import styled from 'styled-components';

const MainLayout = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 4fr 2fr;
    margin: 0 auto;
    width: 1280px;
    height: 100%;
    
    @media (max-width:1280px){
        grid-template-columns: 1.5fr 4fr;
        width: 960px;
    }
    @media (max-width:960px){
        width: 100%;
    }
    @media (max-width:768px){
        width: 100%;
        display: inherit;
        margin-top: 50px;
    }
`;

export default MainLayout;