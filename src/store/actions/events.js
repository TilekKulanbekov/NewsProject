// src/store/actions/eventActions.js
import {
    FETCH_CYBERSECURITY_EVENTS_REQUEST,
    FETCH_CYBERSECURITY_EVENTS_SUCCESS,
    FETCH_CYBERSECURITY_EVENTS_FAILURE,
} from './actionTypes';
import { fetchCybersecurityEventsApi, fetchEventDetailsApi } from '../../api';

export const fetchCybersecurityEvents = () => async (dispatch) => {
    dispatch({ type: FETCH_CYBERSECURITY_EVENTS_REQUEST });

    try {
        const data = await fetchCybersecurityEventsApi();
        if (data && data.articles && data.articles.results) {
            const events = await Promise.all(data.articles.results.map(async (article) => {
                try {
                    const eventDetails = await fetchEventDetailsApi(article.uri);
                    return {
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        urlToImage: article.image || article.urlToImage,
                        source: article.source || { name: 'Unknown' },
                        publishedAt: article.date || 'Unknown date',
                        eventDetails: {
                            location: eventDetails.location || 'Unknown location',
                            date: eventDetails.dateTime ? new Date(eventDetails.dateTime).toLocaleDateString() : 'Unknown date',
                            image: eventDetails.image || article.urlToImage,
                        },
                    };
                } catch (err) {
                    return {
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        urlToImage: article.image || article.urlToImage,
                        source: article.source || { name: 'Unknown' },
                        publishedAt: article.date || 'Unknown date',
                        eventDetails: {
                            error: err.message,
                            location: 'Unknown location',
                            date: 'Unknown date',
                            image: article.urlToImage,
                        },
                    };
                }
            }));

            dispatch({
                type: FETCH_CYBERSECURITY_EVENTS_SUCCESS,
                payload: events,
            });
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        dispatch({
            type: FETCH_CYBERSECURITY_EVENTS_FAILURE,
            error: error.message,
        });
    }
};
