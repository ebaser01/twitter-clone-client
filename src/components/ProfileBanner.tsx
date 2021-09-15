import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiRequest, reqMethod } from '../api/RequestHandler';
import { useAppSelector } from '../common/hooks';
import { Button } from './Buttons';


const Container = styled.div`
    position: relative;
    padding: 2rem 0;
    display: grid;
    grid-template-rows: 2fr 1fr 0.6fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    border-bottom: solid 1px #cccccc;
`;

const Img = styled.img`
    padding: 5px;
    border: solid 1px #444444;
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
    grid-column-start: span 3;
`;

const Username = styled.div`
    grid-column-start: span 3;
    width: 100%;
    text-align: center;
    border-bottom:1px solid #cccccc;
`;

const Stat = styled.div`
border-bottom: 1px solid #cccccc;
`;

const FollowButton = styled(Button)`
    position: absolute;
    right: 1rem;
`;

const ProfileBanner = (props: {username:string, image_url:string, followers: Array<string>,followingCount: number, postCount: number})=>{
    

    const [following, setFollowing] = useState<boolean>();
    const user = useAppSelector(state=> state.user);

    useEffect(()=>{

        setFollowing(props.followers.includes(user.id));

    },[])


    const handleFollow = async()=>{
        
        try {
            const response = await apiRequest(reqMethod.UPDATE, `user/${props.username}/follow`);
            setFollowing(!following);
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Container>
            {(props.username !== user.username && !following) && <FollowButton onClick={handleFollow} size="s">Follow</FollowButton>}
            {following && <FollowButton onClick={handleFollow} size="s">Unfollow</FollowButton>}
            <Img src={props.image_url}/>
            <Username>{props.username}</Username>
            <Stat>Posts: {props.postCount}</Stat>
            <Stat>Followers: {props.followers.length}</Stat>
            <Stat>Following: {props.followingCount}</Stat>
        </Container>
    );

}

export default ProfileBanner;