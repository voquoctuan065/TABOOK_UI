import axios from 'axios';
import {
    FILTER_BOOK_FAILURE,
    FILTER_BOOK_REQUEST,
    FILTER_BOOK_SUCCESS,
    FIND_BOOK_BY_NAME_FAILURE,
    FIND_BOOK_BY_NAME_REQUEST,
    FIND_BOOK_BY_NAME_SUCCESS,
    GET_BOOK_BY_CATEGORY_FAILURE,
    GET_BOOK_BY_CATEGORY_REQUEST,
    GET_BOOK_BY_CATEGORY_SUCCESS,
    GET_BOOK_BY_ID_FAILURE,
    GET_BOOK_BY_ID_REQUEST,
    GET_BOOK_BY_ID_SUCCESS,
    GET_FAVORITE_BOOK_FAILURE,
    GET_FAVORITE_BOOK_REQUEST,
    GET_FAVORITE_BOOK_SUCCESS,
    GET_HOT_BOOK_FAILURE,
    GET_HOT_BOOK_REQUEST,
    GET_HOT_BOOK_SUCCESS,
    GET_LATEST_BOOK_FAILURE,
    GET_LATEST_BOOK_REQUEST,
    GET_LATEST_BOOK_SUCCESS
} from './ActionType';
import { API_BASE_URL } from '../apiConfig';

export const getBookByCategory = (reqData) => async (dispatch) => {
    dispatch({ type: GET_BOOK_BY_CATEGORY_REQUEST });
    const { cleanItem, currentPage } = reqData;
    try {
        const { data } = await axios.get(
            `${API_BASE_URL}/public/book/c?pathName=${cleanItem}&page=${currentPage}&size=24`,
        );
        dispatch({ type: GET_BOOK_BY_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_BOOK_BY_CATEGORY_FAILURE, payload: error });
    }
};

export const filterBook = (reqData) => async (dispatch) => {
    dispatch({ type: FILTER_BOOK_REQUEST });
    const { pathName, minPrice, maxPrice, nxbId, sort, page, size } = reqData;
    try {
        const { data } = await axios.get(
            `http://localhost:8686/public/book/filter?pathName=${pathName}&minPrice=${minPrice}&maxPrice=${maxPrice}&nxbId=${nxbId}&sort=${sort}&page=${page}&size=${size}`,
        );
        dispatch({ type: FILTER_BOOK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FILTER_BOOK_FAILURE, payload: error });
    }
};

export const getBookById = (bookRequestId) => async (dispatch) => {
    dispatch({ type: GET_BOOK_BY_ID_REQUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/public/book/${bookRequestId}`);
        console.log('Book from action', response);
        dispatch({ type: GET_BOOK_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_BOOK_BY_ID_FAILURE, payload: error });
    }
};

export const findBookByName = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_BOOK_BY_NAME_REQUEST });
    const { keyword, page } = reqData;
    try {
        if (keyword) {
            const { data } = await axios.get(
                `${API_BASE_URL}/public/book/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=24`,
            );
            dispatch({ type: FIND_BOOK_BY_NAME_SUCCESS, payload: data });
        } else {
            dispatch({ type: FIND_BOOK_BY_NAME_SUCCESS, payload: { booksDtoList: [], totalPage: 0 } });
        }
    } catch (error) {
        dispatch({ type: FIND_BOOK_BY_NAME_FAILURE, payload: error });
    }
};

export const getLatestBook = () => async (dispatch) => {
    dispatch({ type: GET_LATEST_BOOK_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/public/book/latest`);
        dispatch({ type: GET_LATEST_BOOK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_LATEST_BOOK_FAILURE, payload: error });
    }
};

export const getHotBook = () => async (dispatch) => {
    dispatch({ type: GET_HOT_BOOK_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/public/book/hot`);
        dispatch({ type: GET_HOT_BOOK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_HOT_BOOK_FAILURE, payload: error });
    }
};

export const getFavoriteBook = () => async (dispatch) => {
    dispatch({ type: GET_FAVORITE_BOOK_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/public/book/favorite`);
        dispatch({ type: GET_FAVORITE_BOOK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_FAVORITE_BOOK_FAILURE, payload: error });
    }
};

