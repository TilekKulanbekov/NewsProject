import { combineReducers } from 'redux';
import news from './news';
import auth from './auth';
import profile from './profile';
import events from "./events";

export default combineReducers({
    auth,
    news,
    events,
    profile,
});
