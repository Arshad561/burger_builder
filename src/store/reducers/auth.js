import * as Actions from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const logout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.AUTH_START: return authStart(state, action);  
        case Actions.AUTH_SUCCESSS: return authSuccess(state, action);  
        case Actions.AUTH_FAIL: return authFail(state, action);
        case Actions.AUTH_LOGOUT: return logout(state, action);
        case Actions.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)   
        default: return state;
    }
}

export default reducer;