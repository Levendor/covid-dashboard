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
            type: 'time',
            time: {
              unit: 'month',
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

  renderChart(country, index) {
    this.chartConfig.data.datasets[0].data.length = 0;
    this.chartConfig.data.labels.length = 0;
    this.chartConfig.type = getChartType(index);

    let value = 0;
    const arr = [];
    for (let i = 1; i < 329; i++) {
      let label = '';
      do {
        label = `${Math.ceil(Math.random() * 12)}/${Math.ceil(Math.random() * 30)}/2020`;
      } while (arr.some((item) => item === label));
      // arr.push(new Date(label));
      arr.push(label);

      value += Math.round(-200 + Math.random() * 1000);
      const data = (this.chartConfig.type === 'bar')
        ? Math.round(Math.random() * 100000)
        : country.index[index].value + value;
      this.chartConfig.data.datasets[0].data.push(data);
    }
    this.chartConfig.data.labels.push(...arr);
    // this.chartConfig.data.labels.sort((a, b) => (a > b ? 1 : -1));
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
