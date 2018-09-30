import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {addFriend} from '../../actions/addFriendActions';

class AddFriendPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({
      newUser: {...this.state.newUser, [e.target.name]: e.target.value},
    });
  }

  onLogout() {
    localStorage.removeItem('userToken');
    this.props.history.go('/');
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addFriend(this.state.newFriend).then(msg => {
      this.props.history.push('/Dashboard');
    });
  }

  render() {
    const {friends} = this.state.user;
    return (
      <div>
        <div> ADD FRIEND </div>

        {friends.map(elem => (
          <ul key={elem}> {elem}</ul>
        ))}
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
