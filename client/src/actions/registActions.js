import axios from 'axios';
import {
  SET_REGIST_PENDING,
  SET_REGIST_SUCCESS,
  SET_REGIST_ERROR,
} from './actionsTypes';

function setRegistPending(isRegistPending) {
  return {
    type: SET_REGIST_PENDING,
    isRegistPending,
  };
}

function setRegistSucess(isRegistSuccess, msg) {
  return {
    type: SET_REGIST_SUCCESS,
    isRegistSuccess,
    msg,
  };
}

function setRegistError(registError) {
  return {type: SET_REGIST_ERROR, registError};
}

export function register(data) {
  return async dispatch => {
    dispatch(setRegistPending(true));
    dispatch(setRegistSucess(false, null));
    dispatch(setRegistError(null));

    await axios.post('/api/users/register', data).then(res => {
      dispatch(setRegistPending(false));
      if (!res) dispatch(setRegistError('Server Error'));
      else dispatch(setRegistSucess(true, res));
    });
  };
}
