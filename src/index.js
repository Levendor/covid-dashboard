import './scss/style.scss';
import Model from './Model';
import View from './View';

const container = document.getElementById('container');
const date = document.getElementById('date');

const listExpand = document.getElementById('listExpand');
const search = document.getElementById('search');
const globalBox = document.getElementById('globalBox');
const list = document.getElementById('list');
const listSwitcher = document.getElementById('listSwitcher');

const mapExpand = document.getElementById('mapExpand');
const mapBox = document.getElementById('mapBox');
const mapSwitcher = document.getElementById('mapSwitcher');

const tableExpand = document.getElementById('tableExpand');
const table = document.getElementById('table');
const tableSwitcher = document.getElementById('tableSwitcher');

const chartExpand = document.getElementById('chartExpand');
const chartBox = document.getElementById('chartBox');
const chartSwitcher = document.getElementById('chartSwitcher');

// initialize function ------------------

(async () => {
  let countriesCovidInfo;
  let globalCovidInfo;
  let historyCovidCountryProvinceData;
  const historyCovidCountryData = {};
  let historyCovidGlobalData;

  await fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((entries) => {
      globalCovidInfo = entries;
    });

  await fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((entries) => {
      countriesCovidInfo = entries;
    });

  await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
    .then((response) => response.json())
    .then((entries) => {
      historyCovidGlobalData = entries;
    });

  await fetch('https://disease.sh/v3/covid-19/historical?lastdays=all')
    .then((response) => response.json())
    .then((entries) => {
      historyCovidCountryProvinceData = entries;
    })
    .then(() => {
      // let country = null;
      // let i = 0;
      const temporaryArrayForCountriesWithProvinces = [];
      historyCovidCountryProvinceData.forEach((element) => {
        if (!element.province) {
          historyCovidCountryData[element.country] = element.timeline;
          // i = 0;
        } else {
          // i += 1;
          temporaryArrayForCountriesWithProvinces.push(element);
        }
        // country = element.country;
      });
      const countryListArray = [];
      temporaryArrayForCountriesWithProvinces.push({ country: '' });
      temporaryArrayForCountriesWithProvinces.forEach((element, index, array) => {
        if (index < temporaryArrayForCountriesWithProvinces.length - 1
            && array[index].country !== array[index + 1].country) {
          countryListArray.push(array[index].country);
        }
      });
      countryListArray.forEach((element) => {
        const countryTimelineDataHistory = {
          cases: {},
          deaths: {},
          recovered: {},
        };
        const timeArrayForCountry = [];
        temporaryArrayForCountriesWithProvinces.forEach((elementX) => {
          if (elementX.country === element) {
            timeArrayForCountry.push(elementX.timeline);
          }
        });
        const arrayWithDates = Object.keys(timeArrayForCountry[0].cases);
        arrayWithDates.forEach((elementY) => {
          const resultCases = timeArrayForCountry.reduce((a, b) => a + b.cases[elementY], 0);
          const resultDeaths = timeArrayForCountry.reduce((a, b) => a + b.deaths[elementY], 0);
          const resultRecovered = timeArrayForCountry
            .reduce((a, b) => a + b.recovered[elementY], 0);
          countryTimelineDataHistory.cases[elementY] = resultCases;
          countryTimelineDataHistory.deaths[elementY] = resultDeaths;
          countryTimelineDataHistory.recovered[elementY] = resultRecovered;
        });

        historyCovidCountryData[element] = countryTimelineDataHistory;
      });
    });

  await initialize(
    globalCovidInfo,
    countriesCovidInfo,
    historyCovidCountryData,
    historyCovidGlobalData,
  );
})();

function initialize(
  globalCovidInfo,
  countriesCovidInfo,
  historyCovidCountryProvinceData,
  historyCovidGlobalDataN,
) {
  const model = new Model(
    globalCovidInfo,
    countriesCovidInfo,
    historyCovidCountryProvinceData,
    historyCovidGlobalDataN,
  );

  const view = new View(
    container,
    list,
    globalBox,
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
    model,
  );

  model.initialize();

  view.initialize();
}
