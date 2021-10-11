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
                className="find-breaches-form"
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
            </form>

            {activelySearching ?
                <span className="infinite-spinner size-8x"></span>
            : null}

            {(breachDetailsData && breachDetailsData.length) ?
                breachDetailsData.map((details, index) =>
                    <BreachDetails
                        key={index}
                        details={details}
                    />
                )
            : null}

            {(breachDetailsData && breachDetailsData.length === 0) ?
                <h1>No results!</h1>
            : null}

            {(breachDetailsData && breachDetailsData.length < 0) ?
                <h1>Uh oh, your data has been compromised</h1>
            : null}
        </>
    );
};

UserLookup.propTypes = {
    breachDetailsData: PropTypes.array,
    lookupInfo: PropTypes.string,
};

export default UserLookup;
