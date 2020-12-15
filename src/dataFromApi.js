/*
getDataFromCovodApiCountry(this.urlCountry) 
method gets information from the API (https://disease.sh/v3/covid-19/countries) by country
and puts it into the array "this.apiDataCountry = [];" (length 220)
[{
    country: string,
    iso3: string,
    flag: string,
    countryСenterСoordinates: `string,string`, //'23,53'
    totalCases: number,
    totalDeaths: number,
    totalRecovery: number,
    casesInLastDay: number,
    deathInLastDay: number,
    recoveryInLastDay: number,
    per100KCases: number,
    per100KDeath: number,
    per100KRecovery: number,
    per100KCasesInLastDay: number,
    per100KDeathInLastDay: number,
    per100KRecoveryInLastDay: number,
    },...]

getDataFromCovodApiTotal(this.urlTotal) 
method gets information from the API (https://disease.sh/v3/covid-19/all) by total
and puts it into the array "this.apiDataTotal = [];"  (length 1)
[{
    country: 'total',
    totalCases: number,
    totalDeaths: number,
    totalRecovery: number,
    casesInLastDay: number,
    deathInLastDay: number,
    recoveryInLastDay: number,
    per100KCases: number,
    per100KDeath: number,
    per100KRecovery: number,
    per100KCasesInLastDay: number,
    per100KDeathInLastDay: number,
    per100KRecoveryInLastDay: number,
    }]


    get getCountriesData() getter for countries

    get getTotalData() getter for total

            
            */
class Covid19 {
    constructor() {
        this.urlCountry = 'https://disease.sh/v3/covid-19/countries';
        this.urlTotal = 'https://disease.sh/v3/covid-19/all';
        this.getDataFromCovodApiCountry(this.urlCountry);
        this.getDataFromCovodApiTotal(this.urlTotal);
        this.apiDataCountry = [];
        this.apiDataTotal = [];
        this.per100кРopulation = 100000;
    }

    getDataFromCovodApiCountry(url) {
        fetch(url)
            .then((response) => response.json())
            .then((entries) => {
                entries.forEach((element) => {
                    this.apiDataCountry.push(
                        {
                            country: element.country,
                            iso3: element.countryInfo.iso3,
                            flag: element.countryInfo.flag,
                            countryСenterСoordinates: `${element.countryInfo.lat},${element.countryInfo.long}`,
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

                        },
                    );
                });
            });
    }

    getDataFromCovodApiTotal(url) {
        fetch(url)
            .then((response) => response.json())
            .then((entries) => {
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

                    },
                );

            });
    }

    get getCountriesData() {
        return this.apiDataCountry;
    }

    get getTotalData() {
        return this.apiDataTotal;
    }
}

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// (async () => {
//   await (() => { testCovid = new Covid19(); })();//
//   await sleepNow(1000);
//   console.log(testCovid.getCountriesData[17]);
//   console.log(testCovid.getTotalData);
// })();
