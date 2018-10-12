import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import RegisterPage from './components/Register/RegisterPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import EditProfilePage from './components/EditProfile/EditProfilePage';
import AddFriendPage from './components/AddFriend/AddFriendPage';

const loggedIn = localStorage.getItem('userToken') !== null;
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/Login"
        render={() =>
          !loggedIn ? <LoginPage /> : <Redirect to="/Dashboard" />
        }
      />
      <Route
        exact
        path="/Register"
        render={() =>
          !loggedIn ? <RegisterPage /> : <Redirect to="/Dashboard" />
        }
      />
      <Route
        exact
        path="/Dashboard"
        render={() => (loggedIn ? <DashboardPage /> : <Redirect to="/" />)}
      />
      <Route
        exact
        path="/EditProfile"
        render={() => (loggedIn ? <EditProfilePage /> : <Redirect to="/" />)}
      />
      <Route
        exact
        path="/AddFriend"
        render={() => (loggedIn ? <AddFriendPage /> : <Redirect to="/" />)}
      />
    </Switch>
  </Router>
);
export default Routes;
