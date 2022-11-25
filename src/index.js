import './css/styles.css';
const _ = require('lodash');
import { fetchCountries } from './js/fetchCountries.js';

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
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  } else {
    fetchCountries(searchQuery)
      .then(countries => {
        switch (true) {
          case countries.length === 1:
            refs.countryList.innerHTML = '';
            renderCountryInfo(countries);
            break;

          case countries.length > 2 && countries.length <= 10:
            refs.countryInfo.innerHTML = '';
            renderCountryList(countries);
            break;

          case countries.length > 10:
            console.log(
              'Too many matches found. Please enter a more specific name.'
            );
            break;

          default:
            break;
        }
      })
      .catch(e => e);
  }
}

const renderCountryInfo = countries => {
  refs.countryInfo.innerHTML = `
  <img src="${countries[0].flags.svg}" alt="flag" width="48" height="36">  
  <b class="countrie-name">${countries[0].name.official}</b>
  <p><b>Capital</b>: ${countries[0].capital[0]}</p>
  <p><b>Population</b>: ${countries[0].population}</p>
  <p><b>Languages</b>: ${Object.values(countries[0].languages).join(', ')}</p>
  `;
};

const renderCountryList = countries => {
  const markup = countries
    .map(country => {
      return `
          <li>
            <img src="${country.flags.svg}" alt="flag" width="36" height="27">
            <b>${country.name.official}</b>
          </li>
      `;
    })
    .join('');

  refs.countryList.innerHTML = markup;
};
