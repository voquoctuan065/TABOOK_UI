import {
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_ALL_DELIVERED_ORDER_FAILURE,
    GET_ALL_DELIVERED_ORDER_REQUEST,
    GET_ALL_DELIVERED_ORDER_SUCCESS,
    GET_CONFIRMED_ORDER_FAILURE,
    GET_CONFIRMED_ORDER_REQUEST,
    GET_CONFIRMED_ORDER_SUCCESS,
    GET_DELIVERED_ORDER_FAILURE,
    GET_DELIVERED_ORDER_REQUEST,
    GET_DELIVERED_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_PACKED_ORDER_FAILURE,
    GET_PACKED_ORDER_REQUEST,
    GET_PACKED_ORDER_SUCCESS,
    GET_PENDING_ORDER_FAILURE,
    GET_PENDING_ORDER_REQUEST,
    GET_PENDING_ORDER_SUCCESS,
    GET_SHIPPING_ORDER_FAILURE,
    GET_SHIPPING_ORDER_REQUEST,
    GET_SHIPPING_ORDER_SUCCESS,
    GET_USER_ORDER_HISTORY_FAILURE,
    GET_USER_ORDER_HISTORY_REQUEST,
    GET_USER_ORDER_HISTORY_SUCCESS,
    SHIPPING_ORDER_FAILURE,
    SHIPPING_ORDER_REQUEST,
    SHIPPING_ORDER_SUCCESS,
} from './ActionType';

const initialState = {
    orders: [],
    order: null,
    error: null,
    success: false,
    loading: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_USER_ORDER_HISTORY_REQUEST:
        case GET_PENDING_ORDER_REQUEST:
        case GET_CONFIRMED_ORDER_REQUEST:
        case GET_SHIPPING_ORDER_REQUEST:
        case GET_DELIVERED_ORDER_REQUEST:
        case CONFIRMED_ORDER_REQUEST:
        case SHIPPING_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case GET_PACKED_ORDER_REQUEST:
        case GET_ALL_DELIVERED_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                success: true,
                order: action.payload,
            };

        case GET_ORDER_BY_ID_SUCCESS:
        case CONFIRMED_ORDER_SUCCESS:
        case SHIPPING_ORDER_SUCCESS:
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                order: action.payload,
            };
        case GET_USER_ORDER_HISTORY_SUCCESS:
        case GET_PENDING_ORDER_SUCCESS:
        case GET_CONFIRMED_ORDER_SUCCESS:
        case GET_SHIPPING_ORDER_SUCCESS:
        case GET_DELIVERED_ORDER_SUCCESS:
        case GET_PACKED_ORDER_SUCCESS:
        case GET_ALL_DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload,
            };
        case CREATE_ORDER_FAILURE:
        case GET_ORDER_BY_ID_FAILURE:
        case GET_USER_ORDER_HISTORY_FAILURE:
        case GET_PENDING_ORDER_FAILURE:
        case GET_CONFIRMED_ORDER_FAILURE:
        case GET_SHIPPING_ORDER_FAILURE:
        case GET_DELIVERED_ORDER_FAILURE:
        case CONFIRMED_ORDER_FAILURE:
        case SHIPPING_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case GET_PACKED_ORDER_FAILURE:
        case GET_ALL_DELIVERED_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
