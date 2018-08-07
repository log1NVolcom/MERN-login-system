import React, { Component } from "react";
import history from "../history";
import store from "../store";

export default class Dashboard extends Component {
  componentDidMount() {
    const sta = store.getState().user.user;

    if (sta.sucess) {
      this.setState({
        user: {
          name: sta.user.name,
          email: sta.user.email,
          username: sta.user.username
        }
      });
    } else {
      this.setState({
        user: {
          name: localStorage.getItem("SessionUserName"),
          email: localStorage.getItem("SessionUserEmail"),
          username: localStorage.getItem("SessionUserUsername")
        }
      });
    }
  }
  async onLogout() {
    await localStorage.removeItem("SessionUserName");
    await localStorage.removeItem("SessionUserEmail");
    await localStorage.removeItem("SessionUserUsername");
    await localStorage.removeItem("SessionUserLogged");

    history.push("/");
  }

  state = {
    user: {
      name: "",
      email: "",
      username: ""
    }
  };
  render() {
    const { name, email, username } = this.state.user;
    return (
      <div>
        <h1>DASHBOARD</h1>
        <h1>Nome:{name}</h1>
        <h1>Username:{username}</h1>
        <h1>Email:{email}</h1>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}
