import axios from "axios";
import { LOGIN_REQUEST , LOGIN_SUCESS } from "./actionsTypes";

function loginRequest(credentials) {
  return {
    type: LOGIN_REQUEST,
    credentials
  };
}

function loginData(response) {
  return {
    type: LOGIN_SUCESS,
    payload: response
  };
}

const apicall = async (credentials) =>  {
  axios
    .post("/api/users/auth", credentials)
    .then(res => {return Promise.resolve(res)});
}


export function login(credentials) {
 return function(dispatch) {
    dispatch(loginRequest(credentials));
	
	return apicall(credentials)
      .then(res => {loginData(res)});
   
	  
	  
  };
}
