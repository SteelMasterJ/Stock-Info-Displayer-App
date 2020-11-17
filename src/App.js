import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import Profile from './components/Profile';
import ForOhFor from './components/ForOhFor';
import About from './components/About';

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchTicker: '',
      ticker: "",
      companyName: "",
      businessType: "",
      description: "",
      bookValue: "",
      dividend: "",
      eps: "",
      error: "",
      analystTargetPrice: "",
      location: "",
      currentPrice: "",
    };
  }

  //function that updates search ticker state in the app
  updateSearchTicker = (tickerValue) => {
    //console.log("updating searchTicker");
    this.setState({
      searchTicker: tickerValue
    })
  }

  //function that updates the location state in the app
  updateLocationState = (location) => {
    if (this.state.location !== this.state.ticker) {
      //console.log("updating location State");
      this.setState({
        location: location
      })
    }
  }

  //function that performs API search and sets state of the app to display
  //param is just the ticker symbol of the stock but this function works even without one
  performSearch = (query) => {
    console.log('performSearch has fired, searchTicker state:', this.state.searchTicker, "search params:", query);
    if (query === undefined) {
      axios.all([
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=aapl&apikey=6RZYLKNGHRN5DW3U`), 
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=aapl&apikey=7PEUQ2QLEQSDHMFM`)
      ])
      .then(axios.spread((finData, prices) => {
        // Both requests are now complete
        console.log(finData.data);
        console.log(prices.data);
        if (finData.data.Note === "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
            this.setState({
              error: "Only 2 searches per minute are allowed, just wait a few seconds before trying again"
            })
          } else if (JSON.stringify(finData.data) === "{}") {
            this.setState({
              error: "Stock Data Not Found, Try Again"
            })
          } else {
            this.setState({
              ticker: finData.data.Symbol,
              companyName: finData.data.Name,
              businessType: finData.data.Industry,
              description: finData.data.Description,
              bookValue: finData.data.BookValue,
              dividend: finData.data.ForwardAnnualDividendRate,
              eps: finData.data.DilutedEPSTTM,
              searchTicker: finData.data.Symbol,
              analystTargetPrice: finData.data.AnalystTargetPrice,
              currentPrice: prices.data['Global Quote']['05. price'],
              error: "",
            })
          }
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    } else {
      axios.all([
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=6RZYLKNGHRN5DW3U`), 
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=7PEUQ2QLEQSDHMFM`)
      ])
      .then(axios.spread((finData, prices) => {
        // Both requests are now complete
        console.log(finData.data);
        console.log(prices.data);
        if (finData.data.Note === "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency." 
        || prices.data.Note === "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
            this.setState({
              error: "Only 2 searches per minute are allowed, just wait a few seconds before trying again"
            })
          } else if (JSON.stringify(finData.data) === "{}") {
            this.setState({
              error: "Stock Data Not Found, Try Again"
            })
          } else {
            this.setState({
              ticker: finData.data.Symbol,
              companyName: finData.data.Name,
              businessType: finData.data.Industry,
              description: finData.data.Description,
              bookValue: finData.data.BookValue,
              dividend: finData.data.ForwardAnnualDividendRate,
              eps: finData.data.DilutedEPSTTM,
              searchTicker: finData.data.Symbol,
              analystTargetPrice: finData.data.AnalystTargetPrice,
              currentPrice: prices.data['Global Quote']['05. price'],
              error: "",
            })
          }
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
        <title>Stock Displayer Pro</title>
        <header className="App-header">
        </header>
        <SearchBar onSearch={this.performSearch} submitTickerUpdate={this.updateSearchTicker} submitLocationUpdate={this.updateLocationState} searchTicker={this.state.searchTicker} location={this.state.location} error={this.state.error}/>
        <Switch>
          <Route exact path="/search/:id" render={ () => <Profile 
            companyName={this.state.companyName} 
            ticker={this.state.ticker} 
            businessType={this.state.businessType} 
            websiteUrl={this.state.websiteUrl} 
            bookValue={this.state.bookValue} 
            dividend={this.state.dividend}
            eps={this.state.eps} 
            description={this.state.description}
            analystTargetPrice={this.state.analystTargetPrice}
            currentPrice={this.state.currentPrice}
            performSearch={this.performSearch} /> } 
            />
          <Route exact path="/" render={ () => <Profile 
            companyName={this.state.companyName} 
            ticker={this.state.ticker} 
            businessType={this.state.businessType} 
            websiteUrl={this.state.websiteUrl} 
            bookValue={this.state.bookValue} 
            dividend={this.state.dividend}
            eps={this.state.eps} 
            description={this.state.description}
            analystTargetPrice={this.state.analystTargetPrice}
            currentPrice={this.state.currentPrice}
            performSearch={this.performSearch} />} 
            />
          <Route exact path="/about" render={ () => <About/>}/>
          <Route component={ForOhFor} />
        </Switch> 
        {/* CDN script links */}
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
      </BrowserRouter>
    );
  }
}

export default App;
