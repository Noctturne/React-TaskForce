import React, {useContext, useEffect} from 'react';
import Header from '../layout/Header';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';

import authContext from '../../context/auth/authContext';

const Projects = () => {
    // Extraer la información de autenticación
    const authsContext = useContext(authContext);
    const {userAuth} = authsContext;

    useEffect(() => {
        userAuth();
        //eslint-disable-next-line
    }, [])

    return(
        <div className="container-fluid mx-0 px-0">
            <Header/>
            <main className="main"> 
                <div className="row g-0 add-task">
                    <TaskForm/>
                </div>
                <div className="row g-0">
                    <div className="col-sm-10 offset-lg-4 col-lg-4">
                        <TaskList/>
                    </div>
                </div>
            </main>           
        </div>
    );
}

export default Projects;