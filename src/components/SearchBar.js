import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchForm = (props) => {
  
  const history = useHistory();
  // const location = useLocation();

  // React.useEffect( () => {
  //   console.log('location = ', location.pathname, ",", location.pathname.slice(8), ",", props.searchTicker);
  // }, [location.pathname, props]);

  // if (location.pathname !== '/') {
  //   props.locationSearch(location.pathname.slice(8));
  // }

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
    props.submitTickerUpdate(formValues.search);
    props.onSearch(formValues.search);
    e.currentTarget.reset();
    console.log('2nd console log ' + formValues.search);
  }
  
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="navbar-brand"><a className="nav-link" href="/">Graham Number Stock Displayer</a></div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
          </ul>
        </div>
        <form className="search-form form-inline ml-auto" onSubmit={handleSubmit} >
          {(props.error === "Too many requests, please wait 1 minute" || "Stock Data Not Found, Try Again") ? <div className="text-danger">{props.error}</div> : <div></div> }
          <input 
                className="form-control mr-sm-2"
                type="search" 
                onChange={handleValueChange}
                name="search"
                //ref={(input) => this.query = input}
                placeholder="Search"
                aria-label="Search"
                required
                />
          <button type="submit" id="submit" className="search-button btn btn-outline-info my-2 my-sm-0">
            Search
          </button>
        </form>  
    </nav>  
  );
}

export default SearchForm;