import { RouteProps } from "react-router-dom";



interface IUserState{
    id: string,
    isError: boolean,
    isAuth: boolean,
    username: string,
    profileImgUrl: string, 
    loading: boolean,
    following: Array<string>,
    followed: Array<string>,
}


interface IAuthorType{
    following: any;
    followed: any;
    username: string,
    image_url: string,
}

interface IPost{
    author: IAuthorType,
    created: string,
    content: string,
    _id: string,
    comments: Array<string>;
    likes: Array<string>;
}


