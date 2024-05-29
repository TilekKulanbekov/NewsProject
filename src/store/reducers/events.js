import {
    FETCH_CYBERSECURITY_EVENTS_FAILURE,
    FETCH_CYBERSECURITY_EVENTS_REQUEST,
    FETCH_CYBERSECURITY_EVENTS_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    events: [],
    isLoading: false,
    error: null,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CYBERSECURITY_EVENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_CYBERSECURITY_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                events: action.payload,
            };
        case FETCH_CYBERSECURITY_EVENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default eventReducer;
