import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { string, bool, func } from 'prop-types';
import {
    getIsAuthed,
    getIsAuthLoading,
    getAuthErrorMessage,
} from '../../store/selectors';
import Input from '../../UI/Input/Input';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Section from '../../UI/Section/Section';
import inputs from '../../helpers/inputs';
import {auth} from "../../store/actions/auth";

class Login extends Component {
    state = {
        user: {
            username: '',
            password: '',
        },
    };

    componentDidUpdate(nextProps, prevState) {
        const { errorMessage } = this.props;
        if (
            errorMessage !== nextProps.errorMessage &&
            errorMessage === 'wrong_email_or_password'
        ) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                user: {
                    ...prevState.user,
                    password: '',
                },
            });
        }
    }

    onInputChange = (e) => {
        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [inputName]: inputValue,
            },
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { user } = this.state;
        // eslint-disable-next-line no-shadow
        const { auth } = this.props;
        auth(user);
    };

    renderInputs = (arr) => {
        const { user } = this.state;
        return arr.map((item) => (
            <Input
                key={item.name}
                name={item.name}
                value={user[item.name]}
                type={item.type}
                change={this.onInputChange}
                isRequired={item.isRequired}
                text={item.text}
                placeholder={item.testData}
            />
        ));
    };

    render() {
        const { isAuthed, isLoading, errorMessage } = this.props;
        const { user } = this.state;
        const { username, password } = user;

        const isEmpty =
            username.trim().length === 0 || password.trim().length === 0;

        return (
            <Section>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <h2 className="title">Вход в аккаунт</h2>
                        {errorMessage && (
                            <ErrorMessage errorMessage={errorMessage} />
                        )}
                        {isAuthed ? (
                            <Redirect to="/profile" />
                        ) : (
                            <form onSubmit={this.onSubmit}>
                                {this.renderInputs(inputs)}
                                <button
                                    className="button is-primary"
                                    type="submit"
                                    disabled={isLoading || isEmpty}
                                >
                                    {isLoading ? 'Проверка…' : 'Войти'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </Section>
        );
    }
}

Login.propTypes = {
    isAuthed: bool.isRequired,
    isLoading: bool,
    errorMessage: string,
    auth: func.isRequired,
};

Login.defaultProps = {
    isLoading: false,
    errorMessage: '',
};

const mapStateToProps = (state) => {
    return {
        isAuthed: getIsAuthed(state),
        isLoading: getIsAuthLoading(state),
        errorMessage: getAuthErrorMessage(state),
    };
};

export default connect(mapStateToProps, { auth })(Login);
