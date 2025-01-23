import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }

    
    return (
        <Button variant="secondary" onClick={() => handleLogout()} className="ml-auto" drop="start" title="Sign Out">
            Sign out
        </Button>
    )
}