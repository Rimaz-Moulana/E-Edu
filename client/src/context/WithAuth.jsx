import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect to login page if token is missing
                navigate('/');
            } else {
                // Decode token and check expiration
                const decodedToken = decodeToken(token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decodedToken.exp < currentTime) {
                    // Redirect to login page if token is expired
                    localStorage.removeItem('token');
                    navigate('/');
                }
            }
        }, [navigate]);

        return <Component {...props} />;
    };
}

// Decode JWT token
function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (error) {
        return {};
    }
}

export default withAuth;
