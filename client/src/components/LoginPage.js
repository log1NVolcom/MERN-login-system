import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
		data:{ 
			username: "",
			password: ""}
    
    };
  }

  handleChange(e) {
    this.setState({
      data: { ...this.state, [e.target.name]: e.target.value }
    });
  }
  handleSubmit() {
    this.props.login(this.state);
    console.log("fiz o login");
  }

  render() {
	  console.log(this.props);
    return (
	
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username-label">Username</label>
          <input
            id="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password-label">Password</label>
          <input
            id="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button>Log ing</button>
        </form>
      </div>
    );
  }
}
export default LoginPage;
