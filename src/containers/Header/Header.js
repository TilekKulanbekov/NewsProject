import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, func, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import LoginButton from '../../UI/LoginButton/LoginButton';
import { getIsAuthed } from '../../store/selectors';
import routes from '../../helpers/routes';
import { logout } from '../../store/actions/auth';

// eslint-disable-next-line no-shadow
const Header = ({ isAuthed, logout, location }) => {
    const { t, i18n } = useTranslation();
    const [isClosed, setIsClosed] = useState(true);

    const menuHandler = () => {
        setIsClosed(!isClosed);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const renderLinks = (arr) => {
        return arr.map((item) => {
            if (item.path === location.pathname) {
                return (
                    <p key={item.id} className="navbar-item">
                        {item.name}
                    </p>
                );
            }
            if (!isAuthed && item.isAuthed) {
                return '';
            }

            return (
                <NavLink
                    key={item.id}
                    className="navbar-item"
                    exact={item.isExact}
                    to={item.path}
                >
                    {item.name}
                </NavLink>
            );
        });
    };

    return (
        <header className="has-background-light">
            <div className="container">
                <nav
                    className="navbar has-background-light"
                    role="navigation"
                    aria-label="main navigation"
                >
                    <div className="navbar-brand">
                        <h2 className="navbar-item is-size-4 is-uppercase has-text-weight-semibold">
                            {t('news')}
                        </h2>
                        <button
                            type="button"
                            className={`navbar-burger button is-text is-radiusless${isClosed ? '' : ' is-active'}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarMenu"
                            onClick={menuHandler}
                        >
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </button>
                    </div>
                    <div className={`navbar-menu${isClosed ? '' : ' is-active'}`} id="navbarMenu">
                        <div className="navbar-start">{renderLinks(routes)}</div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                {/* eslint-disable-next-line react/button-has-type */}
                                <button onClick={() => changeLanguage('en')}>English</button>
                                {/* eslint-disable-next-line react/button-has-type */}
                                <button onClick={() => changeLanguage('ru')}>Русский</button>
                            </div>
                            <div className="navbar-item">
                                <LoginButton isAuthed={isAuthed} logout={logout} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

Header.propTypes = {
    isAuthed: bool.isRequired,
    logout: func.isRequired,
    location: shape({
        pathname: string,
    }),
};

Header.defaultProps = {
    location: {
        pathname: '',
    },
};

const mapStateToProps = (state) => {
    return {
        isAuthed: getIsAuthed(state),
    };
};

export default connect(mapStateToProps, { logout })(withRouter(Header));
