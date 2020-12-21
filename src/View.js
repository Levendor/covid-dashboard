import { countries, global } from './countries-view';
import List from './List-view';
import Search from './Search-view';
import Map from './Map-view';
import ViewChart from './Chart-view';
import Table from './Table-view';
import ViewDate from './Date-view';
import Expand from './Expand-view';
import Switcher from './Switcher-view';
import TableSwitcher from './TableSwitcher-view';
import * as Keyboard from './keyboard';
import './keyboard.css';

export default class View {
  constructor(
    container,
    list,
    globalBox,
    search,
    mapBox,
    table,
    chartBox,
    date,
    listExpand,
    mapExpand,
    tableExpand,
    chartExpand,
    listSwitcher,
    mapSwitcher,
    tableSwitcher,
    chartSwitcher,
  ) {
    this.data = countries;
    this.globalData = global;
    this.container = container;
    this.list = list;
    this.global = globalBox;
    this.search = search;
    this.map = mapBox;
    this.table = table;
    this.chart = chartBox;
    this.date = date;
    this.listExpand = listExpand;
    this.mapExpand = mapExpand;
    this.tableExpand = tableExpand;
    this.chartExpand = chartExpand;
    this.listSwitcher = listSwitcher;
    this.mapSwitcher = mapSwitcher;
    this.tableSwitcher = tableSwitcher;
    this.chartSwitcher = chartSwitcher;
  }

  initialize() {
    this.country = this.getCountry(Math.floor(Math.random() * 195));
    this.index = this.country.index[getIndex()].id;
    console.log(this.country);
    console.log(this.index);

    // const date = `${decimalize(Math.ceil(Math.random() * 31))}/${decimalize(Math.ceil(Math.random() * 12))}/2020, ${decimalize(Math.floor(Math.random() * 24))}:${decimalize(Math.floor(Math.random() * 60))}:${decimalize(Math.floor(Math.random() * 60))}`;

    // const date = new Date();
    const date = new Date(Date.parse('Sun Dec 18 2020 05:11:02 GMT+0300 (Москва, стандартное время)'));

    const viewList = new List(
      this.data,
      this.globalData,
      this.list,
      this.global,
    );

    const viewSearch = new Search(
      this.search,
      this.list,
    );

    const viewMap = new Map(
      this.data,
      this.map,
    );

    const viewTable = new Table(
      this.table,
    );

    const viewChart = new ViewChart(
      this.chart,
    );

    const viewDate = new ViewDate(
      this.date,
    );

    const viewListSwitcher = new Switcher(
      this.listSwitcher,
    );

    const viewMapSwitcher = new Switcher(
      this.mapSwitcher,
    );

    const viewChartSwitcher = new Switcher(
      this.chartSwitcher,
    );

    const viewTableSwitcher = new TableSwitcher(
      this.tableSwitcher,
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

    Keyboard.screenKeyboard.init(this.index, viewSearch, viewList);

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
    //       viewList.renderList(this.index, viewSearch.search.value.toLowerCase());
    //     });

    viewList.subscribe((country, index) => viewTable.renderTable(index, country));
    viewList.subscribe((country, index) => viewChart.renderChart(index, country));
    viewMap.subscribe((country, index) => viewTable.renderTable(index, country));
    viewMap.subscribe((country, index) => viewChart.renderChart(index, country));
    [viewListSwitcher, viewMapSwitcher, viewChartSwitcher, viewTableSwitcher]
      .forEach((switcher) => switcher.subscribe(
        (index) => viewList.renderList(index, viewSearch.search.value.toLowerCase()),
        (index) => viewChart.renderChart(index),
        (index) => viewMap.renderMap(index),
        (index) => viewTable.renderTable(index),
        (index) => Keyboard.screenKeyboard.getIndex(index),
      ));
    viewListSwitcher.subscribe(
      (index) => viewMapSwitcher.renderSwitcher(index),
      (index) => viewChartSwitcher.renderSwitcher(index),
      (index) => viewTableSwitcher.renderSwitcher(index),
    );
    viewMapSwitcher.subscribe(
      (index) => viewListSwitcher.renderSwitcher(index),
      (index) => viewChartSwitcher.renderSwitcher(index),
      (index) => viewTableSwitcher.renderSwitcher(index),
    );
    viewChartSwitcher.subscribe(
      (index) => viewListSwitcher.renderSwitcher(index),
      (index) => viewMapSwitcher.renderSwitcher(index),
      (index) => viewTableSwitcher.renderSwitcher(index),
    );
    viewTableSwitcher.subscribe(
      (index) => viewListSwitcher.renderSwitcher(index),
      (index) => viewMapSwitcher.renderSwitcher(index),
      (index) => viewChartSwitcher.renderSwitcher(index),
    );

    viewDate.renderDate(date);

    viewList.renderList(this.index);

    viewMap.initialize();
    viewMap.renderMap(this.index);

    viewTable.initialize();
    viewTable.renderTable(this.index, this.country);

    viewChart.initialize();
    viewChart.renderChart(this.index, this.country);

    viewListSwitcher.initialize(this.index);
    viewMapSwitcher.initialize(this.index);
    viewChartSwitcher.initialize(this.index);
    viewTableSwitcher.initialize(this.index);

    [this.list, this.map, this.table, this.chart].forEach((item) => {
      item.classList.remove('waiting');
    });
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
  return indexIDs[0];
}

function decimalize(n) {
  return n < 10 ? `0${n}` : n;
}
