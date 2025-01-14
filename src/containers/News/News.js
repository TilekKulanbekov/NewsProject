import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, shape, string, func } from 'prop-types';
import { fetchCybersecurityNews } from '../../store/actions/news';
import NewsItem from '../../components/NewsItem/NewsItem';
import Loader from '../../UI/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Section from '../../UI/Section/Section';

class News extends Component {
    componentDidMount() {
        // eslint-disable-next-line no-shadow
        const { fetchCybersecurityNews } = this.props;
        fetchCybersecurityNews();
    }

    renderContent = (arr) => {
        if (arr.length === 0) {
            return <p className="title">Новостей нет</p>;
        }

        return (
            <>
                <h2 className="title">Новости по кибербезопасности</h2>
                <div className="columns is-multiline">
                    {arr.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className="column is-one-third" key={index}>
                            <NewsItem item={item} />
                        </div>
                    ))}
                </div>
            </>
        );
    };

    render() {
        const { isLoading, news, errorMessage } = this.props;
        return (
            <Section>
                {news && this.renderContent(news)}
                {isLoading && <Loader />}
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            </Section>
        );
    }
}

News.propTypes = {
    isLoading: bool.isRequired,
    errorMessage: string,
    fetchCybersecurityNews: func.isRequired,
    news: arrayOf(
        shape({
            title: string,
            description: string,
            url: string,
            urlToImage: string,
            source: shape({
                name: string,
            }),
            publishedAt: string,
        })
    ),
};

News.defaultProps = {
    news: [],
    errorMessage: '',
};

const mapStateToProps = (state) => ({
    news: state.news.articles,
    isLoading: state.news.isLoading,
    errorMessage: state.news.error,
});

export default connect(mapStateToProps, { fetchCybersecurityNews })(News);
