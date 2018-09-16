import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  SET_REGIST_PENDING,
  SET_REGIST_SUCCESS,
  SET_REGIST_ERROR,
  SET_EDITPROFILE_PENDING,
  SET_EDITPROFILE_SUCCESS,
  SET_EDITPROFILE_ERROR,
} from '../actions/actionsTypes';

const initialState = {
  /* isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  loginData: {},*/
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

    case SET_REGIST_PENDING:
      return {...state, isRegistPending: action.isRegistPending};

    case SET_REGIST_SUCCESS:
      return {
        ...state,
        isRegistSuccess: action.isRegistSuccess,
        msgRegist: action.msg,
      };

    case SET_REGIST_ERROR:
      return {...state, registError: action.registError};

    case SET_EDITPROFILE_PENDING:
      return {...state, isEditProfilePending: action.isEditProfilePending};

    case SET_EDITPROFILE_SUCCESS:
      return {
        ...state,
        isEditProfileSuccess: action.isEditProfileSuccess,
        msg: action.msg,
      };

    case SET_EDITPROFILE_ERROR:
      return {...state, editProfileError: action.editProfileError};

    default:
      return state;
  }
}
