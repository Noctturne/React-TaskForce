import { CORRECT_AUTH, ERROR_AUTH, GET_AUTH, CORRECT_LOGIN, ERROR_LOGIN, LOGOUT } from '../../types';

export default(state, action) => {

    switch(action.type) {
        case CORRECT_LOGIN:
        case CORRECT_AUTH:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                auth: true,
                msg: null,
                loading: false
            }
        case LOGOUT:
        case ERROR_LOGIN:  
        case ERROR_AUTH:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                auth: null,
                user: null,
                msg: action.payload,
                loading: false
            }
        case GET_AUTH:
            return{
                ...state,
                auth: true,
                user: action.payload,
                loading: false
            }
        default:
            return state;
    }
}