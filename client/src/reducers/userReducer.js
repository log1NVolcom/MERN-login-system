import { USER_LOGGED_IN, USER_REGISTED } from "../actions/types";
const initialState = {
  user: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        user: action.payload,
        loading: false
      };
    case USER_REGISTED:
      return {
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
