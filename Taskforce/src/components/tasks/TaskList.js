import React, {useContext} from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup}  from 'react-transition-group';

const TaskList = () => {
    // - Obtener el state del formulario
    const projectsContext = useContext(projectContext);
    // - Importamos ese formulario de projectState, una vez inscrito en el dom recogemos la función definida
    const { project, deleteProject } = projectsContext;

    // Tareas
    const tasksContext = useContext(taskContext);
    const { tasksInProject } = tasksContext;

    if(!project) return <h4 className="text-center bold noproject"> Select a project </h4>;

    // Array destructuring 
    const [actualProject] = project;

    // Eliminar proyecto
    const onClickDelete = () =>{
        deleteProject(actualProject._id)
    }

    
    return(
        <div className="tasks">
            <h4 className="text-center bold"> <strong>Project:</strong>   {actualProject.name}  </h4>
            <ul className="list-tasks">
                {tasksInProject.length === 0 
                    ? (<li className="notask"><p> No tasks to show </p></li>)
                    : <TransitionGroup>
                        {tasksInProject.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={300}
                                classNames="taskAnim"
                            >
                                <Task
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <div className="deleteProject text-center">
                <button type="button" className="btn btn-delete" onClick={onClickDelete}> Delete Project &times; </button>
            </div>
        </div>
    );
}

export default TaskList;