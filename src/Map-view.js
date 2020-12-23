import Observer from './Observer';
import Leaflet from './vendors/leaflet/leaflet';
import './vendors/leaflet/leaflet.css';

export default class Map extends Observer {
  constructor(countries, mapBox) {
    super();
    this.countries = countries;
    this.mapBox = mapBox;
    this.mapConfig = {
      center: [0, 0],
      zoom: 2,
      // worldCopyJump: true,
      // maxBoundsViscosity: 1,
    };
    this.layerSource = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    this.layerConfig = {
      attribution: '<a href="chartjs.org">Chart.js</a>',
      maxZoom: 5,
    };
    this.layer = new Leaflet.TileLayer(this.layerSource, this.layerConfig);
    this.markers = [];
    this.legend = new Leaflet.Control({ position: 'topleft' });
  }

  initialize() {
    this.map = new Leaflet.Map(this.mapBox, this.mapConfig);
    this.map.addLayer(this.layer);
    this.map.zoomControl.setPosition('bottomright');
    this.map.zoomControl.getContainer().classList.add('zoom-control');
  }

  renderMap(index, countries) {
    if (countries) this.countries = countries;
    this.legend.onAdd = () => legendOnAdd(index, this.countries);
    this.legend.addTo(this.map);
    this.markers.forEach((item) => item.remove());
    const assignMarkerSize = getMarkerSize(index, this.countries);
    const indexTooltipClass = getIndexClass(index);
    this.countries.forEach((item) => {
      const iconConfig = {
        iconUrl: getMarkerColor(index),
        className: assignMarkerSize(item.index.value),
      };
      const icon = new Leaflet.Icon(iconConfig);
      const markerConfig = {
        clickable: false,
        draggable: false,
        icon,
      };
      const marker = new Leaflet.Marker(item.coordinates, markerConfig);
      const tooltipConfig = {
        className: 'map-tooltip',
      };
      marker.addEventListener('click', () => {
        super.broadcast(index, item);
      });
      const tooltip = new Leaflet.Tooltip(tooltipConfig);
      tooltip.setContent(
        `<span class="map-popup__country"><img class="map-popup__flag" src="${item.flagPath}" alt="flag">${item.countryName}</span>
        ${item.index.name}: <span class="${indexTooltipClass}">${item.index.value}</span>`,
      );
      marker.bindTooltip(tooltip);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  showLegend(index, array) {
    const legendBox = document.createElement('div');
    legendBox.className = 'legend-box';
    legendBox.innerHTML = `
    <div class="legend-box-head">
      <span class="legend-box-title">Legend</span>
      <div class="legend-box-close"></div>
    </div>`;
    const legendBoxBody = document.createElement('div');
    legendBoxBody.className = 'legend-box-body';
    const legendBoxIndex = document.createElement('span');
    legendBoxIndex.className = 'legend-box-index';
    legendBoxIndex.textContent = array[0].index.name;
    for (let i = 0; i < 10; i++) {
      const legendBoxItem = document.createElement('div');
      legendBoxItem.classList = 'legend-box-item';
      legendBoxItem.innerHTML = `
      <img src="${getMarkerColor(index)}" alt="legend-icon" class="$iconSize${i}">
      <span class="legend-box-item-text">${getLegendValues(index, array, i)}</span>
      `;
      legendBoxBody.append(legendBoxItem);
    }
    legendBox.append(legendBoxBody);
    this.mapBox.append(legendBox);
    this.legend.removeEventListener('click', this.showLegend);
    this.legend.addEventListener('click', this.hideLegend);
  }

  hideLegend() {
    this.mapBox.querySelector('.legend-box').remove();
    this.legend.removeEventListener('click', this.hideLegend);
    this.legend.addEventListener('click', this.showLegend);
  }
}

function getMarkerSize(index, array) {
  const arr = array.map((item) => item.index.value).sort((a, b) => a - b);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const step = (max - min) / 10;
  return function assignMarkerSize(value) {
    for (let i = 0; i < 9; i++) {
      if (value < min + (i + 1) * step) return `iconSize${i}`;
    }
    return 'iconSize9';
  };
}

function getLegendValues(index, array, i) {
  const arr = array.map((item) => item.index.value).sort((a, b) => a - b);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const step = (max - min) / 10;
  if (i === 0) return `< ${(min + (i + 1) * step).toFixed(0)}`;
  if (i === 9) return `> ${(min + (i) * step).toFixed(0)}`;
  return `${(min + (i) * step).toFixed(0)} - ${(min + (i + 1) * step).toFixed(0)}`;
}

function getMarkerColor(index) {
  let iconUrl = '';
  if (index.includes('ases')) iconUrl = './assets/icon/redMarker.png';
  else if (index.includes('eaths')) iconUrl = './assets/icon/whiteMarker.png';
  else if (index.includes('ecovered')) iconUrl = './assets/icon/greenMarker.png';
  return iconUrl;
}

function getIndexClass(index) {
  let indexTooltipClass = '';
  if (index.includes('ases')) indexTooltipClass = 'cases-digits';
  else if (index.includes('eaths')) indexTooltipClass = 'deaths-digits';
  else if (index.includes('ecovered')) indexTooltipClass = 'recovered-digits';
  return indexTooltipClass;
}

function legendOnAdd(index, array) {
  const legend = document.createElement('div');
  legend.className = 'legend';

  const legendBox = document.createElement('div');
  legendBox.className = 'legend-box';
  legendBox.innerHTML = `
  <div class="legend-box-head">
    <span class="legend-box-title">Legend</span>
  </div>`;
  const legendBoxBody = document.createElement('div');
  legendBoxBody.className = 'legend-box-body border';
  const legendBoxIndex = document.createElement('span');
  legendBoxIndex.className = 'legend-box-index';
  legendBoxIndex.textContent = array[0].index.name;
  legendBoxBody.append(legendBoxIndex);
  for (let i = 9; i >= 0; i--) {
    const legendBoxItem = document.createElement('div');
    legendBoxItem.classList = 'legend-box-item';
    legendBoxItem.innerHTML = `
    <div class="legend-box-img-box"><img src="${getMarkerColor(index)}" alt="legend-icon" class="iconSize${i}"></div>
    <span class="legend-box-item-text">${getLegendValues(index, array, i)}</span>
    `;
    legendBoxBody.append(legendBoxItem);
  }
  legendBox.append(legendBoxBody);
  legend.append(legendBox);

  return legend;
}
