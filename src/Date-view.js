export default class ViewDate {
  constructor(dateBox) {
    this.dateBox = dateBox;
  }

  renderDate(date) {
    if (Number.isNaN(Date.parse(date))) {
      this.dateBox.textContent = 'not available';
      this.dateBox.className = 'header__date_date cases-digits';
      return;
    }

    if (new Date() - Date.parse(date) > 172800000) this.dateBox.className = 'header__date_date cases-digits';
    else this.dateBox.className = 'header__date_date recovered-digits';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const viewDate = `${decimalize(day)}/${decimalize(month)}/${year}, ${decimalize(hour)}:${decimalize(minutes)}`;

    this.dateBox.textContent = viewDate;
  }
}

function decimalize(n) {
  return n < 10 ? `0${n}` : n;
}
