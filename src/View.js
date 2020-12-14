import countries from './countries-view';
import List from './List-view';

export default class View {
  constructor(list, search, mapBox, table, chartBox, date) {
    this.list = list;
    this.search = search;
    this.map = mapBox;
    this.table = table;
    this.chart = chartBox;
    this.date = date;
  }

  initialize() {
    const index = 'totalCases';

    const viewList = new List(this.list, countries);

    viewList.renderCountryList(index);
  }
}
