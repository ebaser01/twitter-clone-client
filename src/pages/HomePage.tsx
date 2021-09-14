import React from 'react';
import {Route, Switch } from 'react-router-dom';
import MainLayout from './MainLayout';
import Navigation from '../components/Navigation';
import PostList from '../components/Post/PostList';
import PostDetail from '../components/Post/PostDetail';
import ProfilePage from './ProfilePage';
import UserList from '../components/User/UserList';




const HomePage = ()=>{


    return(
        <MainLayout>
            <Navigation/>
            <Switch>
                <Route exact path="/" component={PostList}/>
                <Route path="/users/:userId/posts/:postId" component={PostDetail}/>
                <Route path="/users/:userId/" component={ProfilePage}/>
                <Route path="/search/" component={UserList}/>
            </Switch>
           
        </MainLayout>
    )
}


export default HomePage;