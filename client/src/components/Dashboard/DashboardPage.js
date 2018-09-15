import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import img1 from './Images/img1.jpg';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import ProfileNavbar from './ProfileNavbar';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '10px',
    marginLeft: '10px',
    flexGrow: 1,
  },

  avatar: {
    margin: 5,
  },
  bigAvatar: {
    width: 200,
    height: 200,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  description: {
    marginTop: 30,
  },
  menu: {
    backgroundColor: grey[300],
    marginLeft: 20,
  },
});

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      user: {},
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
  onLogout() {
    localStorage.removeItem('userToken');
    this.props.history.go('/');
  }
  onEditProfile() {
    this.props.history.go('/EditProfile');
  }

  render() {
    const {classes} = this.props;
    const {name} = this.state.user;
    console.log(this.props);
    return (
      <div>
        <ProfileNavbar logout={this.onLogout} />
        <Grid container spacing={40}>
          <Grid item xs={12} sm={3} align="center">
            <Avatar
              alt="User"
              src={img1}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <Typography variant="headline" gutterBottom>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={8} className={classes.description}>
            <Paper className={classes.paper} elevation={5}>
              <Typography variant="display1" align="center">
                Aqui provavelmente meto uma descriçao ou post que o user fez! !
                ! ! ! ! ! ! ! ! 1 1 1 1 1
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} align="center">
            <MenuList className={classes.menu}>
              <MenuItem onClick={this.onEditProfile}>Edit Profile</MenuItem>
              <Divider />
              <MenuItem>My account</MenuItem>
              <Divider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Grid>
        </Grid>
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

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(DashboardPage)),
);
