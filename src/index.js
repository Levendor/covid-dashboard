import './scss/style.scss';
import View from './View';

const view = new View(
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
  listSwitcher,
  mapSwitcher,
  tableSwitcher,
  chartSwitcher,
);

view.initialize();
