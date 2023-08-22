import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, SearchBtn, SearchForm, SearchInput } from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [textSQ, setTextSQ] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(textSQ);
  };

  const handleInputChange = ({ target }) => {
    setTextSQ(target.value);
  };

  return (
    <Header className="searchbar">
      <SearchForm className="form" onSubmit={handleFormSubmit}>
        <SearchBtn type="submit" className="button">
          Search
        </SearchBtn>

        <SearchInput
          className="input"
          type="text"
          placeholder="Search images and photos"
          name="textSQ"
          onChange={handleInputChange}
          value={textSQ}
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
