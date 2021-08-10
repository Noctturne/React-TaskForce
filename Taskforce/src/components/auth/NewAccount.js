import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';

const NewAccount = (props) => {
    // Extraer valores 
    const alertsContext = useContext(alertContext);
    const {alert, showAlert} = alertsContext;

    const authsContext = useContext(authContext);
    const {auth, msg, registerUser} = authsContext;

    // Comprobar si se ha registrado o sea un registro duplicado
    useEffect(() => {
        if(auth){
            props.history.push('/projects');
        }
        if(msg){
            showAlert(msg.msg, msg.cat);
            return;
        }
        //eslint-disable-next-line
    }, [msg, auth, props.history]);
    
    // - Crear Cuenta
    const [user, saveUser] = useState({
        username: '',
        email: '',
        password: ''
    });   

    // - Extraer los datos del usuario
    const {username, email, password} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // - Pulsar Crear Cuenta
    const onSubmit = e => {
        e.preventDefault();

        // - Validar que no haya campos vacios 
        if(username.trim() === '' || email.trim() === '' || password.trim() === ''){
            showAlert('All the fields are required', 'alert-err');
            return;
        }

        // - Password de +4 caracteres
        if(password.length < 4){
            showAlert('Your password must be at least 4 characters', 'alert-err');
            return;
        }
        
        // - Pasarlo al action
        registerUser({
            username,
            email,
            password
        });
    }

    return(
        <div className="container-fluid login-container mx-0 px-0">
            <div className="signup-form">
                <h2 className="bold text-center gray form-title"> TaskForce </h2>
                <p className="gray text-center form-description"> You can create a new account test </p>
                { alert 
                ? 
                ( <div className={`alert ${alert.cat}`}> {alert.msg} </div> )
                : null
                }
                <form onSubmit={onSubmit}>
                <div className="form-field">
                        <label htmlFor="username"> <i className="far fa-user fa-1x"></i> </label>
                        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={onChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="email"> <i className="far fa-envelope fa-1x"></i> </label>
                        <input type="email" id="email" name="email" placeholder="Email Address" value={email} onChange={onChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="password"> <i className="fas fa-unlock-alt fa-1x"></i> </label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={onChange}/>
                    </div>
                    <div className="form-field">
                        <input type="submit" className="btn btn-custom bold"  value="SIGN UP"/>
                    </div>
                </form>
                <p className="text-center gray"> Already have an account? <Link to={'/'} className="link"> Log in </Link> </p>
            </div>
        </div>
    );
}

export default NewAccount;