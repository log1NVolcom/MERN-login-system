import { USER_LOGGED_IN, REQUEST_LOGIN } from "./types";
import axios from "axios";
import { saveState } from "../localStorage";

function startLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function endLogin(res) {
  return {
    type: USER_LOGGED_IN,
    payload: res
  };
}

export const login = credentials => dispatch => {
  dispatch(startLogin());

  return axios
    .post("/api/users/auth", credentials)
    .then(res => {
      dispatch(endLogin(res.data));
    })
    .catch(err => console.log("DEU ERRO " + err));
};
