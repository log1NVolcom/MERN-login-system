import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
} from './actionsTypes';
import axios from 'axios';

//---------Login----------------\\

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending,
  };
}

function setLoginSuccess(isLoginSuccess, loginData) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess,
    loginData,
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError,
  };
}

export function login(credentials) {
  return async dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    await axios.post('/api/users/login', credentials).then(res => {
      dispatch(setLoginPending(false));
      if (!res) {
        dispatch(setLoginError('Server Error'));
      } else {
        dispatch(setLoginSuccess(true, res.data.token));
      }
    });
  };
}

//-------------------Logout------------------\\
