import countries from './countries-view';
import List from './List-view';
import Search from './Search-view';
import ViewChart from './viewChart-view';
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
    const index = 'totalCases';

    const viewList = new List(
      countries,
      this.list,
    );

    const viewSearch = new Search(
      this.search,
      this.list,
    );

    const viewChart = new ViewChart(
      countries,
      this.chart,
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

    viewSearch.search.addEventListener('input', () => {
      // viewList.renderCountryList(index, viewSearch.search.value.toLowerCase());
    });

    viewList.renderCountryList(index);

    viewChart.renderChart();
    viewChart.getCountry(Math.floor(Math.random() * 195));
    viewChart.updateChart();


    Keyboard.screenKeyboard.init(index,viewSearch,viewList);
  }
}
