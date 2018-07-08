import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="ui container">
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Register" exact component={Register} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
