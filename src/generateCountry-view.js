export default function generateCountry(item, index) {
  const number = document.createElement('span');
  number.textContent = item.index[index];
  number.classList.add('country-list__digits');
  number.classList.add('cases_digits');

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
