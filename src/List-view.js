import Observer from './Observer';

export default class List extends Observer {
  constructor(countries, globalData, listContainer, globalBox) {
    super();
    this.countries = countries;
    this.globalData = globalData;
    this.list = listContainer;
    this.globalBox = globalBox;
  }

  filterCountries(str) {
    return this.countries.filter((item) => item.countryName.toLowerCase().startsWith(str));
  }

  sortCountries(str) {
    const filteredCountriesList = this.filterCountries(str);

    return filteredCountriesList
      .sort((first, second) => second.index.value - first.index.value);
  }

  renderList(index, str = '', countries, globalData) {
    this.list.innerHTML = '';
    if (countries) this.countries = countries;
    if (globalData) this.globalData = globalData;
    if (str === '') {
      this.globalBox.innerHTML = '';
      const globalObject = this.globalData;
      const global = generateListCountry(globalObject, index);
      global.addEventListener('click', () => {
        super.broadcast(index, globalObject);
      });
      this.globalBox.append(global);
    }

    const fragment = document.createDocumentFragment();

    const sortedCountriesList = this.sortCountries(str);

    sortedCountriesList.forEach((item) => {
      const countryElement = generateListCountry(item, index);
      countryElement.addEventListener('click', () => {
        super.broadcast(index, item);
      });
      fragment.append(countryElement);
    });
    this.list.append(fragment);
  }
}

function generateListCountry(item, index) {
  const number = document.createElement('span');
  const flag = document.createElement('img');
  const text = document.createElement('span');
  const countryName = document.createElement('span');
  const country = document.createElement('div');

  number.classList.add('country-list__digits');
  flag.classList.add('country-list__flag');
  text.classList.add('country-list__text');
  countryName.classList.add('country-list__text');
  country.classList.add('country-list__item');
  flag.alt = 'flag';

  if (index.includes('ases')) number.classList.add('cases-digits');
  else if (index.includes('eaths')) number.classList.add('deaths-digits');
  else if (index.includes('ecovered')) number.classList.add('recovered-digits');

  number.textContent = item.index.value.toLocaleString('ru-RU');
  const countryNameElement = item.countryName;
  flag.src = item.flagPath;

  text.append(number, ' ', countryNameElement);
  country.append(text, flag);

  return country;
}
