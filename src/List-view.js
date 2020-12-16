import generateListCountry from './generateListCountry-view';

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
      .sort((first, second) => second.index[index] - first.index[index]);
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
