import { GET_NXB_FAILURE, GET_NXB_REQUEST, GET_NXB_SUCCESS } from './ActionType';

const initialState = {
    nxb: [],
    loading: false,
    error: null,
};

export const nxbReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NXB_REQUEST:
            return { ...state, loading: true };
        case GET_NXB_SUCCESS:
            return { ...state, loading: false, error: null, nxb: action.payload };
        case GET_NXB_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
