import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_ERROR
} from "../actions/actionsTypes";

const initialState = {
  data: {},
  isloading: false,
  loginSucess: false
};
export default function(state = initialState, action) {
    switch(action.type){
        case LOGIN_REQUEST:
            return {...state, isloading: true};
        case LOGIN_SUCESS:
             return{
                ...state,
                data: action.payload,
                loginSucess: true,
                isloading: false,
                };
        case LOGIN_ERROR:
             return state;
        default:
             return state;
    }

}
