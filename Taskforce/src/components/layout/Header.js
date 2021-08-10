import React, {useContext, useEffect} from 'react';
import NewProject from '../projects/NewProject';
import ProjectList from '../projects/ProjectList';

import authContext from '../../context/auth/authContext';

const Header = () => {
    // Extraer la información de autenticación
    const authsContext = useContext(authContext);
    const {user, userAuth, logout} = authsContext;

    useEffect(() => {
        userAuth();
        //eslint-disable-next-line
    }, [])

    return(
        <div className="header">
            <div className="row g-0 justify-content-evenly">
                <div className="col-2">
                    <a className="btn btn-link" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i className="text-white fas fa-bars fa-2x"></i>
                    </a>
                </div>
                {user 
                ?
                <div className="col-6 projects-user-name">
                    <p> Hi! <strong> {user.username} </strong> </p>
                </div>
                : null
                }
                <div className="col-4 projects-logout text-right">
                    <a href="#!" onClick={() => logout()}> Log out </a>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title bold text-center gray" id="offcanvasExampleLabel"> TaskForce </h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body text-center">
                    <div>
                        <NewProject/>
                        <h2 className="text-center bold projects-title"> PROJECTS </h2>
                        <ProjectList/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;