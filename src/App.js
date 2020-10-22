import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import Profile from './components/Profile';
import ForOhFor from './components/ForOhFor';

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchTicker: 'AAPL',
      ticker: "AAPL",
      companyName: "Apple, Inc.",
      businessType: "Technology",
      websiteUrl: "https://www.apple.com/"
    };
  }

  updateSearchTicker = (tickerValue) => {
    console.log("updating searchTicker");
    this.setState({
      searchTicker: tickerValue
    })
  }

  performSearch = (query) => {
    console.log('performSearch has fired', this.state.searchTicker, query);
    if(query == null) {
      axios.get(`https://sandbox.iexapis.com/stable/stock/${this.state.searchTicker}/company?token=Tsk_a0d9dc43760d4c90974e7ce3945b6b0d&period={}`)
        .then(response => {
          this.setState({
            ticker: response.data.symbol,
            companyName: response.data.companyName,
            businessType: response.data.industry,
            websiteUrl: response.data.website
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    } else {
      axios.get(`https://sandbox.iexapis.com/stable/stock/${query}/company?token=Tsk_a0d9dc43760d4c90974e7ce3945b6b0d&period={}`)
        .then(response => {
          this.setState({
            ticker: response.data.symbol,
            companyName: response.data.companyName,
            businessType: response.data.industry,
            websiteUrl: response.data.website
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.performSearch();
  }

  //https://sandbox.iexapis.com/stable/stock/aapl/earnings?token=Tsk_a0d9dc43760d4c90974e7ce3945b6b0d&period={}
  //<Profile companyName={this.state.companyName} ticker={this.state.ticker} businessType={this.state.businessType} websiteUrl={this.state.websiteUrl} />   

  render() {
    return (
      <BrowserRouter>
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
        <title>Stock Displayer Pro</title>
        </head>
        <header className="App-header">
        </header>
        <SearchBar onSearch={this.performSearch} submitTickerUpdate={this.updateSearchTicker}/>
        <Switch>
          <Route exact path="/search/:id" render={ () => <Profile companyName={this.state.companyName} ticker={this.state.ticker} businessType={this.state.businessType} websiteUrl={this.state.websiteUrl} performSearch={this.performSearch} /> } />
          <Route exact path="/" render={ () => <Profile companyName={this.state.companyName} ticker={this.state.ticker} businessType={this.state.businessType} websiteUrl={this.state.websiteUrl} performSearch={this.performSearch} />} />
          <Route component={ForOhFor} />
        </Switch> 
        {/* CDN script links */}
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
      </BrowserRouter>
    );
  }
}

export default App;
