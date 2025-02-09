import React from 'react';
import PropTypes from 'prop-types';
import './NewsItem.css';

const NewsItem = ({ item }) => {
    const { title, description, url, urlToImage, source, publishedAt } = item;
    const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unknown date';

    return (
        <div className="news-item card">
            {urlToImage && (
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={urlToImage} alt={title} />
                    </figure>
                </div>
            )}
            <div className="card-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{description}</p>
                <p className="is-size-7">Source: {source ? source.name : 'Unknown'}</p>
                <p className="is-size-7">Published: {formattedDate}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="button is-link">Read more</a>
            </div>
        </div>
    );
};

NewsItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        urlToImage: PropTypes.string,
        source: PropTypes.shape({
            name: PropTypes.string,
        }),
        publishedAt: PropTypes.string,
    }).isRequired,
};

export default NewsItem;
