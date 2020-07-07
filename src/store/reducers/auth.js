import * as Actions from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.AUTH_START: return authStart(state, action);  
        case Actions.AUTH_SUCCESSS: return authSuccess(state, action);  
        case Actions.AUTH_FAIL: return authFail(state, action);
        case Actions.AUTH_LOGOUT: return logout(state, action);     
        default: return state;
    }
}

export default reducer;