import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BreachesTable from './components/BreachesTable';
import UserLookup from './components/UserLookup';

const App = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [breaches, setBreaches] = useState([]);
    const [showUserLookup, setShowUserLookup] = useState(false);
    let appLayout = '';

    useEffect(() => {
        let postData = new FormData();
        postData.append('url', 'v3/breaches/');
        fetch('https://misc.calebdudleydesign.com/hibp/', {
            method: 'POST',
            body: postData
        })
        .then((response) => response.json())
        .then(
            (data) => {
                setIsLoaded(true);
                const orderedBreaches = _.orderBy(data, 'BreachDate', 'desc');
                setBreaches(orderedBreaches);
            },
            (error) => {
                setError(data);
            }
        );
    }, []);

    if (error) {
        appLayout = (
            <div>Error: {error.message}</div>
        );
    }

    if (isLoaded) {
        appLayout = (
            <>
                <h1>Welcome!</h1>
                {!showUserLookup ?
                    <BreachesTable breaches={breaches} />
                : null}

                {showUserLookup ?
                    <UserLookup />
                : null}
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
