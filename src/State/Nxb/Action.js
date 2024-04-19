import axios from 'axios';
import { GET_NXB_FAILURE, GET_NXB_REQUEST, GET_NXB_SUCCESS } from './ActionType';
import { API_BASE_URL } from '../apiConfig';

export const getNxb = () => async (dispatch) => {
    dispatch({ type: GET_NXB_REQUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/public/nxb/nxb/list-nxb`);
        const data = response.data;

        dispatch({ type: GET_NXB_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_NXB_FAILURE, payload: error });
    }
};
