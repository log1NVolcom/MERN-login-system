import axios from 'axios';
import {
  SET_ADDFRIEND_PENDING,
  SET_ADDFRIEND_SUCCESS,
  SET_ADDFRIEND_ERROR,
} from './actionsTypes';

function setAddFriendPending(isAddFriendPending) {
  return {
    type: SET_ADDFRIEND_PENDING,
    isAddFriendPending,
  };
}

function setAddFriendSucess(isAddFriendSuccess, msg) {
  return {
    type: SET_ADDFRIEND_SUCCESS,
    isAddFriendSuccess,
    msg,
  };
}

function setAddFriendError(AddFriendError) {
  return {type: SET_ADDFRIEND_ERROR, AddFriendError};
}

export function addFriend(data) {
  return async dispatch => {
    dispatch(setAddFriendPending(true));
    dispatch(setAddFriendSucess(false, null));
    dispatch(setAddFriendError(null));

    await axios.post('/api/users/addFriend', data).then(res => {
      dispatch(setAddFriendPending(false));
      if (!res) dispatch(setAddFriendError('Server Error'));
      else dispatch(setAddFriendSucess(true, res));
    });
  };
}
