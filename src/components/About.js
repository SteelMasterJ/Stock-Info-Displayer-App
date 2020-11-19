import React from 'react';

const About = props => (
    <div className="App">
        <div className="container">
            <div className="card mt-4">
                <h5 className="card-header">Thanks for using the Graham Stock Displayer App!</h5>
                <div className="card-body">
                    <h5 className="card-title">How to Use:</h5>
                    <p className="card-text">1. Input a stock ticker into the search bar. Use Google or any other popular search engine or stock market website to find stock tickers if you don't know them. This app wont work unless you use US stock market tickers.</p>
                    <p className="card-text">2. Read through the stock profile and all the financial data that displays in the app. The Graham number will be displayed at the bottom of the profile. This is a formula created by Benjamin Graham, The Father of Value Investing. The Graham Number is a general test for stock price that can help you determine if a stock is under or over valued.</p>
                    <p className="card-text">3. If any of the data turns red that is an indicator of poor or unhealthy financial data. Please note: Graham always recommended using at least 3 years of past Earnings Per Share data, but due to the current state of financial data reports this is not possible and this app only uses the last year of Earnings data.</p>
                    <p className="card-text">4. Compare the current price of the stock displayed in this app and compare it to the Graham Number. If the Graham Number is lower than the current price then that stock may be undervalued!</p>
                    <p className="card-text font-weight-light">Please Note this app is not intended to be used as investment advice, using of this app does NOT necessarily mean you should invest or not invest in something. This app is also not intended to be used as the sole determining factor in any stock purchasing decisions, please do you own research, and invest at your own risk.</p>
                    <a rel="noopener noreferrer" href={"https://www.investopedia.com/terms/g/graham-number.asp"} className="btn btn-primary" target="_blank">More Info on the Graham Formula</a>
                </div>
            </div>
            <footer>
                <p className="text-right text-muted"><small>2020 JoeyCorp®</small></p>
            </footer>
        </div>
    </div>
);

export default About;