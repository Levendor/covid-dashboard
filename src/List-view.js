import generateCountry from './generateCountry-view';

export default class List {
  constructor(countriesList, listContainer) {
    this.list = listContainer;
    this.data = countriesList;
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
      fragment.append(generateCountry(item, index));
    });

    this.list.append(fragment);
  }
}
