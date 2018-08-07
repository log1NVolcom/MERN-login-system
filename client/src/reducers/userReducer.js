import { USER_LOGGED_IN, USER_REGISTED, REQUEST_LOGIN } from "../actions/types";

const initialState = {
  info: {},
  isloading: false,
  loginSucess: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...initialState, isloading: true };

    case USER_LOGGED_IN:
      return {
        ...state,
        info: action.payload,
        loginSucess: true,
        isloading: false
      };

    case USER_REGISTED:
      return {
        info: action.payload
      };
    default:
      return state;
  }
}
