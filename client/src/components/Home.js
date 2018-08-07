import React, { Component } from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1>HOME PAGE</h1>
    <Link to="/Login">LogIn </Link>
    <Link to="/Register"> SigIn </Link>
  </div>
);

/*
class Home extends Component {
  render() {
    return (
      <div>
        <h1>HOME PAGE</h1>
        <Link to="/Login">LogIn </Link>
        <Link to="/Register"> SigIn </Link>
      </div>
    );
  }
}*/

export default Home;
