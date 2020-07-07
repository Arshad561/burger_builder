import axios from 'axios';

import * as Actions from './actionTypes';

export const authStart = () => {
    return {
        type: Actions.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: Actions.AUTH_SUCCESSS,
        idToken: authData.idToken,
        userId: authData.localId
    };
};

export const authFail = (error) => {
    return {
        type: Actions.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    return {
        type: Actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};
 
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwgGoUrnO29nXkFYlP_Fb0PFDebl1Mf4k';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwgGoUrnO29nXkFYlP_Fb0PFDebl1Mf4k'
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFail(error.response.data.error));
        });
    }
};