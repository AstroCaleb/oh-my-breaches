import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const BreachDetails = ({details, closeBreachDetailsFn}) => {
    return (
        <section className="breach-details-section">
            <div className="details-heading">
                <img src={details.LogoPath} alt="Logo" />
                <h1>{details.Title}</h1>
            </div>
            <div className="breach-details-data-wrapper">
                <div className="breach-details-left">
                    <div className="data-item">
                        <h3>Domain</h3>
                        <p>{details.Domain}</p>
                    </div>

                    <div className="data-item">
                        <h3>Breach Date</h3>
                        <p>{moment(details.BreachDate).format('MMMM D, YYYY')}</p>
                    </div>

                    <div className="data-item">
                        <h3>Impacted Users</h3>
                        <p>{(details.PwnCount).toLocaleString(undefined)}</p>
                    </div>

                    <div className="data-item">
                        <h3>Compromised Data</h3>
                        <p>
                            {details.DataClasses.map((dataClass, index) =>
                                <span key={index} style={{ display: 'block', marginLeft: '10px' }}>&ndash; {dataClass}</span>
                            )}
                        </p>
                    </div>
                </div>
                <div className="breach-details-right">
                    <div className="data-item">
                        <h3>Description</h3>
                        <p
                            className="breach-detail-description"
                            dangerouslySetInnerHTML={{
                                __html: details.Description
                            }}
                        >
                        </p>
                    </div>
                </div>
            </div>

            {(closeBreachDetailsFn !== undefined) ?
                <>
                    <hr/>

                    <button
                        type="button"
                        className="light"
                        style={{ margin: '0 auto', display: 'block', padding: '10px 30px' }}
                        onClick={() => closeBreachDetailsFn(details.Name)}
                    >Close</button>
                </>
            : null}
        </section>
    );
};

BreachDetails.propTypes = {
    closeBreachDetailsFn: PropTypes.func,
};

export default BreachDetails;
