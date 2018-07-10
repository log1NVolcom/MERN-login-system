import { USER_LOGGED_IN } from "./types";
import axios from "axios";
import history from "../history";
import store from "../store";
async function setData() {
  const sta = store.getState();
  try {
    await localStorage.setItem("SessionUserName", sta.user.user.user.name);
    await localStorage.setItem("SessionUserEmail", sta.user.user.user.email);
    await localStorage.setItem(
      "SessionUserUsername",
      sta.user.user.user.username
    );
    await localStorage.setItem("SessionUserLogged", sta.user.user.sucess);
  } catch (err) {
    throw err;
  }
}

export const login = credentials => async dispatch => {
  await axios.post("/api/users/auth", credentials).then(res => {
    dispatch({
      type: USER_LOGGED_IN,
      payload: res.data
    });
    localStorage.clear();
    if (res.data.sucess) {
      setData().then(res => {
        history.push("/Dashboard");
      });
    } else localStorage.setItem("payload", res.data.msg);
  });
};
