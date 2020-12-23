// (async () => {
//   let countriesCovidInfo;
//   let globalCovidInfo;
//   let historyCovidCountryProvinceData;
//   const historyCovidCountryData = {};
//   let historyCovidGlobalData;

//   await fetch('https://disease.sh/v3/covid-19/all')
//     .then((response) => response.json())
//     .then((entries) => {
//       globalCovidInfo = entries;
//     });

//   await fetch('https://disease.sh/v3/covid-19/countries')
//     .then((response) => response.json())
//     .then((entries) => {
//       countriesCovidInfo = entries;
//     });

//   await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
//     .then((response) => response.json())
//     .then((entries) => {
//       historyCovidGlobalData = entries;
//     });

//   await fetch('https://disease.sh/v3/covid-19/historical?lastdays=all')
//     .then((response) => response.json())
//     .then((entries) => {
//       historyCovidCountryProvinceData = entries;
//     })
//     .then(() => {
//       let country = null;
//       let i = 0;
//       const temporaryArrayForCountriesWithProvinces = [];
//       historyCovidCountryProvinceData.forEach((element) => {
//         if (!element.province) {
//           historyCovidCountryData[element.country] = element.timeline;
//           i = 0;
//         } else {
//           i += 1;
//           temporaryArrayForCountriesWithProvinces.push(element);
//         }
//         country = element.country;
//       });
//       const countryListArray = [];
//       temporaryArrayForCountriesWithProvinces.push({ country: '' });
//       temporaryArrayForCountriesWithProvinces.forEach((element, index, array) => {
//         if (index < temporaryArrayForCountriesWithProvinces.length - 1
//             && array[index].country !== array[index + 1].country) {
//           countryListArray.push(array[index].country);
//         }
//       });
//       countryListArray.forEach((element, index, array) => {
//         const countryTimelineDataHistory = {
//           cases: {},
//           deaths: {},
//           recovered: {},
//         };
//         const timeArrayForCountry = [];
//         temporaryArrayForCountriesWithProvinces.forEach((elementX, index, array) => {
//           if (elementX.country === element) {
//             timeArrayForCountry.push(elementX.timeline);
//           }
//         });
//         const arrayWithDates = Object.keys(timeArrayForCountry[0].cases);
//         arrayWithDates.forEach((elementY, index, array) => {
//           const resultCases = timeArrayForCountry.reduce((a, b) => a + b.cases[elementY], 0);
//           const resultDeaths = timeArrayForCountry.reduce((a, b) => a + b.deaths[elementY], 0);
//           const resultRecovered = timeArrayForCountry
//             .reduce((a, b) => a + b.recovered[elementY], 0);
//           countryTimelineDataHistory.cases[elementY] = resultCases;
//           countryTimelineDataHistory.deaths[elementY] = resultDeaths;
//           countryTimelineDataHistory.recovered[elementY] = resultRecovered;
//         });

//         historyCovidCountryData[element] = countryTimelineDataHistory;
//       });
//     });

//   await main(
//     globalCovidInfo,
//     countriesCovidInfo,
//    historyCovidCountryData,
//    historyCovidGlobalData,
//  );
// })();

export default class Model {
  constructor(
    globalCovidInfo,
    countriesCovidInfo,
    historyCovidCountryProvinceData,
    historyCovidGlobalData,
  ) {
    this.dataGlobalCovidInfo = globalCovidInfo;
    this.dataCountriesCovidInfo = countriesCovidInfo;
    this.dataDateCovid = historyCovidCountryProvinceData;
    this.dataGlobalDateCovid = historyCovidGlobalData;

    this.apiDataCountry = [];
    this.apiDataTotal = [];
    this.per100кРopulation = 100000;

    this.dictionary = {
      totalCases: 'Total cases',
      totalDeaths: 'Total deaths',
      totalRecovered: 'Total recovered',
      totalCasesPerHundreds: 'Cases per 100 thousand',
      totalDeathsPerHundreds: 'Deaths per 100 thousand',
      totalRecoveredPerHundreds: 'Recovered per 100 thousand',
      lastCases: 'Total cases in the last day',
      lastDeaths: 'Total deaths in the last day',
      lastRecovered: 'Total recovered in the last day',
      lastCasesPerHundreds: 'Cases per 100 thousand in the last day',
      lastDeathsPerHundreds: 'Deaths per 100 thousand in the last day',
      lastRecoveredPerHundreds: 'Recovered per 100 thousand in the last day',
    };

    this.dictionaryTable = {
      totalCases: 'Total indexes',
      totalCasesPerHundreds: 'Indexes per 100 thousand',
      lastCases: 'Total indexes in the last day',
      lastCasesPerHundreds: 'Indexes per 100 thousand in the last day',
    };
  }

