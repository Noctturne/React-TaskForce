import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    // - state permite acceder a los valores, dispatch modificarlos
    const [state, dispatch] = useReducer(alertReducer, initialState)

    // - Funciones
    const showAlert = (msg, cat) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                cat
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 2000);
    }

    return(
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;
