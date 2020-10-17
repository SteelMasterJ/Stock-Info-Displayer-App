import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchForm = (props) => {
  
  const history = useHistory();

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
    props.onSearch(formValues.search);
    e.currentTarget.reset();
    console.log('2nd console log ' + formValues.search);
  }
  
  return (
    <div class="container mt-4">
        <form className="search-form form-inline my-2 my-lg-0" onSubmit={handleSubmit} >
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
    </div>    
  );
}

export default SearchForm;