import * as Actions from './actionTypes';

export const authStart = () => {
    return {
        type: Actions.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: Actions.AUTH_SUCCESSS,
        idToken,
        userId
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
        type: Actions.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: Actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: Actions.AUTH_CHECK_TIMEOUT,
        expirationTime
    }
};
 
export const auth = (email, password, isSignup) => {
    return {
        type: Actions.AUTH_START_SAGA,
        email,
        password,
        isSignup
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: Actions.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return {
        type: Actions.AUTH_CHECK_STATE
    }
}
