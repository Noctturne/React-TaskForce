import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK, CLEAN_TASK } from '../../types';

export default(state, action) => {

    switch(action.type) {
        case TASKS_PROJECT:
            return{
                ...state,
                tasksInProject: action.payload
            }
        case ADD_TASK:
            return{
                ...state,
                tasksInProject: [action.payload, ...state.tasksInProject],
                taskErr: false
            }
        case VALIDATE_TASK:
            return{
                ...state,
                taskErr: true
            }
            case DELETE_TASK:
                return{
                    ...state,
                    tasksInProject: state.tasksInProject.filter(task => task._id !== action.payload)
                }
            case UPDATE_TASK:
                return{
                    ...state,
                    tasksInProject: state.tasksInProject.map(task => task._id === action.payload._id ? action.payload : task) ,
                }
            case ACTUAL_TASK:
                return{
                    ...state,
                    selectedTask: action.payload
                }
            case CLEAN_TASK:
                return{
                    ...state,
                    selectedTask: null
                }
        default:
            return state;
    }
}