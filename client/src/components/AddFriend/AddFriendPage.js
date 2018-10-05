import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {addFriend} from '../../actions/addFriendActions';
import ProfileNavbar from './ProfileNavbar';
import './styles.css';

class AddFriendPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onProfile = this.onProfile.bind(this);
    this.state = {
      user: {
        friends: [],
      },
      newFriend: '',
    };
  }
  componentDidMount() {
    const auth = this.props.loginData;
    const headers = {
      Authorization: auth,
    };
    const config = {
      headers,
    };
    axios.get('/api/users/profile', config).then(res => {
      this.setState({user: res.data.user});
    });
  }

  handleChange(e) {
    this.setState({...this.state.newFriend, [e.target.name]: e.target.value});
  }

  onLogout() {
    localStorage.removeItem('userToken');
    this.props.history.go('/');
  }

  onProfile() {
    this.props.history.push('/Dashboard');
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addFriend(this.state).then(msg => {
      this.props.history.go('/AddFriend');
    });
  }

  render() {
    const {friends} = this.state.user;
    return (
      <div>
        <ProfileNavbar logout={this.onLogout} profile={this.onProfile} />

        <ul className="friendsList">
          <h2 className="friendTitle"> Friends </h2>
          {friends.map(elem => (
            <li key={elem}> {elem}</li>
          ))}
        </ul>
        <form className="addFriendForm" onSubmit={this.handleSubmit}>
          <label className="addFriendLabel">
            Username:
            <input
              type="text"
              value={this.state.value}
              name="newFriend"
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>Add Friend</button>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginData: state.User.loginData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFriend: data => dispatch(addFriend(data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddFriendPage),
);
