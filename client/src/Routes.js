import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import RegisterPage from './components/Register/RegisterPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import history from './history';

const loggedIn = localStorage.getItem('userToken') !== null;
const enterLogin = localStorage.getItem('userToken') === null;
const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/Login"
        render={() =>
          enterLogin ? <LoginPage /> : <Redirect to="/Dashboard" />
        }
      />
      <Route exact path="/Register" component={RegisterPage} />
      <Route
        exact
        path="/Dashboard"
        render={() => (loggedIn ? <DashboardPage /> : <Redirect to="/" />)}
      />
    </Switch>
  </Router>
);
export default Routes;
