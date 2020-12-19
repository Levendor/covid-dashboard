// import countries from './countries-view';
import L from './vendors/leaflet/leaflet';
import './vendors/leaflet/leaflet.css';

export default class Map {
  constructor(countries, mapBox) {
    this.data = countries;
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
    this.layer = new L.TileLayer(this.layerSource, this.layerConfig);
    this.markers = [];
  }

  initialize() {
    this.map = new L.Map(this.mapBox, this.mapConfig);
    this.map.addLayer(this.layer);
    this.map.zoomControl.setPosition('bottomright');
    this.map.zoomControl.getContainer().classList.add('zoom-control');
  }

  renderMap(index) {
    this.markers.forEach((item) => item.remove());
    const assignMarkerSize = this.getMarkerSize(index);
    const indexTooltipClass = getIndexClass(index);
    this.data.forEach((item) => {
      const iconConfig = {
        iconUrl: getMarkerColor(index),
        className: assignMarkerSize(item.index[index].value),
      };
      const icon = new L.Icon(iconConfig);
      const markerConfig = {
        clickable: false,
        draggable: false,
        icon,
      };
      const marker = new L.Marker(item.coordinates, markerConfig);
      const tooltipConfig = {
        className: 'map-tooltip',
      };
      const tooltip = new L.Tooltip(tooltipConfig);
      tooltip.setContent(
        `<span class="map-popup__country">${item.countryName}</span>
        <br>${item.index[index].name}: <span class="${indexTooltipClass}">${item.index[index].value}</span>`,
      );
      marker.bindTooltip(tooltip);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  updateMap(index) {
    const assignMarkerSize = this.getMarkerSize(index);
    let indexTooltipClass = '';
    if (index.name.includes('ases')) indexTooltipClass = 'cases-digits';
    else if (index.name.includes('eaths')) indexTooltipClass = 'deaths-digits';
    else if (index.name.includes('ecovered')) indexTooltipClass = 'recovered-digits';

    this.markers.forEach((item) => {
      const countryName = item.getTooltip()._content.match(/(?<=>).+(?=<)/)[0];
      item.getTooltip().setContent(
        `<span class="map-popup__country">${countryName}</span>
        <br>Cases: <span class="${indexTooltipClass}">${index.value}</span>`,
      );
      item._icon.classList.remove(item.getIcon().options.className);
      item._icon.classList.add(assignMarkerSize(index.value));
    });
  }

  getMarkerSize(index) {
    const arr = this.data.map((item) => item.index[index].value).sort((a, b) => a - b);
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
