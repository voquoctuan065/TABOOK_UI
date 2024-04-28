import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
};

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: null,
            };
        case CREATE_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                error: null,
            };
        case CREATE_RATING_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ratingReducer;