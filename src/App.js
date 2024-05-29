import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import News from './containers/News/News';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import { getIsAuthed } from './store/selectors';
import Events from "./containers/Events/Events";

function App({ isAuthed }) {
    return (
        <>
            <Header />
            <Switch>
                <PrivateRoute
                    auth={isAuthed}
                    path="/profile"
                    component={() => <Profile />}
                />
                <Route exact path="/" component={Home} />
                <Route path="/news" component={News} />
                <Route path="/events" component={Events} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthed: getIsAuthed(state),
    };
};

App.propTypes = {
    isAuthed: bool.isRequired,
};

export default connect(mapStateToProps)(App);
