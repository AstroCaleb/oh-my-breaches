import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';
import BreachesTable from './components/BreachesTable';
import UserLookup from './components/UserLookup';

const App = () => {
    const [searching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const [breaches, setBreaches] = useState([]);
    const [showUserLookup, setShowUserLookup] = useState(false);
    let appLayout = '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['breaches'],
        queryFn: () => {
            return axios.get('https://haveibeenpwned.com/api/v3/breaches')
            .then((response) => response.data);
        }
    });

    useEffect(() => {
        if (isLoading) {
            setError(null);
            setIsSearching(true);
            return;
        }

        if (isError) {
            setError(data);
            setIsSearching(false);
            return;
        }

        setIsSearching(false);
        setBreaches(_.orderBy(data, 'BreachDate', 'desc'));
    }, [data, isLoading, isError]);

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
                    {searching ?
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

export default App;
