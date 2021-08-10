import React, {useContext, useState, useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // Tareas
    const tasksContext = useContext(taskContext);
    const { selectedTask, taskErr, addTask, validateTask, getTasks, updateTask, cleanTask } = tasksContext;

    // Detecta si hay una tarea seleccionada
    useEffect(() => {
        if(selectedTask !== null){
            saveTask(selectedTask)
        }else{
            saveTask({
                name: ''
            })
        }
    }, [selectedTask]);

    const [task, saveTask] = useState({
        name: ''
    })

    const {name} = task;

    if(!project) return null;

    // Array destructuring 
    const [actualProject] = project;

    // Leer los valores del form
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(name.trim() === ''){
            validateTask();
            return;
        }

        // Revisar si es edición o nueva tarea
        if(selectedTask === null){
            // Agregar la tarea al state
            task.project = actualProject._id;
            addTask(task);
        }else{
            updateTask(task);

            // Eliminar tarea seleccionada del state
            cleanTask();
        }

        // Obtener las tareas del proyecto actual
        getTasks(actualProject.id);

        saveTask({
            name: ''
        })
    }

    return(
        <div className="task-form">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={onSubmit}>
                    <div className="form-field">
                        <input type="text" name="name" placeholder="Name..." value={name} onChange={handleChange}/>
                    </div>
                    <div className="form-field text-center">
                        <input type="submit" className="btn bold" value={selectedTask ? 'EDIT TASK' : '"ADD TASK"'}/>
                    </div>
                </form>
            </div>
            {
                taskErr
                ?
                (
                <div className="alert alert-warning fade show text-center taskFormAlert" role="alert">
                    <strong>Hey!</strong> You should check you task name
                </div>
                )
                :
                null
            }
        </div>
    );
}

export default TaskForm;