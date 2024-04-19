import axios from 'axios';
import {
    FILTER_BOOK_FAILURE,
    FILTER_BOOK_REQUEST,
    FILTER_BOOK_SUCCESS,
    GET_BOOK_BY_CATEGORY_FAILURE,
    GET_BOOK_BY_CATEGORY_REQUEST,
    GET_BOOK_BY_CATEGORY_SUCCESS,
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