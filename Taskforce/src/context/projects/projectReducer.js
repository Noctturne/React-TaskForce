import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERR } from '../../types';

export default(state, action) => {

    switch(action.type) {
    case FORM_PROJECT:
        return{
            ...state,
            form: true
        }
    case GET_PROJECTS:
        return{
            ...state,
            projects: action.payload
        }
    case ADD_PROJECT:
        return{
            ...state,
            projects: [...state.projects, action.payload],
            form: false,
            errForm: false
        }
    case VALIDATE_FORM:
        return{
            ...state,
            errForm: true
        }
        case ACTUAL_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROJECT_ERR:
            return{
                ...state,
                msg: action.payload
            }
        default:
            return state;
    }
}