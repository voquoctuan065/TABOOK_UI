import axios from 'axios';
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from '../Order/ActionType';
import { API_BASE_URL } from '../apiConfig';
import {
    PAYMENT_COD_FAILURE,
    PAYMENT_COD_REQUEST,
    PAYMENT_COD_SUCCESS,
    PAYMENT_SUCCESS_FAILURE,
    PAYMENT_SUCCESS_REQUEST,
    PAYMENT_SUCCESS_SUCCESS,
} from './ActionType';
import { toast } from 'react-toastify';
import { clearCart } from '../Cart/cartSlice';

const jwt = localStorage.getItem('jwt');

export const createPaymentLink = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/public/payment/create?orderId=${reqData.orderId}&totalAmount=${reqData.totalAmount}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        toast.info('Đang tiến hành thanh toán!');
        if (data.paymentUrl) {
            window.location.href = data.paymentUrl;
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    }
};

export const paymentSuccessAction = (reqData) => async (dispatch) => {
    dispatch({ type: PAYMENT_SUCCESS_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/public/payment/success?orderId=${reqData.orderId}&totalAmount=${reqData.totalAmount}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch({ type: PAYMENT_SUCCESS_SUCCESS, payload: data });
        localStorage.removeItem('cartState');
        dispatch(clearCart());
        reqData.navigate('/');
    } catch (error) {
        dispatch({ type: PAYMENT_SUCCESS_FAILURE, payload: error });
    }
};

export const shipCodAction = (reqData) => async (dispatch) => {
    dispatch({ type: PAYMENT_COD_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/public/payment/cod?orderId=${reqData.orderId}&totalAmount=${reqData.totalAmount}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch({ type: PAYMENT_COD_SUCCESS, payload: data });
        toast.success('Đơn hàng đã được tạo thành công vui lòng chờ nhân viên xác nhận.');
        localStorage.removeItem('cartState');
        dispatch(clearCart());
        reqData.navigate('/');
    } catch (error) {
        dispatch({ type: PAYMENT_COD_FAILURE, payload: error });
    }
};
