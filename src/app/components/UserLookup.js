import React, { useState } from 'react';
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

        fetch('https://misc.calebdudleydesign.com/api/hibp.php', {
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
            <p
                style={{
                    color: '#7c2020',
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontStyle: 'oblique'
                }}
            >
                Apologies, unfortunately I allowed my API key to expire.
            </p>
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
                {(breachDetailsData) ?
                    <>
                        {(breachDetailsData.length) ?
                            breachDetailsData.map((details, index) =>
                                <BreachDetails
                                    key={index}
                                    details={details}
                                />
                            )
                            :
                            <h2>No results! 🎉</h2>
                        }
                    </>
                    :
                    <>
                        {(activelySearching) ?
                            <h2><em>Searching</em></h2>
                            :
                            <h2>&uarr; Start a search &uarr;</h2>
                        }
                    </>
                }
            </section>
        </>
    );
};

export default UserLookup;
