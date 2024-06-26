import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { categoryReducer } from './Categories/Reducer';
import { nxbReducer } from './Nxb/Reducer';
import { bookReducer } from './Books/Reducer';
import cartReducer from './Cart/cartSlice';
import { orderReducer } from './Order/Reducer';
import paymentReducer from './Payment/Reducer';
import ratingReducer from './BooksRate/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    nxb: nxbReducer,
    book: bookReducer,
    cart: cartReducer,
    order: orderReducer,
    payment: paymentReducer,
    rating: ratingReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
