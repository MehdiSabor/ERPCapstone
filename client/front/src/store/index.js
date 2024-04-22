// src/store/index.js
import { createStore } from 'redux';

const initialState = {
    user: null,
    token: null,
    error: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload.user, token: action.payload.token, error: null };
        case 'LOGIN_ERROR':
            return { ...state, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, token: null, error: null };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
