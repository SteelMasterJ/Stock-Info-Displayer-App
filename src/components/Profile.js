import React from 'react';

//props.description.length >= 900 ? props.description.slice(0, 750) + "..." : props.description

const Profile = props => (
    <div className="App">
        <div className="container">
            <div className="card mt-4">
                <h5 className="card-header">{props.companyName}</h5>
                <div className="card-body">
                    <h5 className="card-title">{props.ticker}</h5>
                    <p className="card-text">{props.businessType.split(/(?=[A-Z])/).join(' ')}</p>
                    <p className="card-text font-weight-light">{props.description.length >= 750 ? props.description.slice(0, 600) + "..." : props.description}</p>
                    <a rel="noopener noreferrer" href={"https://finviz.com/quote.ashx?t=" + props.ticker} className="btn btn-primary" target="_blank">More Info</a>
                </div>
                <ul className="list-group list-group-flush card-body">
                    <li className={(props.bookValue > 0) ? "list-group-item" : "list-group-item text-danger"}>Book Value Per Share: {props.bookValue}</li>
                    <li className="list-group-item">Dividend Per Share: {props.DividendPerShare}</li>
                    <li className={(props.eps > 0) ? "list-group-item" : "list-group-item text-danger"}>Earnings Per Share (Diluted, Trailing Tweleve Months): {props.eps}</li>
                    <li className="list-group-item">Graham Number: {isNaN(Math.sqrt(22.5 * props.bookValue * props.eps)) ? "Don't buy this stock, it's fundamentals are flawed and/or some of its financial data is missing" : Math.sqrt(22.5 * props.bookValue * props.eps)}</li>
                </ul>
            </div>
            <footer>
            <p className="text-right"><small>2020 JoeyCorp®</small></p>
             </footer>
        </div>
    </div>
);

export default Profile;