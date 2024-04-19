import { GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from './ActionType';

const initialState = {
    categoryList: [],
    loading: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return { ...state, loading: true };
        case GET_CATEGORY_SUCCESS:
            return { ...state, loading: false, error: null, categoryList: action.payload };
        case GET_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
