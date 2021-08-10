import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';

const Login = (props) => {
    // Extraer valores 
    const alertsContext = useContext(alertContext);
    const {alert, showAlert} = alertsContext;

    const authsContext = useContext(authContext);
    const {msg,auth, login} = authsContext;

    // En caso de que el usuario o su contraseña no existan
    useEffect(() => {
        if(auth){
            props.history.push('/projects');
        }

        if(msg){
            showAlert(msg.msg, msg.cat);
            return;
        }
        //eslint-disable-next-line
    }, [msg, auth,  props.history]);

    // - Iniciar Sesión
    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    // - Extraer los datos del usuario
    const {email, password} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // - Pulsar Iniciar Sesión
    const onSubmit = e => {
        e.preventDefault();

        // - Validar
        if(email.trim() === '' || password.trim() === ''){
            showAlert('All the fields are required', 'alert-err');
            return;
        }
        // - Pasarlo al action
        login({email, password});
    }

    return(
        <div className="container-fluid login-container mx-0 px-0">
            <div className="user-form">
                { alert 
                ? 
                ( <div className={`alert ${alert.cat}`}> {alert.msg} </div> )
                : null
                }
                <h2 className="bold text-center gray form-title"> TaskForce </h2>
                <p className="gray text-center form-description"> You can login with : <strong> demo/demo </strong></p>
                <form onSubmit={onSubmit}>
                    <div className="form-field">
                        <label htmlFor="email"> <i className="far fa-envelope fa-1x"></i> </label>
                        <input type="text" id="email" name="email" placeholder="Email Address" value={email} onChange={onChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="password"> <i className="fas fa-unlock-alt fa-1x"></i> </label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={onChange}/>
                    </div>
                    <div className="form-field">
                        <input type="submit" className="btn btn-custom bold"  value="LOG IN"/>
                    </div>
                </form>
                <p className="text-center gray"> Not a member? <Link to={'/new-account'} className="link"> Sign up </Link> </p>
            </div>
        </div>
    );
}

export default Login;