import {
    FILTER_BOOK_FAILURE,
    FILTER_BOOK_REQUEST,
    FILTER_BOOK_SUCCESS,
    FIND_BOOK_BY_NAME_FAILURE,
    FIND_BOOK_BY_NAME_SUCCESS,
    GET_BOOK_BY_CATEGORY_FAILURE,
    GET_BOOK_BY_CATEGORY_REQUEST,
    GET_BOOK_BY_CATEGORY_SUCCESS,
    GET_BOOK_BY_ID_FAILURE,
    GET_BOOK_BY_ID_REQUEST,
    GET_BOOK_BY_ID_SUCCESS,
    GET_LATEST_BOOK_FAILURE,
    GET_LATEST_BOOK_REQUEST,
    GET_LATEST_BOOK_SUCCESS,
} from './ActionType';

const initialState = {
    books: [],
    book: null,
    loading: false,
    error: null,
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOK_BY_CATEGORY_REQUEST:
        case FILTER_BOOK_REQUEST:
        case GET_BOOK_BY_ID_REQUEST:
        case GET_LATEST_BOOK_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_BOOK_BY_CATEGORY_SUCCESS:
        case FILTER_BOOK_SUCCESS:
        case FIND_BOOK_BY_NAME_SUCCESS:
        case GET_LATEST_BOOK_SUCCESS:
            return { ...state, loading: false, error: null, books: action.payload };
        case GET_BOOK_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, book: action.payload };
        case GET_BOOK_BY_CATEGORY_FAILURE:
        case FILTER_BOOK_FAILURE:
        case GET_BOOK_BY_ID_FAILURE:
        case FIND_BOOK_BY_NAME_FAILURE:
        case GET_LATEST_BOOK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
