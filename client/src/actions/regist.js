import { USER_REGISTED } from "./types";
import axios from "axios";

export const register = data => dispatch => {
  axios.post("/api/users/register", data).then(res => {
    dispatch({
      type: USER_REGISTED,
      payload: res.data
    });
  });
};
