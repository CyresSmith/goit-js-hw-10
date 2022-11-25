export { fetchCountries };

const fetchCountries = inputValue =>
  fetch(
    `https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });

// console.log(countries[0].name.official);
// console.log(countries[0].capital[0]);
// console.log(countries[0].population);
// console.log(countries[0].flags.svg);
// console.log(countries[0].languages);
// console.dir(Object.values(countries[0].languages).join(', '));
