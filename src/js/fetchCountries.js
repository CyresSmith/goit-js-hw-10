export { fetchCountries };

const fetchCountries = name => {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

fetchCountries('canada').then(countries => {
  console.log(countries[0].name.official);
  console.log(countries[0].capital[0]);
  console.log(countries[0].population);
  console.log(countries[0].flags.svg);
  console.dir(Object.values(countries[0].languages).join(', '));
});
