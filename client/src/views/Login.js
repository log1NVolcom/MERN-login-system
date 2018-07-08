import React, { Component } from "react";
import LoginForm from "../components/LoginForm";

class Login extends Component {
  render() {
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

export default Login;
