import { USER_LOGGED_IN } from "./types";
import axios from "axios";
import history from "../history";

export const login = credentials => async dispatch => {
  await axios.post("/api/users/auth", credentials).then(res => {
    dispatch({
      type: USER_LOGGED_IN,
      payload: res.data
    });
    localStorage.clear();
    if (res.data.sucess) history.push("/");
    else localStorage.setItem("payload", res.data.msg);
  });
};
