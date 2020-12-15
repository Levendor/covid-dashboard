import './scss/style.scss';
import View from './View';
// import L from './vendors/leaflet/leaflet';
// import './vendors/leaflet/leaflet.css';

const view = new View(container, list, search, mapBox, table, chartBox, date, listExpand, mapExpand, tableExpand, chartExpand);

view.initialize();
