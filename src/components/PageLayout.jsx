/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignOutButton } from './SignOutButton';

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    console.log(isAuthenticated);
    
    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Microsoft Identity Platform
                </a>
                {isAuthenticated && <SignOutButton />}
            </Navbar>
            {props.children}
        </>
    );
};
