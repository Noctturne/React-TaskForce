import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import {CSSTransition, TransitionGroup}  from 'react-transition-group';
import alertContext from '../../context/alerts/alertContext';

const ProjectList = () => {
    // - Obtener el state de los proyectos y extraerlos
    const projectsContext = useContext(projectContext);
    const { msg, projects, getProjects } = projectsContext;


    const alertsContext = useContext(alertContext);
    const {alert, showAlert} = alertsContext;

    useEffect(() => {
        if(msg){
            showAlert(msg.msg, msg.cat);
        }

        getProjects();
        // eslint-disable-next-line
    }, [msg]);

    if(projects.lenght === 0) return <p className="text-center"> <strong> No projects </strong> </p>



    return(
        <ul className="list-projects">
            { alert 
            ? 
            ( <div className={`alert ${alert.cat}`}> {alert.msg} </div> )
            : null
            }
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="projectsAnim"
                    >
                        <Project
                        project={project}
                    />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ProjectList;