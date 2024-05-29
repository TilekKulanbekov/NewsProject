import React from 'react';
import PropTypes from 'prop-types';
import './EventItem.css';

const EventItem = ({ item }) => {
    const { title, description, url, urlToImage, source, publishedAt, eventDetails } = item;
    const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unknown date';
    // eslint-disable-next-line react/prop-types
    const eventDate = eventDetails && eventDetails.dateTime ? new Date(eventDetails.dateTime).toLocaleDateString() : 'Unknown date';
    const eventLocation = eventDetails && eventDetails.location ? eventDetails.location : 'Unknown location';
    const eventImage = eventDetails && eventDetails.image ? eventDetails.image : urlToImage;

    return (
        <div className="event-item card">
            {eventImage && (
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={eventImage} alt={title} />
                    </figure>
                </div>
            )}
            <div className="card-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{description}</p>
                <p className="is-size-7">Source: {source ? source.name : 'Unknown'}</p>
                <p className="is-size-7">Published: {formattedDate}</p>
                <p className="is-size-7">Location: {eventLocation}</p>
                <p className="is-size-7">Date: {eventDate}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="button is-link">Read more</a>
            </div>
        </div>
    );
};

EventItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        urlToImage: PropTypes.string,
        source: PropTypes.shape({
            name: PropTypes.string,
        }),
        publishedAt: PropTypes.string,
        eventDetails: PropTypes.shape({
            location: PropTypes.string,
            date: PropTypes.string,
            image: PropTypes.string,
        }),
    }).isRequired,
};

export default EventItem;