  initialize() {
    this.getDataFromCovidApiTotal();
    this.getDataFromCovidApiCountry();
  }

  getDataFromCovidApiCountry() {
    this.dataCountriesCovidInfo.forEach((element) => {
      this.apiDataCountry.push(
        {
          iso3: element.countryInfo.iso3,
          countryName: element.country,
          population: element.population,
          flagPath: element.countryInfo.flag,
          coordinates: [element.countryInfo.lat, element.countryInfo.long],
          index: {
            history: this.dataDateCovid[element.country],
            totalCases: element.cases,
            totalDeaths: element.deaths,
            totalRecovered: element.recovered,
            totalCasesPerHundreds: Math.round(
              (element.cases / element.population) * this.per100кРopulation,
            ),
            totalDeathsPerHundreds: Math.round(
              (element.deaths / element.population) * this.per100кРopulation,
            ),
            totalRecoveredPerHundreds: Math.round(
              (element.recovered / element.population) * this.per100кРopulation,
            ),
            lastCases: element.todayCases,
            lastDeaths: element.todayDeaths,
            lastRecovered: element.todayRecovered,
            lastCasesPerHundreds: Math.round(
              (element.todayCases / element.population) * this.per100кРopulation,
            ),
            lastDeathsPerHundreds: Math.round(
              (element.todayDeaths / element.population) * this.per100кРopulation,
            ),
            lastRecoveredPerHundreds: Math.round(
              (element.todayRecovered / element.population) * this.per100кРopulation,
            ),
          },
        },
      );
    });
  }

  getDataFromCovidApiTotal() {
    const entries = this.dataGlobalCovidInfo;

    this.apiDataTotal.push({
      iso3: null,
      coordinates: null,
      countryName: 'Global',
      flagPath: './assets/img/flags/Global.png',
      population: entries.population,
      index: {
        history: this.dataGlobalDateCovid,
        totalCases: entries.cases,
        totalDeaths: entries.deaths,
        totalRecovered: entries.recovered,
        totalCasesPerHundreds: Math.round((entries.cases / entries.population) * this.per100кРopulation),
        totalDeathsPerHundreds: Math.round((entries.deaths / entries.population) * this.per100кРopulation),
        totalRecoveredPerHundreds: Math.round((entries.recovered / entries.population) * this.per100кРopulation),
        lastCases: entries.todayCases,
        lastDeaths: entries.todayDeaths,
        lastRecovered: entries.todayRecovered,
        lastCasesPerHundreds: Math.round((entries.todayCases / entries.population) * this.per100кРopulation),
        lastDeathsPerHundreds: Math.round((entries.todayDeaths / entries.population) * this.per100кРopulation),
        lastRecoveredPerHundreds: Math.round((entries.todayRecovered / entries.population) * this.per100кРopulation),
      },
    });
  }

  getCountries(index) {
    const result = [];
    this.apiDataCountry.forEach((element) => {
      if (element.iso3) {
        result.push(
          {
            countryID: element.iso3,
            countryName: element.countryName,
            flagPath: element.flagPath,
            coordinates: element.coordinates,
            index: {
              id: index,
              name: this.dictionary[index],
              value: element.index[index],
            },
          },
        );
      }
    });
    return result;
  }

