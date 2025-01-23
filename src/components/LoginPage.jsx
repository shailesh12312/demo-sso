import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useMsal } from '@azure/msal-react';
import { loginRequest, msalConfig } from '../authConfig';
import '../styles/login.css';
import { PublicClientApplication } from '@azure/msal-browser';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/get-microsoft-credentials');
                const data = await response.json();
                setCredentials(data.data);
            } catch (error) {
                console.error('Error fetching credentials:', error);
            }
        };
        fetchCredentials();
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const shouldShowPassword = !(isValidEmail(email) && credentials.some(cred => email.includes(cred.email)));

    const handleLogin = async () => {
        setIsLoading(true);
        const current = credentials.find(cred => email.includes(cred.email));
        console.log(current);

        try {
            const dynamicMsalConfig = {
                ...msalConfig,
                auth: {
                    clientId: current.clientId,
                    authority: current.authority,
                    redirectUri: msalConfig.auth.redirectUri,
                    postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
                }
            };
            const dynamicInstance = new PublicClientApplication(dynamicMsalConfig);
            await dynamicInstance.loginRedirect(loginRequest);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        if (isValidEmail(email)) {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="welcome-text">Login</h2>
                <p className="login-message">Please sign in to continue</p>
                <div>
                    {!shouldShowPassword && (
                        <div
                            className="single-sign-in-button mb-3"
                            style={{
                                backgroundColor: '#f8f9fa',
                                padding: '10px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #dee2e6'
                            }}
                        >
                            Single Sign In ON
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="form-label" htmlFor="email">Email</label>
                    </div>
                    {shouldShowPassword && (
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                id="password"
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>
                    )}
                    <div className="login-button-container">
                        <Button
                            variant="primary"
                            size="lg"
                            className="sign-in-button"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
