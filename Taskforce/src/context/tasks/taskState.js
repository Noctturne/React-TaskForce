import React, { useReducer } from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK, CLEAN_TASK } from '../../types';
import clientAxios from '../../config/axios';

const TaskState = props => {
    const initialState = {
        tasksInProject: [],
        taskErr: false,
        selectedTask: null
    }

    // - state permite acceder a los valores, dispatch modificarlos
    const [state, dispatch] = useReducer(taskReducer, initialState)

    // - 1. Obtener las tareas de un proyecto
    const getTasks = async project => {
        try {
            const res = await clientAxios.get('/api/tasks', {params: {project}});
            dispatch({
                type: TASKS_PROJECT,
                payload: res.data.tasks
            })
            } catch (error) {
                console.log(error);
            }
    }

    // -2. Agregar tarea a proyecto seleccionado
    const addTask = async task => {
        try {
        const res = await clientAxios.post('/api/tasks', task);
        dispatch({
            type: ADD_TASK,
            payload: task
        })
        } catch (error) {
            console.log(error);
        }
    }

    // - 3. Validar tarea
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // 4. Eliminar tarea
    const deleteTask = async (id, project) => {
        try {
            const res = await clientAxios.delete(`/api/tasks/${id}`, {params: {project}});
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }

    }

    // 6. Tarea actual
    const saveActualTask = tasksProject => {
        dispatch({
            type: ACTUAL_TASK,
            payload: tasksProject
        })
    }

    // 7. Editar Tarea
    const updateTask = async task => {
        try {
            const res = await clientAxios.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: res.data.task
            })
        } catch (error) {
            console.log(error);
        }        

    }

    //  8. Eliminar tarea seleccionada
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }
    // - Desde Provider nacen los datos. Todos los props que sean hijos de Proyectos se pasarán.
    // - Pasamos nuestro state inicial
    return(
        <taskContext.Provider
            value={{
                tasksInProject: state.tasksInProject,
                taskErr: state.taskErr,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                saveActualTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;