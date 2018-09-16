import {
  SET_EDITPROFILE_PENDING,
  SET_EDITPROFILE_SUCCESS,
  SET_EDITPROFILE_ERROR,
} from './actionsTypes';
import axios from 'axios';

//-------------------EDIT PROFILE-------------------------\\

function setEditProfilePending(isEditProfilePending) {
  return {
    type: SET_EDITPROFILE_PENDING,
    isEditProfilePending,
  };
}

function setEditProfileSuccess(isEditProfileSuccess, msg) {
  return {
    type: SET_EDITPROFILE_SUCCESS,
    isEditProfileSuccess,
    msg,
  };
}

function setEditProfileError(editProfileError) {
  return {
    type: SET_EDITPROFILE_ERROR,
    editProfileError,
  };
}

export function editUser(data) {
  return async dispatch => {
    dispatch(setEditProfilePending(true));
    dispatch(setEditProfileSuccess(false));
    dispatch(setEditProfileError(null));
    await axios.post('/api/users/editProfile', data).then(res => {
      dispatch(setEditProfilePending(false));
      if (!res) {
        dispatch(setEditProfileError('Servor Error'));
      } else {
        dispatch(setEditProfileSuccess(true, res));
      }
    });
  };
}
