import generateCountry from './generateCountry-view';

export default class List {
  constructor(listContainer, countriesList) {
    this.list = listContainer;
    this.data = countriesList;
  }

  filterCountries(str) {
    return this.data.filter((item) => item.countryName.startsWith(str));
  }

  sortCountries(index, str) {
    const filteredCountriesList = this.filterCountries(str);

    return filteredCountriesList
      .sort((first, second) => second.index[index] - first.index[index]);
  }

  renderCountryList(index, str = '') {
    const fragment = document.createDocumentFragment();

    const sortedCountriesList = this.sortCountries(index, str);

    sortedCountriesList.forEach((item) => {
      fragment.append(generateCountry(item, index));
    });

    this.list.append(fragment);
  }
}
