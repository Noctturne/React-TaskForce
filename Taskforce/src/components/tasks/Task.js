import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {
    // Proyectos
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    
    // Tareas
    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, saveActualTask, updateTask } = tasksContext;

    //Extraer proyecto para tener el id
    const[actualProject] = project;

    // Eliminar tarea
    const taskToDelete = id => {
        deleteTask(id, actualProject._id);
        getTasks(actualProject.id);
    }

    // Cambiar el estado
    const changeState = task => {
        if(task.complete){
            task.complete = false;
        }else{
            task.complete = true;
        }
        updateTask(task);
    }

    // Agrega una tarea para editar
    const getTask = task => {
        saveActualTask(task);
    }

    return(
       <li>
            {task.complete 
            ?
                (<button type="button" className="complete" onClick={() => changeState(task)}><i className="fas fa-check"></i></button>)
            :
                (<button type="button" className="complete" onClick={() => changeState(task)}><i className="fas fa-times"></i></button>)
            }
            <p> {task.name} </p>
            <div className="actions">
                <button type="button" className="btn btn-edit" onClick={() => getTask(task)}> Edit </button>
                <button type="button" className="btn btn-delete" onClick={() => taskToDelete(task._id)}> Delete </button>
            </div>

       </li>
    );
}

export default Task;