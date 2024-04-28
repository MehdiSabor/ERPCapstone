import { createStore } from 'redux';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    error: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            return { ...state, user: action.payload.user, token: action.payload.token, error: null };
        case 'LOGIN_ERROR':
            return { ...state, error: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return { ...state, user: null, token: null, error: null };
        default:
            return state;
    }
}



const store = createStore(reducer);

export default store;
