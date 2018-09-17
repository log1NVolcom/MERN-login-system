import React, {Component} from 'react';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from './InlineError';
import {connect} from 'react-redux';
import {register} from '../../actions/registActions';
import {withRouter} from 'react-router-dom';
import store from '../../configureStore';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      data: {
        username: '',
        password: '',
        name: '',
        email: '',
      },
      isLoading: false,
      errors: {},
      err: '',
    };
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      this.props.register(this.state.data).then(() => {
        console.log(store.getState());
        console.log(this.props);
        if (this.props.isRegistSuccess) {
          if (this.props.msgRegist.data.sucess) {
            this.props.history.push('/Login');
          } else {
            this.setState({err: this.props.msgRegist.data.msg});
          }
        }
      });
    }
  }

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = "Can't be blank";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.name) errors.name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    return errors;
  };

  render() {
    const {data, errors, err, isloading} = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={isloading}>
        {err && (
          <Message negative>
            <Message.Header>{err} </Message.Header>
            <p>Username or email already exist</p>
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

const mapStateToProps = state => {
  return {
    isRegistPending: state.User.isRegistPending,
    isRegistSuccess: state.User.isRegistSuccess,
    registError: state.User.registError,
    msgRegist: state.User.msgRegist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: data => dispatch(register(data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RegisterPage),
);
