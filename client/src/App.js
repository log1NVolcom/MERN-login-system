import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import { Provider } from "react-redux";
import store from "./store";

import history from "./history";

class App extends Component {
  componentDidMount() {}
  async setData(data) {
    await localStorage.setItem("SessionUserName", data.user.name);
    await localStorage.setItem("SessionUserEmail", data.user.email);
    await localStorage.setItem("SessionUserUsername", data.user.username);
    await localStorage.setItem("SessionUserLogged", data.sucess);
  }

  loggedIn() {
    const sta = store.getState();
    if (sta.user.user.sucess) {
      this.setData(sta.user.user);
      return true;
    } else {
      if (localStorage.getItem("SessionUserLogged")) {
        return true;
      } else {
        return false;
      }
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="ui container">
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Register" exact component={Register} />
            <Route
              path="/Dashboard"
              render={() =>
                !this.loggedIn() ? <Redirect to="/" /> : <Dashboard />
              }
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
