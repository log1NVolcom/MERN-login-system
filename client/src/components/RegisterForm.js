import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/regist";

class RegisterForm extends Component {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
      email: ""
    },
    isLoading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ isloading: true });
      this.props.register(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.name) errors.name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, isloading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={isloading}>
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

        <Form.Field error={!!errors.name}>
          <label>Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={data.name}
            onChange={this.onChange}
          />
          {errors.name && <InlineError text={errors.name} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label>email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Button primary>Regist</Button>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
};

export default connect(
  null,
  { register }
)(RegisterForm);
