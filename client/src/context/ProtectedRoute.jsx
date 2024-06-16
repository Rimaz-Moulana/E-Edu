import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <>
            <Route
                {...rest}
                element={
                    <Navigate to="/" /> // Redirect to login page if token is missing/expired
                }
            />
            <Route
                {...rest}
                element={
                    <Component />
                }
            />
        </>
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired // Validate that component is a valid React component
};

export default ProtectedRoute;
