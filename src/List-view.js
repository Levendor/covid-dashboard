// import generateListCountry from './generateListCountry-view';
// import countries from './countries-view';

export default class List {
  constructor(countries, listContainer) {
    this.data = countries;
    this.list = listContainer;
  }

  filterCountries(str) {
    return this.data.filter((item) => item.countryName.toLowerCase().startsWith(str));
  }

  sortCountries(index, str) {
    const filteredCountriesList = this.filterCountries(str);

    return filteredCountriesList
      .sort((first, second) => second.index[index].value - first.index[index].value);
  }

  renderCountryList(index, str = '') {
    this.list.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const sortedCountriesList = this.sortCountries(index, str);

    sortedCountriesList.forEach((item) => {
      fragment.append(generateListCountry(item, index));
    });

    this.list.append(fragment);
  }
}

function generateListCountry(item, index) {
  const number = document.createElement('span');
  number.textContent = item.index[index].value;
  number.classList.add('country-list__digits');

  if (index.includes('ases')) number.classList.add('cases-digits');
  else if (index.includes('eaths')) number.classList.add('deaths-digits');
  else if (index.includes('ecovered')) number.classList.add('recovered-digits');

  const flag = document.createElement('img');
  flag.src = item.flagPath;
  flag.alt = 'flag';
  flag.classList.add('county-list-flag');

  const text = document.createElement('span');
  text.classList.add('country-list__text');
  text.append(number, ' ', item.countryName);

  const country = document.createElement('div');
  country.classList.add('country-list__item');
  country.append(text, flag);

  return country;
}
