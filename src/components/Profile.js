import React from 'react';

const Profile = props => (
    <div className="App">
        {(props.ticker === "") ? <div className="text-center font-weight-bold mt-2">Enter a stock ticker in the search above to see info!</div> : <div className="container">
            <div className="card mt-4">
                <h5 className="card-header">{props.companyName}</h5>
                <div className="card-body">
                    <h5 className="card-title">{props.ticker}</h5>
                    <p className="card-text">{props.businessType.split(/(?=[A-Z])/).join(' ')}</p>
                    <p className="card-text font-weight-light">{props.description.length >= 750 ? props.description.slice(0, 600) + "..." : props.description}</p>
                    <a rel="noopener noreferrer" href={"https://finviz.com/quote.ashx?t=" + props.ticker} className="btn btn-primary" target="_blank">More Info</a>
                </div>
                <ul className="list-group list-group-flush card-body">
                    <li className={(props.bookValue > 0) ? "list-group-item" : "list-group-item text-danger"}>Book Value Per Share: ${parseFloat(props.bookValue).toFixed(2)}</li>
                    <li className="list-group-item">Annual Dividend Rate: ${parseFloat(props.dividend).toFixed(2) + " (" + (parseFloat(props.dividend / props.currentPrice * 100).toFixed(2)) + "%)"}</li>
                    <li className={(props.eps > 0) ? "list-group-item" : "list-group-item text-danger"}>Earnings Per Share (Diluted, Trailing Tweleve Months): ${parseFloat(props.eps).toFixed(2)}</li>
                    <li className="list-group-item">Analyst Target Price: {(props.analystTargetPrice === "None") ? "None" : "$" + parseFloat(props.analystTargetPrice).toFixed(2)}</li>
                    <li className="list-group-item">Current Price: ${parseFloat(props.currentPrice).toFixed(2)}</li>
                    <li className="list-group-item font-weight-bold">Graham Number: {isNaN(Math.sqrt(22.5 * props.bookValue * props.eps)) ? "Not Applicable - See above info" : "$" + parseFloat(Math.sqrt(22.5 * props.bookValue * props.eps)).toFixed(2)}</li>
                </ul>
            </div>
            <footer>
                <p className="text-right text-muted"><small>2020 JoeyCorp®</small></p>
            </footer>
        </div>}
    </div>
);

export default Profile;