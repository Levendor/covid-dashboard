import Chart from './vendors/chartjs/Chart.bundle.min';
// import countries from './countries-view';

export default class ViewChart {
  constructor(country, chartBox) {
    this.chartBox = chartBox;
    this.chart = null;
    this.vendorClass = null;
    this.country = country;
    this.chartConfig = { // chart options
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: '#ffff00',
          borderColor: '#ffff00',
          borderWidth: 1,
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
              callback: (value, index) => {
                if (index % 3 === 2) return value;
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
    const chart = document.createElement('canvas');
    this.chart = chart;
    chart.className = 'chart';
    Chart.defaults.global.defaultFontColor = '#bdbdbd';
    const vendorClassChart = new Chart(chart, this.chartConfig);
    this.vendorClass = vendorClassChart;
    this.chartBox.append(chart);
  }

  renderChart(index) {
    this.chartConfig.type = getChartType(index);
    let value = 0;
    const arr = [];
    for (let i = 1; i < 329; i++) {
      let label = '';
      do {
        label = `${Math.ceil(Math.random() * 12)}/${Math.ceil(Math.random() * 30)}/2020`;
      } while (arr.some((item) => item === label));
      arr.push(new Date(label));

      value += Math.round(-200 + Math.random() * 1000);
      const data = (this.chartConfig.type === 'bar')
        ? Math.round(Math.random() * 100000)
        : this.country.index[index].value + value;
      this.chartConfig.data.datasets[0].data.push(data);
    }
    this.chartConfig.data.labels.push(...arr);
    this.chartConfig.data.labels.sort((a, b) => (a > b ? 1 : -1));
    console.log(this.vendorClass);
  }

  resizeChart() {
    const FULLSCREENASPECTRATIO = 2.4;
    const RESTOREDASPECTRATIO = 1.1;
    if (this.vendorClass.aspectRatio !== FULLSCREENASPECTRATIO) {
      this.vendorClass.aspectRatio = FULLSCREENASPECTRATIO;
    } else this.vendorClass.aspectRatio = RESTOREDASPECTRATIO;
  }
}

function getChartType(index) {
  let chartType = '';
  if (index.includes('total')) chartType = 'line';
  else if (index.includes('last')) chartType = 'bar';
  return chartType;
}
/// 1222
