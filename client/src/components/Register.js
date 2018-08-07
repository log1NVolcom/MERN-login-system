import React, { Component } from "react";
import Registerform from "../components/RegisterForm";

class Register extends Component {
  render() {
    return (
      <div>
        <h1>Register PAGE</h1>
        <Registerform submit={this.submit} />
      </div>
    );
  }
}

export default Register;
