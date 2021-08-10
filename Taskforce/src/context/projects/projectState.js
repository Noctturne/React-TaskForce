import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERR } from '../../types';
import clientAxios from '../../config/axios';


// - State inicial de la administración de proyectos como su creación o eliminación.
// - Primero estará en false y cambiará a true cuando sea necesario.
const ProjectState = props => {


    const initialState = {
        projects : [],
        form: false,
        errForm: false,
        project: null,
        msg: null
    }

    // - state permite acceder a los valores, dispatch modificarlos
    const [state, dispatch] = useReducer(projectReducer, initialState)

    // - Funciones para CRUD
    // 1. Mostrar el formulario
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    // 2. Obtener los proyectos
    const getProjects = async () => {
        const res = await clientAxios.get('/api/projects');
        try {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data.projects
            }) 
        } catch (e) {
            const alert = {
                msg: 'Err',
                cat: 'alert-err'
            }
            dispatch({
                type: PROJECT_ERR,
                payload: alert
            })
        }
    }

    // 3. Añadir nuevo proyecto
    const addProject = async project => {
        try {
            const res = await clientAxios.post('/api/projects', project); 
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            })
        } catch (e) {
            const alert = {
                msg: 'Err',
                cat: 'alert-err'
            }
            dispatch({
                type: PROJECT_ERR,
                payload: alert
            })
        }
    }

    //  4. Validar formulario por errores
    const showErr = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // 5. Seleccionar proyecto para mostrar las tareas
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    // 6. Eliminar proyecto
    const deleteProject =async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (e) {
            const alert = {
                msg: 'Err',
                cat: 'alert-err'
            }
            dispatch({
                type: PROJECT_ERR,
                payload: alert
            })
        }
    }


    // - Desde Provider nacen los datos. Todos los props que sean hijos de Proyectos se pasarán.
    // - Pasamos nuestro state inicial
    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errForm: state.errForm,
                project: state.project,
                msg: state.msg,
                showForm,
                getProjects,
                addProject,
                showErr,
                actualProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;