import {
  SET_EDITPROFILE_PENDING,
  SET_EDITPROFILE_SUCESS,
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

function setEditProfileSucess(isEditProfileSucess, msg) {
  return {
    type: SET_EDITPROFILE_SUCESS,
    isEditProfileSucess,
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
    dispatch(setEditProfileSucess(false));
    dispatch(setEditProfileError(null));
    await axios.post('/api/users/editProfile', data).then(res => {
      dispatch(setEditProfilePending(true));
      if (!res) {
        dispatch(setEditProfileError('Servor Error'));
      } else {
        dispatch(setEditProfileSucess(true, res));
      }
    });
  };
}