  getListGlobal(index) {
    return {
      countryID: null,
      countryName: this.apiDataTotal[0].countryName,
      flagPath: this.apiDataTotal[0].flagPath,
      coordinates: null,
      index: {
        id: index,
        name: this.dictionary[index],
        value: this.apiDataTotal[0].index[index],
      },
    };
  }

  getCountry(countryArg, index) {
    let array = null;
    let result = null;
    if (countryArg === 'Global') array = this.apiDataTotal;
    else array = this.apiDataCountry;
    array.forEach((element) => {
      if (element.countryName === countryArg) {
        const historyDateW = {
          totalCases: element.index.history.cases,
          totalDeaths: element.index.history.deaths,
          totalRecovered: element.index.history.recovered,

          totalCasesPerHundreds: (() => {
            const dateInArray = Object.keys(element.index.history.cases);
            const rez = {};
            dateInArray.forEach((elementT) => {
              rez[elementT] = Math.round(
                (element.index.history.cases[elementT]
                  / element.population) * this.per100кРopulation,
              );
            });
            return rez;
          })(),

          totalDeathsPerHundreds: (() => {
            const dateInArray = Object.keys(element.index.history.deaths);
            const rez = {};
            dateInArray.forEach((elementT) => {
              rez[elementT] = Math.round(
                (element.index.history.deaths[elementT]
                  / element.population) * this.per100кРopulation,
              );
            });
            return rez;
          })(), // element.history.deaths,

          totalRecoveredPerHundreds: (() => {
            const dateInArray = Object.keys(element.index.history.recovered);
            const rez = {};
            dateInArray.forEach((elementT) => {
              rez[elementT] = Math.round(
                (element.index.history.recovered[elementT]
                  / element.population) * this.per100кРopulation,
              );
            });
            return rez;
          })(), // element.history.recovered,

          lastCases: (() => {
            const dateInArray = Object.keys(element.index.history.cases);
            const valuesInArray = Object.values(element.index.history.cases);
            const arr = [];
            const rez = {};
            for (let i = dateInArray.length; i > 1; i--) {
              arr.push(valuesInArray[i] - valuesInArray[i - 1]);
            }
            arr.push(valuesInArray[0]);
            arr.reverse();
            let j = 0;
            for (const date of dateInArray) {
              rez[date] = arr[j];
              j += 1;
            }
            return rez;
          })(),
          lastDeaths: (() => {
            const dateInArray = Object.keys(element.index.history.deaths);
            const valuesInArray = Object.values(element.index.history.deaths);
            const arr = [];
            const rez = {};
            for (let i = dateInArray.length; i > 1; i--) {
              arr.push(valuesInArray[i] - valuesInArray[i - 1]);
            }
            arr.push(valuesInArray[0]);
            arr.reverse();
            let j = 0;
            for (const date of dateInArray) {
              rez[date] = arr[j];
              j += 1;
            }
            return rez;
          })(),
          lastRecovered: (() => {
            const dateInArray = Object.keys(element.index.history.recovered);
            const valuesInArray = Object.values(element.index.history.recovered);
            const arr = [];
            const rez = {};
            for (let i = dateInArray.length; i > 1; i--) {
              arr.push(valuesInArray[i] - valuesInArray[i - 1]);
            }
            arr.push(valuesInArray[0]);
            arr.reverse();
            let j = 0;
            for (const date of dateInArray) {
              rez[date] = arr[j];
              j += 1;
            }
            return rez;
          })(),
          lastCasesPerHundreds: (() => {
            const dateInArray = Object.keys(element.index.history.cases);
            const valuesInArray = Object.values(element.index.history.cases);
            const arr = [];
            const rez = {};
            for (let i = dateInArray.length; i > 1; i--) {
              arr.push(((valuesInArray[i] - valuesInArray[i - 1])
              / element.population) * this.per100кРopulation);
            }
            arr.push(valuesInArray[0]);
            arr.reverse();
            let j = 0;
            for (const date of dateInArray) {
              rez[date] = arr[j];
              j += 1;
            }
            return rez;
          })(),
          lastDeathsPerHundreds: (() => {
            const dateInArray = Object.keys(element.index.history.deaths);
            const valuesInArray = Object.values(element.index.history.deaths);
            const arr = [];
            const rez = {};
            for (let i = dateInArray.length; i > 1; i--) {
              arr.push(((valuesInArray[i] - valuesInArray[i - 1])
              / element.population) * this.per100кРopulation);
            }
            arr.push(valuesInArray[0]);
            arr.reverse();
            let j = 0;
            for (const date of dateInArray) {
              rez[date] = arr[j];
              j += 1;
            }
            return rez;
          })(),
          lastRecoveredPerHundreds: (() => {
            const dateInArray = Object.keys(element.index.history.recovered);
            const valuesInArray = Object.values(element.index.history.recovered);
            const arr = [];
            const rez = {};
            for (let i = dateInArray.length; i > 1; i--) {
              arr.push(((valuesInArray[i] - valuesInArray[i - 1])
              / element.population) * this.per100кРopulation);
            }
            arr.push(valuesInArray[0]);
            arr.reverse();
            let j = 0;
            for (const date of dateInArray) {
              rez[date] = arr[j];
              j += 1;
            }
            return rez;
          })(),
        };

        result = {
          countryID: element.iso3,
          countryName: element.countryName,
          flagPath: element.flagPath,
          index: {
            history: {
              name: this.dictionary[index],
              dates: Object.keys(historyDateW[index]),
              values: Object.values(historyDateW[index]),
            },
            totalCases: {
              id: 'totalCases',
              name: 'Total cases',
              value: element.index.totalCases,
            },
            totalDeaths: {
              id: 'totalDeaths',
              name: 'Total deaths',
              value: element.index.totalDeaths,
            },
            totalRecovered: {
              id: 'totalRecovered',
              name: 'Total recovered',
              value: element.index.totalRecovered,
            },
            totalCasesPerHundreds: {
              id: 'totalCasesPerHundreds',
              name: 'Cases per 100 thousand',
              value: element.index.totalCasesPerHundreds,
            },
            totalDeathsPerHundreds: {
              id: 'totalDeathsPerHundreds',
              name: 'Deaths per 100 thousand',
              value: element.index.totalDeathsPerHundreds,
            },
            totalRecoveredPerHundreds: {
              id: 'totalRecoveredPerHundreds',
              name: 'Recovered per 100 thousand',
              value: element.index.totalRecoveredPerHundreds,
            },
            lastCases: {
              id: 'lastCases',
              name: 'Total cases in the last day',
              value: element.index.lastCases,
            },
            lastDeaths: {
              id: 'lastDeaths',
              name: 'Total deaths in the last day',
              value: element.index.lastDeaths,
            },
            lastRecovered: {
              id: 'lastRecovered',
              name: 'Total recovered in the last day',
              value: element.index.lastRecovered,
            },
            lastCasesPerHundreds: {
              id: 'lastCasesPerHundreds',
              name: 'Cases per 100 thousand in the last day',
              value: element.index.lastCasesPerHundreds,
            },
            lastDeathsPerHundreds: {
              id: 'lastDeathsPerHundreds',
              name: 'Deaths per 100 thousand in the last day',
              value: element.index.lastDeathsPerHundreds,
            },
            lastRecoveredPerHundreds: {
              id: 'lastRecoveredPerHundreds',
              name: 'Recovered per 100 thousand in the last day',
              value: element.index.lastRecoveredPerHundreds,
            },
          },
        };
      }
    });
    return result;
  }

  getDate() {
    const date = new Date(this.dataGlobalCovidInfo.updated);
    return date; // 'dd/mm/yy hh:mm'
  }

  get getDictionaryTable() {
    return this.dictionaryTable;
  }

  get getDictionary() {
    return this.dictionary;
  }
}
