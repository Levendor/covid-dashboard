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
        historyCovidCountryProvinceData.forEach((element) => {
          if (!element.province) {
            historyCovidCountryData[element.country] = element.timeline;
          }
          //!
        });
      });
  
    await main(globalCovidInfo, countriesCovidInfo, historyCovidCountryData, historyCovidGlobalData);
  })();
  
  class Covid19Info {
    constructor(globalCovidInfo, countriesCovidInfo, historyCovidCountryProvinceData, historyCovidGlobalData) {
      this.dataGlobalCovidInfo = globalCovidInfo;
      this.datacountriesCovidInfo = countriesCovidInfo;
      this.dataDateCovid = historyCovidCountryProvinceData;
      this.dataGlobalDateCovid = historyCovidGlobalData;
  
      this.apiDataCountry = [];
      this.apiDataTotal = [];
      this.per100кРopulation = 100000;
      this.getDataFromCovidApiTotal();
      this.getDataFromCovidApiCountry();
  
      this.dictionary = {
        totalCases: 'Total cases',
        totalDeaths: 'Total deaths',
        totalRecovery: 'Total recovered',
        casesInLastDay: 'Total cases in the last day',
        deathInLastDay: 'Total deaths in the last day',
        recoveryInLastDay: 'Total recovered in the last day',
        per100KCases: 'Cases per 100 thousand',
        per100KDeath: 'Deaths per 100 thousand',
        per100KRecovery: 'Recovered per 100 thousand',
        per100KCasesInLastDay: 'Cases per 100 thousand in the last day',
        per100KDeathInLastDay: 'Deaths per 100 thousand in the last day',
        per100KRecoveryInLastDay: 'Recovered per 100 thousand in the last day',
      };
  
    }
  
    getDataFromCovidApiCountry() {
      this.datacountriesCovidInfo.forEach((element) => {
        this.apiDataCountry.push(
          {
            country: element.country,
            population: element.population,
            iso3: element.countryInfo.iso3,
            flag: element.countryInfo.flag,
            countryСenterСoordinates: [element.countryInfo.lat, element.countryInfo.long],
            totalCases: element.cases,
            totalDeaths: element.deaths,
            totalRecovery: element.recovered,
            casesInLastDay: element.todayCases,
            deathInLastDay: element.todayDeaths,
            recoveryInLastDay: element.todayRecovered,
            per100KCases: Math.round((element.cases / element.population) * this.per100кРopulation),
            per100KDeath: Math.round((element.deaths / element.population) * this.per100кРopulation),
            per100KRecovery: Math.round((element.recovered / element.population) * this.per100кРopulation),
            per100KCasesInLastDay: Math.round((element.todayCases / element.population) * this.per100кРopulation),
            per100KDeathInLastDay: Math.round((element.todayDeaths / element.population) * this.per100кРopulation),
            per100KRecoveryInLastDay: Math.round((element.todayRecovered / element.population) * this.per100кРopulation),
            history: this.dataDateCovid[element.country],
  
          },
        );
      });
    }
  
    getDataFromCovidApiTotal() {
      const entries = this.dataGlobalCovidInfo;
      this.apiDataTotal.push(
        {
          country: 'total',
          totalCases: entries.cases,
          totalDeaths: entries.deaths,
          totalRecovery: entries.recovered,
          casesInLastDay: entries.todayCases,
          deathInLastDay: entries.todayDeaths,
          recoveryInLastDay: entries.todayRecovered,
          per100KCases: Math.round((entries.cases / entries.population) * this.per100кРopulation),
          per100KDeath: Math.round((entries.deaths / entries.population) * this.per100кРopulation),
          per100KRecovery: Math.round((entries.recovered / entries.population) * this.per100кРopulation),
          per100KCasesInLastDay: Math.round((entries.todayCases / entries.population) * this.per100кРopulation),
          per100KDeathInLastDay: Math.round((entries.todayDeaths / entries.population) * this.per100кРopulation),
          per100KRecoveryInLastDay: Math.round((entries.todayRecovered / entries.population) * this.per100кРopulation),
          history: this.dataGlobalDateCovid,
  
        },
      );
    }
  
    getCountries(index) {
      const result = [];
      this.apiDataCountry.forEach((element) => {
        result.push(
          {
            countryID: element.iso3, // не уверен в необходимости countyID, возможно, можно только по названию
            countryName: element.country,
            countryFlag: element.flag,
            countryCoordinates: element.countryСenterСoordinates,
            countryIndex: {
              id: index,
              name: this.dictionary[index],
              value: element[index],
            },
          },
        );
      });
      return result;
    }
  
    getCountry(countryArg, index) {
      let result = {};
      this.apiDataCountry.forEach((element) => {
        if (element.country === countryArg) {
          const historyDateW = {
            totalCases: element.history.cases,
            totalDeaths: element.history.deaths,
            totalRecovery: element.history.recovered,
  
            per100KCases: (() => {
              let dateInArray = Object.keys(element.history.cases)
              let rez ={}
              dateInArray.forEach((elementT) => {
                rez[elementT] = Math.round((element.history.cases[elementT] / element.population) * this.per100кРopulation)
              })
              return rez;
            })(),
  
            per100KDeath: (() => {
              let dateInArray = Object.keys(element.history.deaths)
              let rez ={}
              dateInArray.forEach((elementT) => {
                rez[elementT] = Math.round((element.history.deaths[elementT] / element.population) * this.per100кРopulation)
              })
              return rez;
            })(),//element.history.deaths,
  
            per100KRecovery: (() => {
              let dateInArray = Object.keys(element.history.recovered)
              let rez ={}
              dateInArray.forEach((elementT) => {
                rez[elementT] = Math.round((element.history.recovered[elementT] / element.population) * this.per100кРopulation)
              })
              return rez;
            })(),//element.history.recovered,
          }
  
          result = {
            countryID: element.iso3,
            countryName: element.country,
            countryFlag: element.flag,
            countryIndexes: {
              totalCases: element.totalCases,
              totalDeaths: element.totalDeaths,
              totalRecovery: element.totalRecovery,
              casesInLastDay: element.casesInLastDay,
              deathInLastDay: element.deathInLastDay,
              recoveryInLastDay: element.recoveryInLastDay,
              per100KCases: element.per100KCases,
              per100KDeath: element.per100KDeath,
              per100KRecovery: element.per100KRecovery,
              per100KCasesInLastDay: element.per100KCasesInLastDay,
              per100KDeathInLastDay: element.per100KDeathInLastDay,
              per100KRecoveryInLastDay: element.per100KRecoveryInLastDay,
            },
            countryIndexHistory: {//???????????????????
              name: this.dictionary[index],
              date:historyDateW[index]
  
            },
          };
        }
      });
  
      return result;
    }
  
    getDate() {
      const date = new Date(this.dataGlobalCovidInfo.updated).toLocaleString('en-GB');
      return date; // 'dd/mm/yy hh:mm'
    }
  }
  
  function main(globalCovidInfo, countriesCovidInfo, historyCovidCountryProvinceData, historyCovidGlobalDataN) {
  //
    testCovid = new Covid19Info(globalCovidInfo, countriesCovidInfo, historyCovidCountryProvinceData, historyCovidGlobalDataN);
  
    console.log(testCovid.getDate());
    console.log(testCovid.getCountries('totalRecovery'));
    console.log(testCovid.getCountry('Belarus', 'per100KRecovery'));
    console.log(testCovid.getCountry('Belarus', 'totalRecovery'));
  }
  