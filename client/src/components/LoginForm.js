import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";

class LoginForm extends Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    isLoading: false,
    errors: {},
    err: ""
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  async getData() {
    try {
      await this.props.login(this.state.data);

      return await localStorage.getItem("payload");
    } catch (error) {
      console.log(error);
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ isloading: true });

       this.getData().then(res => {
		if(res)
			this.setState({ err: res });
		});;
		
    

      this.setState({ isloading: false });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, isloading, err } = this.state;
    //localStorage.removeItem("payload");
    return (
      <Form onSubmit={this.onSubmit} loading={isloading}>
        {err && (
          <Message negative>
            <Message.Header>Wrong Credentials</Message.Header>
			 <p>{err}</p>
          </Message>
        )}
        <Form.Field error={!!errors.username}>
          <label>Username</label>
          <input
            id="username"
            name="username"
            placeholder="Enter Username"
            value={data.username}
            onChange={this.onChange}
          />
          {errors.username && <InlineError text={errors.username} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(LoginForm);
