import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { categoryReducer } from './Categories/Reducer';
import { nxbReducer } from './Nxb/Reducer';
import { bookReducer } from './Books/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    nxb: nxbReducer,
    book: bookReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
