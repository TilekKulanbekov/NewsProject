import {
    FETCH_CYBERSECURITY_NEWS_FAILURE,
    FETCH_CYBERSECURITY_NEWS_REQUEST,
    FETCH_CYBERSECURITY_NEWS_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    articles: [],
    isLoading: false,
    error: null,
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CYBERSECURITY_NEWS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_CYBERSECURITY_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                articles: action.payload,
            };
        case FETCH_CYBERSECURITY_NEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default newsReducer;
