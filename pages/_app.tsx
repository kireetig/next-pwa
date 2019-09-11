import React from 'react';
import App from 'next/app';

import Header from '../components/Header';
import OfflineSupport from '../components/OfflineSupport';
import '../main.global.scss';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Header />
        <OfflineSupport />
        <Component {...pageProps} />
      </>
    );
  }
}

export default CustomApp;
