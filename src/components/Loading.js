import React from 'react';
import { useSelector } from 'react-redux';

const LoadingOverlay = () => {
    const { loading } = useSelector(state => state.auth);

    return (
        <div className={`loading-overlay ${loading ? 'active' : ''}`}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingOverlay;