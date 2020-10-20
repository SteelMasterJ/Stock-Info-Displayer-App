import React from 'react';

const Profile = props => (
    <div className="App">
        <body>
        <div class="container">
            <div class="card mt-4">
            <h5 class="card-header">{props.companyName}</h5>
            <div class="card-body">
                <h5 class="card-title">{props.ticker}</h5>
                <p class="card-text">{props.businessType}</p>
                <a rel="noopener noreferrer" href={props.websiteUrl} class="btn btn-primary" target="_blank">Company Website</a>
            </div>
            </div>
        </div>
        </body>
    </div>
);

export default Profile;