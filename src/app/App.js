import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BreachesTable from './components/BreachesTable';
import UserLookup from './components/UserLookup';

const App = () => {
    const [performingInitialSearch, setInitialSearch] = useState(false);
    const [error, setError] = useState(null);
    const [breaches, setBreaches] = useState([]);
    const [showUserLookup, setShowUserLookup] = useState(false);
    let appLayout = '';

    useEffect(() => {
        let postData = new FormData();
        postData.append('url', 'v3/breaches/');

        // visual for initial breaches search
        setInitialSearch(true);

        fetch('https://misc.calebdudleydesign.com/hibp/', {
            method: 'POST',
            body: postData
        })
        .then((response) => response.json())
        .then(
            (data) => {
                const orderedBreaches = _.orderBy(data, 'BreachDate', 'desc');
                setBreaches(orderedBreaches);
            },
            (error) => {
                setError(data);
            }
        ).finally(() => {
            setInitialSearch(false);
        });
    }, []);

    if (error) {
        appLayout = (
            <div>Error: {error.message}</div>
        );
    } else {
        appLayout = (
            <>
                <header>
                    <div className="header-inner">
                        <h2>Oh My Breaches!</h2>
                        <div className="btn-group">
                            <button
                                type="button"
                                className={`light ${(!showUserLookup) ? 'active' : ''}`}
                                onClick={() => setShowUserLookup(false)}
                            >All Breaches</button>

                            <button
                                type="button"
                                className={`light ${(showUserLookup) ? 'active' : ''}`}
                                onClick={() => setShowUserLookup(true)}
                            >Lookup My Breaches</button>
                        </div>
                    </div>
                </header>

                <section className="main">
                    {performingInitialSearch ?
                        <span className="infinite-spinner middle-page"></span>
                    : null}

                    <div style={{ margin: '30px auto 60px', maxWidth: '650px' }}>
                        <h1 style={{ textAlign: 'center' }}>Welcome!</h1>
                        <p>This app lets you search breach data provided specifically by the <a href="https://haveibeenpwned.com/" target="_blank" rel="noreferrer">Have I Been Pwned</a> API. You can either lookup details of a breach listed here or search your own information for any place your data may have been compromised in a breach.</p>
                    </div>

                    {(!showUserLookup && breaches.length) ?
                        <BreachesTable breaches={breaches} />
                    : null}

                    {showUserLookup ?
                        <UserLookup />
                    : null}
                </section>
            </>
        );
    }

    return appLayout;
};

App.defaultProps = {
    breaches: [],
};

App.propTypes = {
    breaches: PropTypes.array,
};

export default App;
