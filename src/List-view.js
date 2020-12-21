import Observer from './Observer';

export default class List extends Observer {
  constructor(countries, global, listContainer, globalBox) {
    super();
    this.data = countries;
    this.globalData = global;
    this.list = listContainer;
    this.global = globalBox;
  }

  filterCountries(str) {
    return this.data.filter((item) => item.countryName.toLowerCase().startsWith(str));
  }

  sortCountries(index, str) {
    const filteredCountriesList = this.filterCountries(str);

    return filteredCountriesList
      .sort((first, second) => second.index[index].value - first.index[index].value);
  }

  renderList(index, str = '') {
    this.list.innerHTML = '';
    this.global.innerHTML = '';

    const globalObject = this.globalData;
    const global = generateListCountry(globalObject, index);
    global.addEventListener('click', () => {
      super.broadcast(globalObject, index);
    });
    this.global.append(global);

    const fragment = document.createDocumentFragment();

    const sortedCountriesList = this.sortCountries(index, str);

    sortedCountriesList.forEach((item) => {
      const countryElement = generateListCountry(item, index);
      countryElement.addEventListener('click', () => {
        super.broadcast(item, index);
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

  number.textContent = item.index[index].value;
  const countryNameElement = item.countryName;
  flag.src = item.flagPath;

  text.append(number, ' ', countryNameElement);
  country.append(text, flag);

  return country;
}
