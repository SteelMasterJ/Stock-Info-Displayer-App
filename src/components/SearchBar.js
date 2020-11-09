import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const SearchForm = (props) => {
  
  const history = useHistory();
  const location = useLocation();

  React.useEffect( () => {
    // console.log('location = ', location.pathname, ", location: ", location.pathname.slice(8).toUpperCase(), ", searchTicker: ", props.searchTicker);
    if (location.pathname !== '/') {
      console.log('location = ', location.pathname, ", location: ", location.pathname.slice(8).toUpperCase(), ", searchTicker: ", props.searchTicker);
      props.submitLocationUpdate(location.pathname.slice(8).toUpperCase());
      if (location.pathname.slice(8).toUpperCase() !== props.searchTicker) {
        props.onSearch(location.pathname.slice(8));
      }
    }
  }, [location.pathname, props]);

  const [formValues, setFormValues] = React.useState({})

  const handleValueChange = (evt) => {
    //console.log(evt);
    const {value, name} = evt.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
    //console.log(formValues);
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    history.push({
      pathname: `/search/${formValues.search}`
    })
    console.log('1st console log ' + formValues.search);
    props.submitTickerUpdate(formValues.search.toUpperCase());
    props.onSearch(formValues.search);
    e.currentTarget.reset();
    console.log('2nd console log ' + formValues.search);
  }
  
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid d-flex">
          <div className="col">
            <div className="navbar-brand"><a className="nav-link text-dark" href="/">Graham Number Stock Displayer</a></div>
          </div>
        <div className="w-100"></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            </ul>
          </div>
        <div className="w-100"></div>
          <form className="search-form form-inline ml-auto navbar-text" onSubmit={handleSubmit} >
            {(props.error === "Too many requests, please wait 1 minute" || "Stock Data Not Found, Try Again") ? <div className="text-danger">{props.error}</div> : <div></div> }
            <input 
                  className="form-control mr-sm-2"
                  type="search" 
                  onChange={handleValueChange}
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  required
                  />
            <button type="submit" id="submit" className="search-button btn btn-outline-info my-2 my-sm-0">
              Search
            </button>
          </form>
      </div> 
    </nav>  
  );
}

export default SearchForm;