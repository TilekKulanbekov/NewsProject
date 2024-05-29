import {fetchCybersecurityNewsApi} from "../../api";

export const fetchCybersecurityNews = () => async (dispatch) => {
    dispatch({ type: 'FETCH_CYBERSECURITY_NEWS_REQUEST' });

    try {
        const response = await fetchCybersecurityNewsApi();
        dispatch({
            type: 'FETCH_CYBERSECURITY_NEWS_SUCCESS',
            payload: response.data.articles,
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_CYBERSECURITY_NEWS_FAILURE',
            error: error.message,
        });
    }
};
