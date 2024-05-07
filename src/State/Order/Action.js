import axios from 'axios';
import {
    CANCEL_USER_ORDER_FAILURE,
    CANCEL_USER_ORDER_REQUEST,
    CANCEL_USER_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_SUCCESS,
    GET_USER_ORDER_HISTORY_FAILURE,
    GET_USER_ORDER_HISTORY_REQUEST,
    GET_USER_ORDER_HISTORY_SUCCESS,
} from './ActionType';
import { API_BASE_URL } from '../apiConfig';

export const createOrder = (reqData, jwt) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/public/order/create`, reqData.data, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        if (data.orderId) {
            reqData.navigate({ search: `step=1&order_id=${data.orderId}` });
        }
        console.log('create order - ', data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

export const getOrderById = (orderId, jwt) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/public/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: GET_ORDER_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

export const getUserOrderHistory = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_ORDER_HISTORY_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/public/order/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log('Order from getUserOrderHistory', data);
        dispatch({ type: GET_USER_ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_ORDER_HISTORY_FAILURE, payload: error });
    }
};

export const cancelUserOrder = (orderId,  jwt) => async (dispatch) => {
    dispatch({ type: CANCEL_USER_ORDER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/public/order/cancel/${orderId}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: CANCEL_USER_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CANCEL_USER_ORDER_FAILURE, payload: error });
    }
};
