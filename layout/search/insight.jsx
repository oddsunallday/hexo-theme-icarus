'use strict';

const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../util/cache');

class Insight extends Component {
    render() {
        const { hint, translation, url_for } = this.props;

        const js = `(function (window) {
            var INSIGHT_CONFIG = {
                TRANSLATION: {
                    POSTS: '${translation.posts}',
                    PAGES: '${translation.pages}',
                    CATEGORIES: '${translation.categories}',
                    TAGS: '${translation.tags}',
                    UNTITLED: '${translation.untitled}',
                },
                CONTENT_URL: '${url_for('/content.json')}',
            };
            window.INSIGHT_CONFIG = INSIGHT_CONFIG;
        })(window);`;

        return <Fragment>
            <link rel="stylesheet" href={url_for('/css/search.css')} />
            <link rel="stylesheet" href={url_for('/css/insight.css')} />
            <div className="searchbox ins-search">
                <div className="searchbox-container ins-search-container">
                    <div className="searchbox-input-wrapper">
                        <input type="text" className="searchbox-input ins-search-input" placeholder={hint} />
                        <span className="searchbox-close ins-close ins-selectable"><i className="fa fa-times-circle"></i></span>
                    </div>
                    <div className="searchbox-result-wrapper ins-section-wrapper">
                        <div className="ins-section-container"></div>
                    </div>
                </div>
            </div>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
            <script src={url_for('/js/insight.js')} defer={true}></script>
        </Fragment>;
    }
}

module.exports = cacheComponent(Insight, 'search.insight', props => {
    return {
        hint: props.__('search.hint'),
        translation: {
            posts: props.__('insight.posts'),
            pages: props.__('insight.pages'),
            categories: props.__('insight.categories'),
            tags: props.__('insight.tags'),
            untitled: props.__('insight.untitled')
        },
        url_for: props.url_for
    };
});