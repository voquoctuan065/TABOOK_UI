import axios from 'axios';
import { GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from './ActionType';
import { API_BASE_URL } from '../apiConfig';

export const getCategory = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORY_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/public/category/level1`);
        const data = response.data;
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CATEGORY_FAILURE, payload: error });
    }
};
