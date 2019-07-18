import React, {useEffect} from 'react';

const OfflineSupport = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(() => console.log('service worker registered.'))
                .catch(err => console.dir(err));
        }
    }, []);

    return null;
};

export default OfflineSupport;