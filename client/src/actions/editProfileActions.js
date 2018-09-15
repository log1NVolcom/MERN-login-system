import { USER_MODIFIED } from "./types";
import axios from "axios";
import history from "../history";

//-------------------EDIT PROFILE-------------------------\\

function setEditProfilePending(isEditProfilePending){
    return{
        type: SET_EDITPROFILE_PENDING,
isEditProfilePending

    }
}


function setEditProfileSucess(isEditProfileSucess, msg){
    return{
        type: SET_EDITPROFILE_SUCESS,
        isEditProfileSucess,
        msg
    }
}

function setEditProfileError(editProfileError){
    return{
        type: SET_EDITPROFILE_ERROR,
        editProfileError
    }
}

export function editUser(data){
    return async dispatch =>{
    dispatch( setEditProfilePending(true));
    dispatch( setEditProfileSucess(false) );
    dispatch( setEditProfileError(null) );
await axios.post("/api/users/editProfile", data).then(res => {
    dispatch( setEditProfilePending(true));
    if(!res){
        dispatch(setEditProfileError("Servor Error"));
    }else{
        dispatch(setEditProfileSucess(true , res));
    }
        });
    }
}



export const editUser = data => dispatch => {
  axios.post("/api/users/editProfile", data).then(res => {
    dispatch({
      type: USER_MODIFIED,
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
