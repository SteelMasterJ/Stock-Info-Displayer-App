import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import apikey from './config';

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
      DividendPerShare: "",
      eps: "",
      error: "",
    };
  }

  updateSearchTicker = (tickerValue) => {
    console.log("updating searchTicker");
    this.setState({
      searchTicker: tickerValue
    })
  }

  locationSearch = (location) => {
    console.log('locationSearch has fired', this.state.searchTicker, location);
    // eslint-disable-next-line
    if (location != this.state.searchTicker) {
      axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${location}&apikey=${apikey}`)
        .then(response => {
          console.log(response.data);
          this.setState({
            ticker: response.data.Symbol,
            companyName: response.data.Name,
            businessType: response.data.Industry,
            description: response.data.Description,
            bookValue: response.data.BookValue,
            DividendPerShare: response.data.DividendPerShare,
            eps: response.data.DilutedEPSTTM,
            searchTicker: location,
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }
  }

  performSearch = (query) => {
    console.log('performSearch has fired', this.state.searchTicker, query);
    if(query === undefined) {
      axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=aapl&apikey=${apikey}`)
        .then(response => {
          console.log(response.data.length);
          if (response.data.Note === "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
            this.setState({
              error: "Too many requests, please wait 1 minute"
            })
          } else if (JSON.stringify(response.data) === "{}") {
            this.setState({
              error: "Stock Data Not Found, Try Again"
            })
          } else {
            this.setState({
              ticker: response.data.Symbol,
              companyName: response.data.Name,
              businessType: response.data.Industry,
              description: response.data.Description,
              bookValue: response.data.BookValue,
              DividendPerShare: response.data.DividendPerShare,
              eps: response.data.DilutedEPSTTM,
              searchTicker: response.data.Symbol,
              error: "",
            })
          }
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    } else {
      axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=${apikey}`)
      .then(response => {
        console.log(response.data);
        if (response.data.Note === "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
          this.setState({
            error: "Too many requests, please wait 1 minute"
          })
        } else if (JSON.stringify(response.data) === "{}") {
          this.setState({
            error: "Stock Data Not Found, Try Again"
          })
        } else {
          this.setState({
            ticker: response.data.Symbol,
            companyName: response.data.Name,
            businessType: response.data.Industry,
            description: response.data.Description,
            bookValue: response.data.BookValue,
            DividendPerShare: response.data.DividendPerShare,
            eps: response.data.DilutedEPSTTM,
            searchTicker: response.data.Symbol,
            error: "",
          })
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.performSearch('aapl');
  }

  //https://sandbox.iexapis.com/stable/stock/aapl/earnings?token=Tsk_a0d9dc43760d4c90974e7ce3945b6b0d&period={}
  //<Profile companyName={this.state.companyName} ticker={this.state.ticker} businessType={this.state.businessType} websiteUrl={this.state.websiteUrl} />   

  render() {
    return (
      <BrowserRouter>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
        <title>Stock Displayer Pro</title>
        <header className="App-header">
        </header>
        <SearchBar onSearch={this.performSearch} submitTickerUpdate={this.updateSearchTicker} searchTicker={this.state.searchTicker} locationSearch={this.locationSearch} error={this.state.error}/>
        <Switch>
          <Route exact path="/search/:id" render={ () => <Profile 
            companyName={this.state.companyName} 
            ticker={this.state.ticker} 
            businessType={this.state.businessType} 
            websiteUrl={this.state.websiteUrl} 
            bookValue={this.state.bookValue} 
            DividendPerShare={this.state.DividendPerShare} 
            eps={this.state.eps} 
            description={this.state.description}
            performSearch={this.performSearch} /> } 
            />
          <Route exact path="/" render={ () => <Profile 
            companyName={this.state.companyName} 
            ticker={this.state.ticker} 
            businessType={this.state.businessType} 
            websiteUrl={this.state.websiteUrl} 
            bookValue={this.state.bookValue} 
            DividendPerShare={this.state.DividendPerShare} 
            eps={this.state.eps} 
            description={this.state.description}
            performSearch={this.performSearch} />} 
            />
          <Route exact path="/about" render={ () => <About/>}/>
          <Route component={ForOhFor} />
        </Switch> 
        {/* CDN script links */}
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
      </BrowserRouter>
    );
  }
}

export default App;
