import { ImRocket } from 'react-icons/im';
import style from './Searchbar.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [picture, setPicture] = useState('');

  const onChangePicture = e => {
    setPicture(e.currentTarget.value.toLowerCase());
  };

  const formHandler = e => {
    e.preventDefault();
    console.log(e.target.picture.value);
    onSubmit(picture);
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={formHandler}>
        <button type="submit" className={style.SearchForm_button}>
          <ImRocket
            style={{ display: 'flex', justifyContent: 'center', fill: 'red' }}
          />
          <span className={style.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={style.SearchForm_input}
          type="text"
          name="picture"
          value={picture}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangePicture}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  picture: PropTypes.string,
};
