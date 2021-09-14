import React from 'react';
import { ResetCss } from './common/ResetCss';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';





function App() {

  return (
    <div className="App">
      <ResetCss/>
      <Router>
        <Switch>
         
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/" component={HomePage}/>
          <Route><Redirect to="/404" /></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
