import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>HOME PAGE</h1>
        <Link to="/Login"> SingIn </Link>
        <Link to="/Register"> SignUp </Link>
        <h1>O João Ferreira é PATO!!!!!!!!!!: </h1>
      </div>
    );
  }
}
export default Home;
