import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PrivateRoute = ({component: Component, ...props }) => {
    const authsContext = useContext(authContext);
    const {auth, loading, userAuth} = authsContext;

    useEffect(() => {
        userAuth();
        //eslint-disable-next-line
    }, []);

    return (
        <Route {...props} render={props => !auth && !loading
        ? 
            (
                <Redirect to="/"/>
            )
        : 
            (
                <Component {...props}/>
            )
        }
        />

    );
}

export default PrivateRoute;