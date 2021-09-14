import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import { StyledError } from '../components/Form/Error';
import { StyledForm } from '../components/Form/Form';
import { StyledRow } from '../components/Form/FormRow';
import { StyledInput } from '../components/Form/Input';
import { StyledLabel } from '../components/Form/Label';
import { StyledLink } from '../components/Form/Link';
import checkmark from '../components/Form/icons/green-checkmark.svg'
import axios from 'axios';
import { useAppSelector } from '../common/hooks';
import Header from '../components/Header';
import { API_PREFIX } from '../api/RequestHandler';

const StyledSignup = styled.div`
    width: fit-content;
    margin: 50px auto;
`;

const Checkmark = styled.img.attrs(props=>({
    src: checkmark,
}))`
    position: absolute;
    width: 25px;
    right: 10px;
    top: 10px;
`;

interface IErrorType {
    mail: string, 
    password: string, 
    passwordConfirmation: string,
    userName: string,
    existance: string,
}


const Signup = ()=>{

    const [errors, setErrors] = useState<IErrorType>({mail: "", password: "",passwordConfirmation: "", userName: "", existance: ""});
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const user = useAppSelector(state=> state.user);
    const history = useHistory();

    if(user.isAuth) return <Redirect to="/" />;

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        if(errors.mail==="ok" && errors.password==="ok" && errors.passwordConfirmation ==="ok" && errors.userName==="ok"){

            let formData = new FormData();
            formData.append('username', (e.currentTarget.elements[0] as HTMLInputElement).value);
            formData.append('email', (e.currentTarget.elements[1] as HTMLInputElement).value);
            formData.append('password', (e.currentTarget.elements[2] as HTMLInputElement).value);
            formData.append('passwordConfirmation', (e.currentTarget.elements[3] as HTMLInputElement).value);
            if(e.currentTarget.elements[4] !== null){
                formData.append('profileImg', ((e.currentTarget.elements[4] as HTMLInputElement)?.files as FileList)[0]);
            }
        
            setIsloading(true);
            setErrors({mail: "", password: "",passwordConfirmation: "", userName: "", existance: ""});

            axios({
                method: "post",
                url: `${API_PREFIX}/signup`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data"}
            })
                .then((response)=>{
                    setSuccess(true);
                    setIsloading(false)
                    setTimeout(() => {
                        history.push('/login');
                      }, 3000);
                })
                .catch((err)=>{
                    setErrors({...errors, existance: `${err.response.data.msg}`});
                    setIsloading(false)
                });
        }
        else if(errors.mail==="" || errors.password==="" || errors.passwordConfirmation ==="" || errors.userName===""){
            Array.from(e.currentTarget.elements).some((e)=>{
                return !validateForm(e as HTMLInputElement);
            });
            
            e.preventDefault();
        }

    }

    const validateuserName = (userName: string): boolean => /^[A-Za-z0-9_]{5,}$/.test(userName);
    const validateMail = (mail: string): boolean => /^\S+@\S+$/.test(mail);
    const validatePassword = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

    const validateForm = (e: {name: string, value: string})=>{
        
        

        if(e.name==='username' && !validateuserName(e.value)){
            setErrors({...errors, userName: "Username must be minimum 5 characters."});
            return false;
        }
        else if(e.name==='email' && !validateMail(e.value)){
            setErrors({...errors, mail: "Please enter a valid email address."})
            return false;
        }
        else if(e.name==='password' && !validatePassword(e.value)){
            setErrors({...errors, password: "Your password must be minimum eight characters, and contain at least one uppercase letter, one lowercase letter and one number"})
            return false;
        }
        else if(e.name==='passwordConfirmation' && e.value!==password){
            setErrors({...errors, passwordConfirmation: "Passwords do not match"});
            return false;
        }

        return true;
    }

    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    
        validateForm({name: e.currentTarget.name, value: e.currentTarget.value});
        
        e.preventDefault();
    }

    const validateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        
        if(e.currentTarget.name==='username' && validateuserName(inputValue)){
            setErrors({...errors, userName: "ok"});
        }
        else if(e.currentTarget.name==='email' && validateMail(inputValue)){
            setErrors({...errors, mail: "ok"})
        }
        else if(e.currentTarget.name==='password'){
            setPassword(inputValue);
            if(validatePassword(inputValue)) setErrors({...errors, password: "ok"});   
        }
        else if(e.currentTarget.name==='passwordConfirmation' && inputValue===password){
            setErrors({...errors, passwordConfirmation: "ok"})
        }

    
        
        
        e.preventDefault();
    }
    

    return(
        <>
        <Header/>
        <StyledSignup>
            
            
            <StyledForm name="form" method="post"  onSubmit={handleSubmit} noValidate>

            {success && <StyledError style={{'backgroundColor': 'green'}}>Signed in succesfully. Redirecting...</StyledError>}    
            {errors.existance!=="" && <StyledError>{errors.existance}</StyledError>}

                <StyledRow>
                    <StyledInput name="username" placeholder=" "  onChange={validateChange} onBlur={handleBlur} type={'text'} />
                    <StyledLabel>Username</StyledLabel>
                    {errors.userName==="ok" && <Checkmark/>}
                </StyledRow>

                {errors.userName.length>2 && <StyledError>{errors.userName}</StyledError>}
                

                <StyledRow>
                    <StyledInput name="email" placeholder=" " type="email"  onChange={validateChange} onBlur={handleBlur}/>
                    <StyledLabel>Email</StyledLabel>
                    {errors.mail==="ok" && <Checkmark/>}
                </StyledRow>

                {errors.mail.length>2 && <StyledError>{errors.mail}</StyledError>}

                <StyledRow>
                    <StyledInput name="password" placeholder=" " type="password"  onChange={validateChange} onBlur={handleBlur} />
                    <StyledLabel>Password</StyledLabel>
                    {errors.password==="ok" && <Checkmark/>}
                </StyledRow>

                {errors.password.length>2 && <StyledError>{errors.password}</StyledError>}
                
                <StyledRow>
                    <StyledInput name="passwordConfirmation" placeholder=" " type="password" onChange={validateChange} onBlur={handleBlur}/>
                    <StyledLabel>Confirm password</StyledLabel>
                    {errors.passwordConfirmation==="ok" && <Checkmark/>}
                </StyledRow>

                {errors.passwordConfirmation.length>2 && <StyledError>{errors.passwordConfirmation}</StyledError>}

                <StyledRow>
                    <StyledInput name="profileImg"  type="file" accept=".png, .jpg, .jpeg"/>
                    <StyledLabel> Avatar(Optional) </StyledLabel>
                </StyledRow>

               
                
                <Button size={'xl'} disabled={isLoading} >Sign up {isLoading && <i className="fa fa-spinner fa-spin"></i>} </Button>

                <StyledLink to="/login" className="form-link">Already a member?</StyledLink> 

            </StyledForm>
              
        </StyledSignup>
        </>
    );
}


export default Signup;