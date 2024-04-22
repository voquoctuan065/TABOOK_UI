import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { categoryReducer } from './Categories/Reducer';
import { nxbReducer } from './Nxb/Reducer';
import { bookReducer } from './Books/Reducer';
import cartSlice from './Cart/cartSlice';

const rootReducers = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    nxb: nxbReducer,
    book: bookReducer,
    cart: cartSlice,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
