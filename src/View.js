import countries from './countries-view';
import List from './List-view';
import Search from './Search-view';
import Map from './Map-view';
import ViewChart from './viewChart-view';
import ViewDate from './Date-view';
import Expand from './Expand-view';
import * as Keyboard from './keyboard';
import './keyboard.css';

export default class View {
  constructor(
    container,
    list,
    search,
    mapBox,
    table,
    chartBox,
    date,
    listExpand,
    mapExpand,
    tableExpand,
    chartExpand,
  ) {
    this.data = countries;
    this.container = container;
    this.list = list;
    this.search = search;
    this.map = mapBox;
    this.table = table;
    this.chart = chartBox;
    this.date = date;
    this.listExpand = listExpand;
    this.mapExpand = mapExpand;
    this.tableExpand = tableExpand;
    this.chartExpand = chartExpand;
  }

  initialize() {
    this.country = this.getCountry(Math.floor(Math.random() * 195));
    this.index = this.country.index[getIndex()].id;

    // const date = `${decimalize(Math.ceil(Math.random() * 31))}/${decimalize(Math.ceil(Math.random() * 12))}/2020, ${decimalize(Math.floor(Math.random() * 24))}:${decimalize(Math.floor(Math.random() * 60))}:${decimalize(Math.floor(Math.random() * 60))}`;

    // const date = new Date();
    const date = new Date(Date.parse('Sun Dec 18 2020 05:11:02 GMT+0300 (Москва, стандартное время)'));

    const viewList = new List(
      this.data,
      this.list,
    );

    const viewSearch = new Search(
      this.search,
      this.list,
    );

    const viewMap = new Map(
      this.data,
      this.map,
    );

    const viewChart = new ViewChart(
      this.country,
      this.chart,
    );

    const viewDate = new ViewDate(
      this.date,
    );

    const viewListExpand = new Expand(
      this.container,
      this.listExpand.parentNode,
      this.listExpand.parentNode,
      this.listExpand,
    );
    const viewMapExpand = new Expand(
      this.container,
      this.mapExpand.parentNode,
      this.mapExpand.parentNode,
      this.mapExpand,
    );
    const viewTableExpand = new Expand(
      this.container,
      this.tableExpand.parentNode.parentNode,
      this.tableExpand.parentNode.parentNode,
      this.tableExpand,
      this.tableExpand.parentNode,
    );
    const viewChartExpand = new Expand(
      this.container,
      this.chartExpand.parentNode.parentNode,
      this.chartExpand.parentNode.parentNode,
      this.chartExpand,
      this.chartExpand.parentNode,
    );

    viewListExpand.expandButton.addEventListener('click', () => {
      viewListExpand.expandCollapseElement(
        viewMapExpand.elementToCollapse,
        viewTableExpand.elementToCollapse,
      );
    });
    viewMapExpand.expandButton.addEventListener('click', () => {
      viewMapExpand.expandCollapseElement(
        viewListExpand.elementToCollapse,
        viewTableExpand.elementToCollapse,
      );
      const resizeEvent = new Event('resize');
      window.dispatchEvent(resizeEvent);
    });
    viewTableExpand.expandButton.addEventListener('click', () => {
      viewTableExpand.expandCollapseElement(
        viewListExpand.elementToCollapse,
        viewMapExpand.elementToCollapse,
        viewChartExpand.siblingElementToCollapse,
      );
    });
    viewChartExpand.expandButton.addEventListener('click', () => {
      viewChartExpand.expandCollapseElement(
        viewListExpand.elementToCollapse,
        viewMapExpand.elementToCollapse,
        viewTableExpand.siblingElementToCollapse,
      );
      viewChart.resizeChart();
    });

    //     viewSearch.search.addEventListener('input', () => {
    //       viewList.renderCountryList(this.index, viewSearch.search.value.toLowerCase());
    //     });

    viewDate.renderDate(date);

    viewList.renderCountryList(this.index);

    viewMap.initialize();
    viewMap.renderMap(this.index);

    viewChart.initialize();
    viewChart.renderChart(this.index);

    [this.list, this.map, this.table, this.chart].forEach((item) => {
      item.classList.remove('waiting');
    });

    Keyboard.screenKeyboard.init(this.index, viewSearch, viewList);
  }

  getCountry(index) {
    return this.data[index];
  }
}

function getIndex() {
  const indexNames = [
    'Total cases',
    'Total deaths',
    'Total recovered',
    'Cases per 100 thousand',
    'Deaths per 100 thousand',
    'Recovered per 100 thousand',
    'Total cases in the last day',
    'Total deaths in the last day',
    'Total recovered in the last day',
    'Cases per 100 thousand in the last day',
    'Deaths per 100 thousand in the last day',
    'Recovered per 100 thousand in the last day',
  ];
  const indexIDs = [
    'totalCases',
    'totalDeaths',
    'totalRecovered',
    'totalCasesPerHundreds',
    'totalDeathsPerHundreds',
    'totalRecoveredPerHundreds',
    'lastCases',
    'lastDeaths',
    'lastRecovered',
    'lastCasesPerHundreds',
    'lastDeathsPerHundreds',
    'lastRecoveredPerHundreds',
  ];
  return indexIDs[Math.floor(Math.random() * 12)];
}

function decimalize(n) {
  return n < 10 ? `0${n}` : n;
}
