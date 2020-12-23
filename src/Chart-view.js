import Chart from './vendors/chartjs/Chart.bundle.min';
import {
  FULLSCREENASPECTRATIO,
  NARROWSCREENASPECTRATIO,
  WIDESCREENASPECTRATIO,
} from './constants';

export default class ViewChart {
  constructor(chartBox) {
    this.chartBox = chartBox;
    this.chart = null;
    this.chartConfig = { // chart options
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: '#ffff00',
          borderColor: '#ffff00',
          borderWidth: 0,
          fill: false,
        }],
      },
      options: {
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 20,
            bottom: 10,
          },
        },
        legend: {
          display: false,
        },
        aspectRatio: 1.1,
        maintainAspectRatio: true,
        responsiveAnimationDuration: 0,
        tooltips: {
          mode: 'nearest',
          axis: 'xy',
          animationDuration: 0,
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: '#333333',
              borderDash: [5, 5],
              tickMarkLength: 5,
              zeroLineWidth: 1.5,
              zeroLineColor: '#bdbdbd',
            },
            ticks: {
              maxRotation: 0,
              callback: (value, index) => {
                if (index % 3 === 2) return value.slice(0, 3);
                return null;
              },
            },
          }],
          yAxes: [{
            gridLines: {
              color: '#333333',
              borderDash: [5, 5],
              tickMarkLength: 5,
              zeroLineWidth: 1.5,
              zeroLineColor: '#bdbdbd',
            },
            ticks: {
              beginAtZero: true,
              callback: (value, index) => {
                if (index % 2 === 0) {
                  value = `${value}`;
                  if (value.length > 6) value = ` ${value.slice(0, -6)}M`;
                  else if (value.length > 3) value = ` ${value.slice(0, -3)}k`;
                  return value;
                }
                return null;
              },
            },
          }],
        },
      },
    };
  }

  initialize() {
    const chartElement = document.createElement('canvas');
    chartElement.className = 'chart';
    Chart.defaults.global.defaultFontColor = '#bdbdbd';
    Chart.defaults.global.defaultFontSize = 11;
    const chart = new Chart(chartElement, this.chartConfig);
    this.chart = chart;
    this.chartBox.append(chartElement);
  }

  renderChart(index, country) {
    if (country) this.country = country;
    this.chartConfig.data.datasets[0].data.length = 0;
    this.chartConfig.data.labels.length = 0;
    this.chartConfig.type = getChartType(index);

    this.country.index.history.values[0] = this.country.index.history.values[1];
    this.country.index.history.values.forEach((element, arrayIndex, array) => {
      array[arrayIndex] = array[arrayIndex].toFixed(2);
      if (element < 0) {
        array[arrayIndex] = 0;
      }
    });
    this.chartConfig.data.datasets[0].data.push(...this.country.index.history.values);
    this.chartConfig.data.labels.push(...this.country.index.history.dates);
    this.chart.update();
  }

  resizeChart() {
    const currentAspectRatio = document.body.offsetWidth < 1024
      ? NARROWSCREENASPECTRATIO
      : WIDESCREENASPECTRATIO;

    if (this.chart.aspectRatio !== FULLSCREENASPECTRATIO) {
      this.chart.aspectRatio = FULLSCREENASPECTRATIO;
    } else this.chart.aspectRatio = currentAspectRatio;
  }
}

function getChartType(index) {
  let chartType = '';
  if (index.includes('total')) chartType = 'line';
  else if (index.includes('last')) chartType = 'bar';
  return chartType;
}
