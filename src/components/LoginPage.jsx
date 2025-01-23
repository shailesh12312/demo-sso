import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useMsal } from '@azure/msal-react';
import { getLoginRequest } from '../authConfig';
import '../styles/login.css';

export const LoginPage = () => {
    const { instance } = useMsal();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const shouldShowPassword = !(isValidEmail(email) && email.includes('@shailesh312rejoicegmail.onmicrosoft.com'));

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await instance.loginRedirect(getLoginRequest(email));
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

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
