import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import img1 from './Images/img1.jpg';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import ProfileNavbar from './ProfileNavbar';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {editUser} from '../../actions/editProfileActions';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    marginTop: 10,
    marginBottom: 2,
  },
  avatar: {
    margin: 5,
  },
  bigAvatar: {
    width: 200,
    height: 200,
  },
  paper: {},
  description: {
    marginTop: 30,
  },
  button: {
    marginTop: -10,
  },
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      newUser: {
        name: '',
        email: '',
        username: '',
      },
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

  setInputState(event, n) {
    const {
      target: {value},
    } = event;

    this.setState({
      newUser: {...this.state.newUser, [n]: value},
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.editUser(this.state.newUser);
  }

  render() {
    const {classes} = this.props;
    const {name, email, username} = this.state.user;
    console.log('STATE: ');
    console.log(this.state);
    console.log('PROPS: ');
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
              <Typography variant="display2" gutterBottom>
                Make your changes:
              </Typography>
              <Divider />
              <FormControl fullWidth className={classes.input}>
                <InputLabel>Name</InputLabel>
                <Input
                  id="Name"
                  placeholder={name}
                  onChange={e => this.setInputState(e, 'name')}
                />
              </FormControl>
              <Divider />

              <FormControl fullWidth className={classes.input}>
                <InputLabel>email</InputLabel>
                <Input
                  id="email"
                  placeholder={email}
                  onChange={e => this.setInputState(e, 'email')}
                />
              </FormControl>
              <Divider />

              <FormControl fullWidth className={classes.input}>
                <InputLabel>username</InputLabel>
                <Input
                  id="username"
                  placeholder={username}
                  value={this.state.newUsername}
                  onChange={e => this.setInputState(e, 'username')}
                />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} align="center" />
          <Grid item xs={6} sm={8} className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onClick}>
              Save Data
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  {editUser},
)(withStyles(styles)(EditProfile));
