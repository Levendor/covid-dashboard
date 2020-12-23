import List from './List-view';
import Search from './Search-view';
import Map from './Map-view';
import ViewChart from './Chart-view';
import Table from './Table-view';
import ViewDate from './Date-view';
import Expand from './Expand-view';
import Switcher from './Switcher-view';
import TableSwitcher from './TableSwitcher-view';
import * as Keyboard from './vendors/keyboard/keyboard';
import './vendors/keyboard/keyboard.css';

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
    model,
  ) {
    this.container = container;
    this.list = list;
    this.globalBox = globalBox;
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
    this.model = model;
  }

  initialize() {
    this.index = 'totalCases';
    this.countries = this.model.getCountries(this.index);
    this.global = this.model.getListGlobal(this.index);
    this.country = this.model.getCountry('Global', this.index);

    const viewList = new List(
      this.countries,
      this.global,
      this.list,
      this.globalBox,
    );

    const viewSearch = new Search(
      this.search,
      this.list,
    );

    const viewMap = new Map(
      this.countries,
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

    viewList.subscribe((index, country) => viewTable.renderTable(
      index, this.model.getCountry(country.countryName, index),
    ));
    viewList.subscribe((index, country) => viewChart.renderChart(
      index, this.model.getCountry(country.countryName, index),
    ));
    viewMap.subscribe((index, country) => viewTable.renderTable(
      index, this.model.getCountry(country.countryName, index),
    ));
    viewMap.subscribe((index, country) => viewChart.renderChart(
      index, this.model.getCountry(country.countryName, index),
    ));
    [viewListSwitcher, viewMapSwitcher, viewChartSwitcher, viewTableSwitcher]
      .forEach((switcher) => switcher.subscribe(
        (index) => {
          this.index = index;
          this.countries = this.model.getCountries(index);
          this.global = this.model.getListGlobal(this.index);
          this.country = this.model.getCountry(this.country.countryName, index);
        },
        (index) => viewList.renderList(
          index,
          viewSearch.search.value.toLowerCase(),
          this.countries,
          this.global,
        ),
        (index) => viewChart.renderChart(index, this.country),
        (index) => viewMap.renderMap(index, this.countries),
        (index) => viewTable.renderTable(index, this.country),
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

    viewDate.renderDate(this.model.getDate());

    viewList.renderList(this.index);

    viewMap.initialize();
    viewMap.renderMap(this.index);

    viewTable.initialize();
    viewTable.renderTable(this.index, this.country);

    viewChart.initialize();
    viewChart.renderChart(this.index, this.country);

    viewListSwitcher.initialize(this.index, this.model.getDictionary);
    viewMapSwitcher.initialize(this.index, this.model.getDictionary);
    viewChartSwitcher.initialize(this.index, this.model.getDictionary);
    viewTableSwitcher.initialize(this.index, this.model.getDictionaryTable);

    [this.list, this.map, this.table, this.chart].forEach((item) => {
      item.classList.remove('waiting');
    });
  }
}
