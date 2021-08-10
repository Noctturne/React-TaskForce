import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
    // Proyectos
    const projectsContext = useContext(projectContext);
    const { actualProject } = projectsContext;

    // Tareas
    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext

    // Función para agregar el proyecto actual y las tareas
    const selectProject = id => {
        actualProject(id);
        getTasks(id);
    }

    return(
        <li><button type="button" className="btn-projects bold gray" onClick={() => selectProject(project._id)}> {project.name}</button></li>
    );
}

export default Project;