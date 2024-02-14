import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ loginPath, children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return <Navigate to={loginPath} replace />;
};

export default AuthWrapper;
