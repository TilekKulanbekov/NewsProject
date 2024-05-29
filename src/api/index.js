// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { API_ROOT, NEWS_API, API_KEY, AUTH_API, USER_API } from './constants';

const HN_API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const EVENT_REGISTRY_API_URL = 'https://eventregistry.org/api/v1/article/getArticles';
const EVENT_REGISTRY_EVENT_URL = 'https://eventregistry.org/api/v1/event/getEvent';
const EVENT_REGISTRY_API_KEY = 'd162498d-0be8-4aeb-9cb4-1807334baf84'; // Your actual API key

export const fetchTopStoriesIds = () => {
    return axios.get(`${HN_API_BASE_URL}/topstories.json`);
};

export const fetchStoryById = (id) => {
    return axios.get(`${HN_API_BASE_URL}/item/${id}.json`);
};

export const fetchNewsApi = (query = 'cybersecurity', language = 'en', page = 1, pageSize = 30) => {
    return axios({
        method: 'get',
        url: `${API_ROOT}${NEWS_API}`,
        params: {
            q: query,
            language,
            page,
            pageSize,
            apiKey: API_KEY,
        },
    });
};
export const fetchCybersecurityNewsApi = () => {
    return axios({
        method: 'get',
        url: `${API_ROOT}${NEWS_API}`,
        params: {
            q: 'cybersecurity',
            apiKey: API_KEY,
        },
    });
};

export const fetchCybersecurityEventsApi = async () => {
    try {
        const response = await axios.post(EVENT_REGISTRY_API_URL, {
            action: 'getArticles',
            keyword: ['cybersecurity'],
            lang: ['eng'],
            articlesPage: 1,
            articlesCount: 30,
            articlesSortBy: 'sourceImportance',
            articlesSortByAsc: false,
            articlesArticleBodyLen: -1,
            includeArticleConcepts: true,
            includeArticleCategories: true,
            includeArticleImage: true,
            includeArticleSocialScore: true,
            includeArticleLocation: true,
            resultType: 'articles',
            apiKey: EVENT_REGISTRY_API_KEY,
        });
        console.log('Response data:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching cybersecurity events:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchEventDetailsApi = async (eventUri) => {
    try {
        const response = await axios.post(EVENT_REGISTRY_EVENT_URL, {
            eventUri,
            resultType: "articles",
            articlesPage: 1,
            articlesCount: 10,
            articlesLang: ["eng"],
            includeConceptImage: true,
            apiKey: EVENT_REGISTRY_API_KEY
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching event details:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const authApi = (user) => {
    return axios({
        method: 'post',
        url: API_ROOT + AUTH_API,
        headers: { 'content-type': 'application/json' },
        data: {
            email: user.username,
            password: user.password,
        },
    });
};

export const fetchUserInfoApi = (id) => {
    return axios({
        method: 'get',
        url: `${API_ROOT + USER_API}/${id}`,
    });
};
