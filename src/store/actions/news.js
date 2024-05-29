import { fetchNewsApi } from '../../api';
import {
    FETCH_CYBERSECURITY_NEWS_FAILURE,
    FETCH_CYBERSECURITY_NEWS_REQUEST,
    FETCH_CYBERSECURITY_NEWS_SUCCESS
} from "./actionTypes";

export const fetchCybersecurityNews = () => async (dispatch) => {
    dispatch({ type: FETCH_CYBERSECURITY_NEWS_REQUEST });

    try {
        const { data } = await fetchNewsApi();
        const articles = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            source: article.source,
            publishedAt: article.publishedAt,
        }));

        dispatch({
            type: FETCH_CYBERSECURITY_NEWS_SUCCESS,
            payload: articles,
        });
    } catch (error) {
        dispatch({
            type: FETCH_CYBERSECURITY_NEWS_FAILURE,
            error: error.message,
        });
    }
};
