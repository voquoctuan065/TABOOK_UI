import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from '../Order/ActionType';
import {
    PAYMENT_COD_FAILURE,
    PAYMENT_COD_REQUEST,
    PAYMENT_COD_SUCCESS,
    PAYMENT_SUCCESS_FAILURE,
    PAYMENT_SUCCESS_REQUEST,
    PAYMENT_SUCCESS_SUCCESS,
} from './ActionType';

const initialState = {
    loading: false,
    paymentUrl: null,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case PAYMENT_SUCCESS_REQUEST:
        case PAYMENT_COD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentUrl: action.payload.paymentUrl,
                error: null,
            };
        case CREATE_ORDER_FAILURE:
        case PAYMENT_SUCCESS_FAILURE:
        case PAYMENT_COD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case PAYMENT_SUCCESS_SUCCESS:
        case PAYMENT_COD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default paymentReducer;
