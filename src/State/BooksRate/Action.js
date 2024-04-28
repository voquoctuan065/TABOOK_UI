import axios from 'axios';
import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS } from './ActionType';
import { API_BASE_URL } from '../apiConfig';

const jwt = localStorage.getItem('jwt');

export const createRating = (bookId, reqData) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/public/rate/create/${bookId}`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_RATING_FAILURE, payload: error.message });
    }
};
