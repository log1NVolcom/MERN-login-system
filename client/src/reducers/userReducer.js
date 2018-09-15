import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
} from '../actions/actionsTypes';

const initialState = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  loginData: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return {...state, isLoginPending: action.isLoginPending};

    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess,
        loginData: action.loginData,
      };

    case SET_LOGIN_ERROR:
      return {...state, loginError: action.loginError};

    case SET_EDITPROFILE_PENDING:
      return {...state, isEditProfilePending: action.isEditProfilePending};

    case SET_EDITPROFILE_SUCESS:
      return {...state, isEditProfileSucess: action.isEditProfileSucess};

    case SET_EDITPROFILE_ERROR:
      return {...state, editProfileError: action.editProfileError};

    default:
      return state;
  }
}
