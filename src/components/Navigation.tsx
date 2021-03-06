import React, { useState} from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { logout } from '../features/user/usersSlice';
import { Button } from './Buttons';
import NavigationItem from './NavigationItem';

const slideDown = keyframes`
    from {
        transform: translateY(-4rem);
    }
    to {
        transform: translateY(0);
    }
`;

const Container = styled.div`
    border-right: 1px solid #cccccc;
    @media (max-width:768px){
        position: fixed;
        z-index: 9999;
        right: 0;
        width: 100%;
        top: 0;
        border: none;
    }
    
`;


const StyledNav = styled.div<{navActive:boolean}>`
    position: sticky;
    min-width: 250px;
    top: 0px;
    padding: 5rem 2rem;
    margin-left:15px;
    @media (max-width:768px){
        position: relative;
        justify-content: center;
        display: ${props => props.navActive ? "flex" : "none"};
        animation: ${slideDown} .5s;
        
    }

`;



const StyledHamburger = styled.button<{navActive: boolean}>`
    border: none;
    background: none;
    width: 2rem;
    position: absolute;
    left: 1.3rem;
    top: 1rem;
    z-index: 9999;
    @media (min-width:768px){
       display: none;
    }

    &:hover{
        cursor: pointer;
    }
`;



const Background = styled.div<{navActive:boolean}>`
    position: absolute;
    border-radius: 50%;
    top: 1rem;
    right: 1rem;
    width: 10px;
    height: 10px;
    z-index: -1;
    transition: all .2s;
    display: ${props=> props.navActive? "initial" : "none"};
    opacity: ${props=> props.navActive? "1" : "0"};
    background-color: var(--background-primary);
    transform: ${props=> props.navActive? "scale(250)" : "scale(10)"};
    @media (min-width:768px){
       display: none;
    }
`;


const WhiteButton = styled(Button)`

    @media (max-width: 768px){
        background-color: white;
        color: var(--primary-background)
    }
    
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &:visited{
        color: inherit;
    }
    &.${props=> props.activeClassName}{
        text-decoration: none;
        font-weight: bold;
        color:#1DA1F2;
    }
    @media (max-width:768px){
        width: 100%;
        display: inherit;
    }
`;

const Navigation = ()=>{

    const [navActive, setNavActive]  = useState(false);
    const history = useHistory();

    const username = useAppSelector(state=>state.user.username);
    const dispatch = useAppDispatch();

    
    const handleStatus = ()=>{
        setNavActive(!navActive);
    }

    const handleLogout = async ()=>{
        await dispatch(logout());
        history.go(0);
    }


    
    return(
        <Container>
            <StyledHamburger navActive={navActive} onClick={handleStatus} ><i className={"fas fa-2x" + (navActive? " fa-times" : " fa-bars")}></i></StyledHamburger>
            <Background navActive={navActive}/>
            <StyledNav navActive={navActive}>
                <ul>
                <StyledNavLink exact to="/"  activeClassName='nav-active' ><NavigationItem text={"Home"} icon={"fa-home"}/></StyledNavLink>
                <StyledNavLink to="/search"  activeClassName='nav-active' onClick={handleStatus}><NavigationItem text={"Search"} icon={"fa-search"}/></StyledNavLink>
                <NavigationItem text={"Notifications"} icon={"fa-bell"}/>
                <StyledNavLink exact to={'/users/' + username} activeClassName='nav-active' onClick={handleStatus}><NavigationItem text={"Profile"} icon={"fa-user"}/></StyledNavLink>
                <WhiteButton size={'xl'} onClick={handleLogout}>Logout </WhiteButton>
                </ul>
            </StyledNav>
            
        </Container>
      
    );
}

export default Navigation;