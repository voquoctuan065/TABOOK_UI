import axios from 'axios';
import {
    CANCEL_USER_ORDER_FAILURE,
    CANCEL_USER_ORDER_REQUEST,
    CANCEL_USER_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_CONFIRMED_ORDER_FAILURE,
    GET_CONFIRMED_ORDER_REQUEST,
    GET_CONFIRMED_ORDER_SUCCESS,
    GET_DELIVERED_ORDER_FAILURE,
    GET_DELIVERED_ORDER_REQUEST,
    GET_DELIVERED_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_SUCCESS,
    GET_PENDING_ORDER_FAILURE,
    GET_PENDING_ORDER_REQUEST,
    GET_PENDING_ORDER_SUCCESS,
    GET_SHIPPING_ORDER_FAILURE,
    GET_SHIPPING_ORDER_REQUEST,
    GET_SHIPPING_ORDER_SUCCESS,
    GET_USER_ORDER_HISTORY_FAILURE,
    GET_USER_ORDER_HISTORY_REQUEST,
    GET_USER_ORDER_HISTORY_SUCCESS,
    PACKED_ORDER_FAILURE,
    PACKED_ORDER_REQUEST,
    PACKED_ORDER_SUCCESS,
    SHIPPING_ORDER_FAILURE,
    SHIPPING_ORDER_REQUEST,
    SHIPPING_ORDER_SUCCESS,
} from './ActionType';
import { API_BASE_URL } from '../apiConfig';
import { toast } from 'react-toastify';

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

export const cancelUserOrder = (orderId, jwt) => async (dispatch) => {
    dispatch({ type: CANCEL_USER_ORDER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/public/order/cancel/${orderId}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: CANCEL_USER_ORDER_SUCCESS, payload: data });
        toast.success('Huỷ đơn hàng thành công!');
    } catch (error) {
        dispatch({ type: CANCEL_USER_ORDER_FAILURE, payload: error });
    }
};

export const getPendingOrder = (inputData, jwt) => async (dispatch) => {
    dispatch({ type: GET_PENDING_ORDER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/admin/order/pending/filter`, {
            params: inputData,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_PENDING_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_PENDING_ORDER_FAILURE, payload: error });
    }
};

export const getConfirmedOrder = (inputData, jwt) => async (dispatch) => {
    dispatch({ type: GET_CONFIRMED_ORDER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/admin/order/confirmed/filter`, {
            params: inputData,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_CONFIRMED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CONFIRMED_ORDER_FAILURE, payload: error });
    }
};

export const getShippingOrder = (inputData, jwt) => async (dispatch) => {
    dispatch({ type: GET_SHIPPING_ORDER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/admin/order/shipping/filter`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_SHIPPING_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SHIPPING_ORDER_FAILURE, payload: error });
    }
};

export const getDeliveredOrder = (inputData, jwt) => async (dispatch) => {
    dispatch({ type: GET_DELIVERED_ORDER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/admin/order/delivered/filter`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_DELIVERED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_DELIVERED_ORDER_FAILURE, payload: error });
    }
};

export const confirmedOrder = (orderId, jwt) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    try {
        const { data } = await axios.put(
            `${API_BASE_URL}/admin/order/confirmed/${orderId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
        toast.success('Đã xác nhận đơn hàng!');
    } catch (error) {
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error });
    }
};

export const packedOrder = (orderId, jwt) => async (dispatch) => {
    dispatch({ type: PACKED_ORDER_REQUEST });
    try {
        const { data } = await axios.put(
            `${API_BASE_URL}/admin/order/packed/${orderId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        dispatch({ type: PACKED_ORDER_SUCCESS, payload: data });
        toast.success('Đơn hàng đã được đóng gói!');
    } catch (error) {
        dispatch({ type: PACKED_ORDER_FAILURE, payload: error });
    }
};

export const shippingOrder = (orderId, jwt) => async (dispatch) => {
    dispatch({ type: SHIPPING_ORDER_REQUEST });
    try {
        const { data } = await axios.put(`${API_BASE_URL}/admin/order/shipping/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({ type: SHIPPING_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SHIPPING_ORDER_FAILURE, payload: error });
    }
};

export const deliveredOrder = (orderId, jwt) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
        const { data } = await axios.put(`${API_BASE_URL}/admin/order/delivered/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error });
    }
};
