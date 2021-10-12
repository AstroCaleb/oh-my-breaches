import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BreachDetails from './BreachDetails'

const UserLookup = () => {
    const [breachDetailsData, setBreachDetails] = useState(null);
    const [activelySearching, setSearching] = useState(false);
    const [lookupInfo, setLookupInfo] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
        let postData = new FormData();
        postData.append('url', `v3/breachedaccount/${lookupInfo}`);
        postData.append('queryParams', '?truncateResponse=false');

        // Handle loading visual
        setBreachDetails(null);
        setSearching(true);

        fetch('https://misc.calebdudleydesign.com/hibp/', {
            method: 'POST',
            body: postData
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    if (data.statusCode) {
                        alert(data.message);
                        setSearching(false);
                        return;
                    }
                    setBreachDetails(data);
                    setSearching(false);
                })
                .catch((error) => {
                    setBreachDetails([]);
                    setSearching(false);
                });
            }
        })
        .catch((error) => {
            setSearching(false);
        });
    };

    return (
        <>
            <form
                className="search-form"
                onSubmit={(e) => formSubmit(e, lookupInfo)}
            >
                <label htmlFor="find-breaches-input">Lookup Your Information</label>
                <input
                    type="text"
                    autoComplete="off"
                    id="find-breaches-input"
                    name="find-breaches-input"
                    placeholder="Email or Phone"
                    value={lookupInfo}
                    onChange={(e) => setLookupInfo(e.target.value)}
                />
                {activelySearching ?
                    <span className="infinite-spinner size-3x"></span>
                : null}
            </form>

            <section className="user-lookup-results">
                {(!breachDetailsData) ?
                    <h2>&uarr; Start a search &uarr;</h2>
                : null}

                {(breachDetailsData && breachDetailsData.length === 0) ?
                    <h2>No results! 🎉</h2>
                : null}

                {(breachDetailsData && breachDetailsData.length) ?
                    breachDetailsData.map((details, index) =>
                        <BreachDetails
                            key={index}
                            details={details}
                        />
                    )
                : null}
            </section>
        </>
    );
};

UserLookup.propTypes = {
    breachDetailsData: PropTypes.array,
    lookupInfo: PropTypes.string,
};

export default UserLookup;
