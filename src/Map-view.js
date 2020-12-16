import countries from './countries-view';
import L from './vendors/leaflet/leaflet';
import './vendors/leaflet/leaflet.css';

export default class Map {
  constructor(mapBox) {
    this.data = countries;
    this.mapBox = mapBox;
    this.mapConfig = {
      center: [0, 0],
      zoom: 2,
      // worldCopyJump: true,
    };
    this.layerSource = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    this.layerConfig = {
      attribution: '<a href="chartjs.org">Chart.js</a>',
      maxZoom: 5,
    };
    this.layer = new L.TileLayer(this.layerSource, this.layerConfig);
  }

  initialize() {
    this.map = new L.Map(this.mapBox, this.mapConfig);
    this.map.addLayer(this.layer);
    this.map.zoomControl.setPosition('bottomright');
    this.map.zoomControl.getContainer().classList.add('zoom-control');
  }

  renderMap() {
    this.data.forEach((item) => {
      const size = 3.5 + 1.5 * Math.floor(Math.random() * 10);
      const iconConfig = {
        iconUrl: './assets/icon/marker.png',
        iconSize: [size, size],
      };
      const icon = new L.icon(iconConfig);
      const markerConfig = {
        clickable: false,
        draggable: false,
        icon,
      };
      const marker = new L.marker(item.coordinates, markerConfig);
      const tooltipConfig = {
        className: 'map-tooltip',
      };
      const tooltip = new L.tooltip(tooltipConfig);
      tooltip.setContent(
        `<span class="map-popup__country">${item.countryName}</span>
        <br>Cases: ${item.index.totalCases}`,
      );
      marker.bindTooltip(tooltip);
      marker.addTo(this.map);
    });
  }
}
