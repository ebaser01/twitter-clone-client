import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiRequest, reqMethod } from '../../api/RequestHandler';
import { IAuthorType } from '../../common/type';
import { StyledImg } from '../Post/ProfilePic';





const Container = styled(Link)`
    text-decoration: none;
    display: flex;
    padding: 1rem;
    align-items: center;
    border-bottom: solid 1px #cccccc;
    color: inherit;
    &:visited{
        color: inherit;
    }
`;

const Username = styled.div`
    margin: 0rem 1rem;
`;

const UserList = ()=>{

    const [userList, setUserList] = useState<Array<IAuthorType>>();

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try {
                const response = await apiRequest(reqMethod.GET, 'user');
                setUserList(response?.data.userList);
                console.log(response?.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsers();

    },[])


    return(
        <ul style={{borderRight: 'solid 1px #cccccc'}}>
            {userList && userList.map((e,index)=>{
                return(
                    <li key={e.username}>
                        <Container to={'/users/' + e.username}>
                        <StyledImg src={e.image_url}></StyledImg> 
                        <Username>{e.username}</Username>
                        </Container>
                    </li>
                )
            })}       
        </ul>
        
    )
}


export default UserList;