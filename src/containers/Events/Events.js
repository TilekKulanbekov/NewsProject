// src/containers/Events/Events.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, shape, string, func } from 'prop-types';
import { fetchCybersecurityEvents } from '../../store/actions/events';
import EventItem from '../../components/EventItem/EventItem';
import Loader from '../../UI/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Section from '../../UI/Section/Section';

class Events extends Component {
    componentDidMount() {
        // eslint-disable-next-line no-shadow
        const { fetchCybersecurityEvents } = this.props;
        fetchCybersecurityEvents();
    }

    renderContent = (arr) => {
        if (arr.length === 0) {
            return <p className="title">Событий нет</p>;
        }

        return (
            <>
                <h2 className="title">События по кибербезопасности</h2>
                <div className="columns is-multiline">
                    {arr.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className="column is-one-third" key={index}>
                            <EventItem item={item} />
                        </div>
                    ))}
                </div>
            </>
        );
    };

    render() {
        const { isLoading, events, errorMessage } = this.props;
        return (
            <Section>
                {events && this.renderContent(events)}
                {isLoading && <Loader />}
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            </Section>
        );
    }
}

Events.propTypes = {
    isLoading: bool.isRequired,
    errorMessage: string,
    fetchCybersecurityEvents: func.isRequired,
    events: arrayOf(
        shape({
            title: string,
            description: string,
            url: string,
            urlToImage: string,
            source: shape({
                name: string,
            }),
            publishedAt: string,
            eventDetails: shape({
                location: string,
                date: string,
                image: string,
            }),
        })
    ),
};

Events.defaultProps = {
    events: [],
    errorMessage: '',
};

const mapStateToProps = (state) => ({
    events: state.events.events,
    isLoading: state.events.isLoading,
    errorMessage: state.events.error,
});

export default connect(mapStateToProps, { fetchCybersecurityEvents })(Events);
