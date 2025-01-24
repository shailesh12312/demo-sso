import React from 'react';
import './styles/App.css';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { msalConfig } from './authConfig';
import { PublicClientApplication } from '@azure/msal-browser';

const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfilePage />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <LoginPage />
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    const msalInstance = new PublicClientApplication(msalConfig);
    return (
        <MsalProvider instance={msalInstance}>
        <PageLayout>
            <MainContent />
        </PageLayout>
        </MsalProvider>
    );
}
