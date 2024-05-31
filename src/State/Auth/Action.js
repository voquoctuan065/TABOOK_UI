import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from './ActionType';

import { toast } from 'react-toastify';
import routes from '../../config/routes';

const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest);
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;

        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);

            const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // Thời điểm hết hạn sau 1 ngày
            localStorage.setItem('expirationTime', expirationTime);
            setTimeout(() => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('expirationTime');
                dispatch({ type: LOGOUT, payload: null });
            }, expirationTime - new Date().getTime());
        }

        dispatch(registerSuccess(user.jwt));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});
export const login = (userData, navigate) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;

        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);

            const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // Thời điểm hết hạn sau 1 ngày
            localStorage.setItem('expirationTime', expirationTime);
            setTimeout(() => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('expirationTime');
                dispatch({ type: LOGOUT, payload: null });
            }, expirationTime - new Date().getTime());
        }

        dispatch(loginSuccess(user.jwt));
        toast.success('Đăng nhập thành công!');
        navigate(routes.home);
    } catch (error) {
        dispatch(loginFailure(error.message));
        toast.error('Mật khẩu hoặc email không đúng!');
        return;
    }
};

const getUserRequest = () => ({
    type: GET_USER_REQUEST,
});

const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: user,
});

const getUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    payload: error,
});

export const getUser = (jwt) => async (dispatch) => {
    if(jwt) {
        dispatch(getUserRequest());
        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const user = response.data;
            dispatch(getUserSuccess(user));
        } catch (error) {
            dispatch(getUserFailure(error.message));
        }
    }else {
        dispatch(getUserFailure("Invalid jwt!"));
    }
    
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
    toast.success('Đã đăng xuất!');
};
