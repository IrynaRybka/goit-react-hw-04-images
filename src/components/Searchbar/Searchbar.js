import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import { useState } from 'react';


export default function Searchbar ({onSubmit}) {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.info('Write the name of picture');
      return;
    }
    onSubmit(query);

    setQuery(event.target.elements.query.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <ImSearch className="button-label" />
        </button>
        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );

}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
