import axios from 'axios';
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_SUCCESS,
} from './ActionType';
import { API_BASE_URL } from '../apiConfig';

const jwt = localStorage.getItem('jwt');

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/public/order/create`, reqData.data, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        if (data.orderId) {
            reqData.navigate({ search: `step=2&order_id=${data.orderId}` });
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

export const getOrderById = (orderId) => async (dispatch) => {
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
