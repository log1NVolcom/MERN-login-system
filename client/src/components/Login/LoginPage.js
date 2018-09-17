import React, {Component} from 'react';
import {login} from '../../actions/logActions';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from './InlineError';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: {},
      data: {
        username: '',
        password: '',
      },
    };
  }
  handleChange(e) {
    e.preventDefault();

    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    let credentials = this.state.data;
    if (Object.keys(errors).length === 0) {
      this.props.login(credentials).then(() => {
        if (this.props.isLoginSuccess) {
          if (typeof this.props.loginData !== 'undefined') {
            localStorage.setItem('userToken', this.props.loginData);
            this.props.history.go('/Dashboard');
          } else {
            this.setState({err: 'Wrong Username or Password'});
          }
        }
      });
    }
  }

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    console.log(this.props);
    const {data, errors} = this.state;
    const {isLoginPending, loginError} = this.props;
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <Form onSubmit={this.handleSubmit} loading={isLoginPending}>
          {loginError && (
            <Message negative>
              <Message.Header>Wrong Credentials : </Message.Header>
              <p>{loginError}</p>
            </Message>
          )}
          <Form.Field error={!!errors.username}>
            <label>Username</label>
            <input
              id="username"
              name="username"
              placeholder="Enter Username"
              value={data.username}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button primary>Login</Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoginPending: state.User.isLoginPending,
    isLoginSuccess: state.User.isLoginSuccess,
    loginError: state.User.loginError,
    loginData: state.User.loginData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginPage),
);
