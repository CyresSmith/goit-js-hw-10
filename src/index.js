// eslint-disable-next-line no-undef
const _ = require('lodash');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries.js';

import './css/styles.css';

Notify.init({
  distance: '10px',
  position: 'center-top',
  cssAnimationStyle: 'from-top',
  showOnlyTheLastOne: 'true',
});

const DEBOUNCE_DELAY = 300;

const refs = {
  searchQueryInput: document.querySelector('[id="search-box"]'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.searchQueryInput.addEventListener(
  'input',
  _.debounce(onSearch, DEBOUNCE_DELAY)
);

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery === '') {
    markupReset(e);
    Notify.info('Please enter country name.');
  } else {
    fetchCountries(searchQuery)
      .then(countries => {
        switch (true) {
          case countries.length === 1:
            renderCountryInfo(countries);
            break;

          case countries.length > 2 && countries.length <= 10:
            renderCountryList(countries);
            break;

          case countries.length > 10:
            Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            break;

          default:
            break;
        }
      })
      .catch(e => {
        e;
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

const markupReset = e => {
  refs.countryInfo.innerHTML = '';
  refs.countryInfo.classList.add('visually-hidden');
  refs.countryList.innerHTML = '';
  refs.countryList.classList.add('visually-hidden');
  e.target.value = '';
};

const renderCountryInfo = countries => {
  refs.countryList.classList.add('visually-hidden');
  refs.countryList.innerHTML = '';
  refs.countryInfo.classList.remove('visually-hidden');

  refs.countryInfo.innerHTML = `
  <img src="${countries[0].flags.svg}" alt="flag" width="48" height="36">  
  <b class="countrie-name">${countries[0].name.official}</b>
  <p><b>Capital</b>: ${countries[0].capital[0]}</p>
  <p><b>Population</b>: ${countries[0].population}</p>
  <p><b>Languages</b>: ${Object.values(countries[0].languages).join(', ')}</p>
  `;
};

const renderCountryList = countries => {
  refs.countryInfo.classList.add('visually-hidden');
  refs.countryInfo.innerHTML = '';
  refs.countryList.classList.remove('visually-hidden');

  const markup = countries
    .map(
      country => `
          <li>
            <img src="${country.flags.svg}" alt="flag" width="36" height="27">
            <b>${country.name.official}</b>
          </li>
      `
    )
    .join('');

  refs.countryList.innerHTML = markup;
};
