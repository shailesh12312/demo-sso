import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';
import { loginRequest } from '../authConfig';
import { callMsGraph } from '../graph';
import { ProfileData } from './ProfileData';

export const ProfilePage = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        }).then((response) => {
            callMsGraph(response.accessToken).then((response) => setGraphData(response));
        });
    }

    return (
        <div>
            <h5 className="card-title mb-3">Welcome {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </div>
    );
};
