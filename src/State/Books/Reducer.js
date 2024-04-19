import {
    FILTER_BOOK_FAILURE,
    FILTER_BOOK_REQUEST,
    FILTER_BOOK_SUCCESS,
    GET_BOOK_BY_CATEGORY_FAILURE,
    GET_BOOK_BY_CATEGORY_REQUEST,
    GET_BOOK_BY_CATEGORY_SUCCESS,
} from './ActionType';

const initialState = {
    books: [],
    book: [],
    loading: false,
    error: null,
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOK_BY_CATEGORY_REQUEST:
        case FILTER_BOOK_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_BOOK_BY_CATEGORY_SUCCESS:
            return { ...state, loading: false, error: null, books: action.payload };
        case FILTER_BOOK_SUCCESS:
            return { ...state, loading: false, error: null, books: action.payload };
        case GET_BOOK_BY_CATEGORY_FAILURE:
        case FILTER_BOOK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
