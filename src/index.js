import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {I18nextProvider} from "react-i18next";
import App from './App';
import store from './store/configureStore';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import i18n from "./i18n";

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <I18nextProvider i18n={i18n}>

                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
