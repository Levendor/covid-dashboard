import Chart from './vendors/chartjs/Chart.bundle.min';

export default class ViewChart {
  constructor(countries, chartBox) {
    this.data = countries;
    this.chartBox = chartBox;
    this.country = {};
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
            },
          }],
        },
      },
    };
  }

  renderChart() {
    const chart = document.createElement('canvas');
    this.chart = chart;
    chart.className = 'chart';
    Chart.defaults.global.defaultFontColor = '#bdbdbd';
    const vendorClassChart = new Chart(chart, this.chartConfig);
    this.vendorClass = vendorClassChart;
    this.chartBox.append(chart);
  }

  getCountry(index) {
    this.country = this.data[index];
  }

  updateChart() {
    let value = 0;
    for (let i = 1; i < 329; i++) {
      const label = `${Math.ceil(Math.random() * 30)}/${Math.ceil(Math.random() * 12)}/2020`;
      value += Math.round(-500 + Math.random() * 1000);
      const data = this.country.index.totalCases + value;

      this.chartConfig.data.labels.push(label);
      this.chartConfig.data.datasets[0].data.push(data);
    }
  }

  resizeChart() {
    const FULLSCREENASPECTRATIO = 2.4;
    const RESTOREDASPECTRATIO = 1.1;
    if (this.vendorClass.aspectRatio !== FULLSCREENASPECTRATIO) {
      this.vendorClass.aspectRatio = FULLSCREENASPECTRATIO;
    } else this.vendorClass.aspectRatio = RESTOREDASPECTRATIO;
  }
}
