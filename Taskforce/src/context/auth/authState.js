import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import { CORRECT_AUTH, ERROR_AUTH, GET_AUTH, CORRECT_LOGIN, ERROR_LOGIN, LOGOUT } from '../../types';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        msg: null,
        loading: true
    }

    // - state permite acceder a los valores, dispatch modificarlos
    const [state, dispatch] = useReducer(authReducer, initialState)

    // - Funciones
    // Registrar usuarios
    const registerUser = async data => {
        try {
            const res = await clientAxios.post('/api/users', data);
            dispatch({
                type: CORRECT_AUTH,
                payload: res.data
            });

            // Obtener el usuario
            userAuth();
        }catch (e) {
            const alert = {
                msg: e.response.data.msg,
                cat: 'alert-err'
            }
            dispatch({
                type: ERROR_AUTH,
                payload: alert
            });
        }
    }

    // Obtener el usuario
    const userAuth = async () => {
        const token = localStorage.getItem('token');
        if(token){
            // Función para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const res = await clientAxios.get('/api/auth');
            dispatch({
                type: GET_AUTH,
                payload: res.data.user
            });
        } catch (e) {
            console.log(e.response);
            dispatch({
                type: ERROR_LOGIN
            })
        }
    }

    // El usuario inicial sesión
    const login = async data => {
        try {
            const res = await clientAxios.post('/api/auth', data);
            dispatch({
                type: CORRECT_LOGIN,
                payload: res.data
            });
            userAuth();
            
        } catch (e) {
            console.log(e.response.data.msg);
            const alert = {
                msg: e.response.data.msg,
                cat: 'alert-err'
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            }); 
        }
    }


    // Cerrar sesión
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }
    return(
        <authContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                registerUser,
                userAuth,
                login,
                logout
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
