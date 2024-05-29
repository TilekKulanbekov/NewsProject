import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, number, string, shape, arrayOf, func } from 'prop-types';
import {
    getProfile,
    getProfileErrorMessage,
    getProfileIsLoading,
    getUserId,
} from '../../store/selectors';
import Loader from '../../UI/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Section from '../../UI/Section/Section';
import {fetchUserInfo} from "../../store/actions/profile";

class Profile extends Component {
    componentDidMount() {
        // eslint-disable-next-line no-shadow
        const { id, fetchUserInfo } = this.props;
        fetchUserInfo(id);
    }

    renderContent = (user) => {
        return (
            <>
                <h2 className="title">Профиль пользователя</h2>
                <p className="is-size-5 mb-3">Город: {user.city}</p>
                <div className="mb-3">
                    <h3 className="is-size-5 has-text-weight-semibold">
                        Знание языков
                    </h3>
                    <ul>
                        {user.languages &&
                            user.languages.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                    </ul>
                </div>
                <div className="mb-3">
                    <h3 className="is-size-5 has-text-weight-semibold">
                        Контакты
                    </h3>
                    <ul>
                        {user.social &&
                            user.social.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.link}
                                        className="has-text-primary is-capitalized"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </>
        );
    };

    render() {
        const { profile, isLoading, errorMessage } = this.props;

        return (
            <Section>
                {profile && this.renderContent(profile)}

                {isLoading && <Loader />}

                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            </Section>
        );
    }
}

Profile.propTypes = {
    id: number.isRequired,
    isLoading: bool.isRequired,
    errorMessage: string,
    profile: shape({
        city: string.isRequired,
        languages: arrayOf(string.isRequired).isRequired,
        social: arrayOf(
            shape({
                label: string.isRequired,
                link: string.isRequired,
            })
        ).isRequired,
    }),
    fetchUserInfo: func.isRequired,
};

Profile.defaultProps = {
    profile: null,
    errorMessage: '',
};

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        isLoading: getProfileIsLoading(state),
        id: getUserId(state),
        errorMessage: getProfileErrorMessage(state),
    };
};

export default connect(mapStateToProps, { fetchUserInfo })(Profile);
