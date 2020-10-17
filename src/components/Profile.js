import React from 'react';

const Profile = props => (
    <div className="App">
        <body>
        <div class="container">
            <div class="card mt-4">
            <h5 class="card-header">{props.companyName}</h5>
            <div class="card-body">
                <h5 class="card-title">Stock Ticker</h5>
                <p class="card-text">Type of company</p>
                <a href="www.example.com" class="btn btn-primary">Company website</a>
            </div>
            </div>
        </div>
        </body>
    </div>
);

export default Profile;