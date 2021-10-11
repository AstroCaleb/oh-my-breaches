import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BreachDetails from './BreachDetails'

const BreachesTable = ({breaches}) => {
    const [breachDetailsData, setBreachDetailsData] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState({'name': '', 'loading': false});
    const [closingDetails, setClosingDetails] = useState(false);
    const [filteredBreaches, setFilteredBreaches] = useState('');
    let delayTimerFiltering;

    useEffect(() => {
        if (breachDetailsData) {
            // Setup details row for closing animation
            setTimeout(() => {
                let wrapperSelectorStr = `#${breachDetailsData.Name}-details-wrapper`;
                let wrapperSelector = document.querySelector(wrapperSelectorStr);
                wrapperSelector.style.minHeight = `${wrapperSelector.clientHeight}px`;
            }, 500);
        }
    }, [breachDetailsData])

    const closeBreachDetails = (breachName) => {
        let wrapperSelectorStr = `#${breachName}-details-wrapper`;
        document.querySelector(wrapperSelectorStr).style.minHeight = '0px';

        // For transition animation
        setClosingDetails(true);

        // Cleanup after closing transition
        setTimeout(() => {
            setClosingDetails(false);
            setBreachDetailsData(null);
        }, 600);
    };

    const showDetails = (breachName) => {
        let postData = new FormData();
        postData.append('url', `v3/breach/${breachName}`);

        // Handle loading visual
        setLoadingDetails({'name': breachName, 'loading': true});

        fetch('https://misc.calebdudleydesign.com/hibp/', {
            method: 'POST',
            body: postData
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.statusCode) {
                alert(data.message);
                setLoadingDetails({'name': '', 'loading': false});
                return;
            }
            setBreachDetailsData(data);
            setLoadingDetails({'name': '', 'loading': false});
        })
        .catch((error) => {
            setLoadingDetails({'name': '', 'loading': false});
        });
    };

    const filterBreaches = (e) => {
        let value = e.target.value;
        clearTimeout(delayTimerFiltering);
        delayTimerFiltering = setTimeout(() => {
            if (value.length >= 3) {
                setFilteredBreaches(value.toLocaleLowerCase());
            } else {
                setFilteredBreaches('');
            }
        }, 500);
    };

    return (
        <>
            {breaches.length ?
                <>
                    <form className="filter-breaches-form">
                        <label htmlFor="filter-breaches-input">Filter Breaches By Name</label>
                        <input
                            type="text"
                            autoComplete="off"
                            id="filter-breaches-input"
                            name="filter-breaches-input"
                            placeholder="Type at least 3 characters"
                            onChange={(e) => filterBreaches(e)}
                        />
                    </form>

                    <table>
                        <caption className="visuallyhidden">List of data breaches</caption>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Domain</th>
                                <th scope="col">Date</th>
                                <th scope="col">Impact</th>
                                <th scope="col">Impacted Users</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        {breaches.map((breach, index) =>
                            <tbody
                                key={index}
                                className={`
                                    ${(filteredBreaches.length && breach.Name.toLocaleLowerCase().indexOf(filteredBreaches) === -1) ? 'visuallyhidden' : ''}
                                    ${(breachDetailsData && breachDetailsData.Name === breach.Name) ? 'highlight-breach-row' : ''}
                                `}
                            >
                                <tr>
                                    <td>{breach.Title}</td>
                                    <td>{breach.Domain}</td>
                                    <td>{moment(breach.BreachDate).format('MMMM D, YYYY')}</td>
                                    <td style={{ maxWidth: '250px' }}>
                                        {breach.DataClasses.map((dataClass, index) =>
                                            <small key={index} style={{ display: 'block' }}>{dataClass}</small>
                                        )}
                                    </td>
                                    <td>{(breach.PwnCount).toLocaleString(undefined)}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {(breachDetailsData && breachDetailsData.Name === breach.Name) ?
                                            <button
                                                type="button"
                                                onClick={() => closeBreachDetails(breach.Name)}
                                            >Close</button>
                                            :
                                            <button
                                                type="button"
                                                onClick={() => showDetails(breach.Name)}
                                            >
                                                {(loadingDetails.loading && loadingDetails.name === breach.Name) ?
                                                    <span className="infinite-spinner size-1x"></span>
                                                    :
                                                    "Details"
                                                }
                                            </button>
                                        }
                                    </td>
                                </tr>
                                <tr className="details-row" style={{ borderTop: 'none' }}>
                                    <td colSpan="6" style={{ padding: '0', overflow: 'hidden' }}>
                                        <div
                                            id={`${breach.Name}-details-wrapper`}
                                            className={`
                                                ${(breachDetailsData && breachDetailsData.Name === breach.Name) ? 'show-content' : ''}
                                                ${(breachDetailsData && breachDetailsData.Name === breach.Name && closingDetails) ? 'close-content' : ''}
                                            `}
                                        >
                                            {(breachDetailsData && breachDetailsData.Name === breach.Name) ?
                                                <BreachDetails
                                                    details={breachDetailsData}
                                                    closeBreachDetailsFn={closeBreachDetails}
                                                />
                                            : null}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </>
                :
                <span className="infinite-spinner size-4x"></span>
            }
        </>
    );
};

BreachesTable.defaultProps = {
    breaches: [],
};

BreachesTable.propTypes = {
    breaches: PropTypes.array,
    loadingDetails: PropTypes.object,
};

export default BreachesTable;
