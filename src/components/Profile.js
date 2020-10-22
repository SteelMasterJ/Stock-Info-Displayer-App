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
                    <ul class="list-group list-group-flush card-body">
                        <li class="list-group-item">Book Value: {props.bookValue}</li>
                        <li class="list-group-item">Dividend Per Share: {props.DividendPerShare}</li>
                        <li class="list-group-item">Earnings Per Share (Diluted): {props.eps}</li>
                        <li class="list-group-item">Graham Number: </li>
                    </ul>
                </div>
            </div>
        </body>
    </div>
);

export default Profile;