import React from "react";
import "./ProfileData.css";

export const ProfileData = (props) => {
    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile Information</h2>
            <div>
                <div className="profile-label">First Name</div>
                <div className="profile-value">{props.graphData.givenName || "N/A"}</div>

                <div className="profile-label">Last Name</div>
                <div className="profile-value">{props.graphData.surname || "N/A"}</div>

                <div className="profile-label">Email</div>
                <div className="profile-value">{props.graphData.userPrincipalName}</div>

                <div className="profile-label">ID</div>
                <div className="profile-value">{props.graphData.id}</div>
            </div>
        </div>
    );
};