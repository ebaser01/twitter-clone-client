import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { Button } from '../components/Buttons';
import { StyledError } from '../components/Form/Error';
import { StyledForm } from '../components/Form/Form';
import { StyledRow } from '../components/Form/FormRow';
import { StyledInput } from '../components/Form/Input';
import { StyledLabel } from '../components/Form/Label';
import { StyledLink } from '../components/Form/Link';
import Header from '../components/Header';
import { login } from '../features/user/usersSlice';

const StyledLogin = styled.div`
    width: fit-content;
    margin: 50px auto;
`;




const Login = ()=>{


    const dispatch = useAppDispatch();

    const user = useAppSelector(state=> state.user);

    if(user.isAuth) return <Redirect to="/" />;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        let username = (e.currentTarget.elements[0] as HTMLInputElement).value;
        let password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        dispatch(login({username,password}));
        
    }

    
    return(
        <>
        <Header/>
        <StyledLogin>
            
            <StyledForm name="form" onSubmit={handleSubmit} noValidate>
                {user.isError && <StyledError>"Username and password don't match"</StyledError>}
                
                <StyledRow>
                    <StyledInput name="username" placeholder=" "   type='text' />
                    <StyledLabel>Username</StyledLabel>
                </StyledRow>

                <StyledRow>
                    <StyledInput name="password" placeholder=" "   type='password' />
                    <StyledLabel>Password</StyledLabel>
                </StyledRow>

                <Button size={'xl'} > Login {user.loading && <i className="fas fa-spinner fa-spin"></i>} </Button>

                <StyledLink to="/signup" className="form-link">Sign up for Odinbook</StyledLink> 
            </StyledForm>
              
        </StyledLogin>
        </>
    )
}


export default Login;