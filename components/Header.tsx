import React, {useEffect, useState} from 'react';
import Router from 'next/router';
import Head from 'next/head';

import Nav from './Nav';

const Header = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Router.events.on("routeChangeStart", () => {
            setLoading(true);
        });
        Router.events.on("routeChangeComplete", () => {
            setLoading(false);
        });
        Router.events.on("routeChangeError", () => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="header">
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="description" content="An example PWA"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#302ecd"/>
                <title>Movies PWA</title>
                <link rel="manifest" href="/_next/static/manifest.json"/>
                <link rel="icon" href="/static/favicon.ico"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>
            </Head>
            <Loader loading={loading}/>
            <Nav/>
        </div>
    );
};

const Loader = ({loading}) => <div className={loading ? 'loading-show' : ''} id="loader-bar"/>;

export default Header;
