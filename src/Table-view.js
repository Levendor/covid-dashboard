export default class Table {
  constructor(table) {
    this.table = table;
  }

  initialize() {
    const tableHead = document.createElement('div');
    const tableIndex = document.createElement('div');
    const tableBody = document.createElement('div');
    const tableFlagRegionBox = document.createElement('div');

    tableHead.className = 'table__head';
    tableIndex.className = 'table__index';
    tableBody.className = 'table__body';
    tableFlagRegionBox.className = 'table__flag-region-box';

    const tableFlag = document.createElement('div');
    const tableRegion = document.createElement('span');
    const tableCasesBox = document.createElement('span');
    const tableDeathsBox = document.createElement('span');
    const tableRecoveredBox = document.createElement('span');

    tableFlag.className = 'table__flag';
    tableRegion.className = 'table__region';
    tableCasesBox.className = 'table__cases';
    tableDeathsBox.className = 'table__deaths';
    tableRecoveredBox.className = 'table__recovered';

    tableCasesBox.textContent = 'Cases: ';
    tableDeathsBox.textContent = 'Deaths: ';
    tableRecoveredBox.textContent = 'Recovered: ';

    const cases = document.createElement('span');
    const deaths = document.createElement('span');
    const recovered = document.createElement('span');

    tableHead.append(tableIndex);

    tableFlagRegionBox.append(
      tableFlag,
      tableRegion,
    );

    tableCasesBox.append(cases);
    tableDeathsBox.append(deaths);
    tableRecoveredBox.append(recovered);

    tableBody.append(
      tableFlagRegionBox,
      tableCasesBox,
      tableDeathsBox,
      tableRecoveredBox,
    );

    this.table.append(
      tableHead,
      tableBody,
    );

    this.tableIndex = tableIndex;
    this.tableFlag = tableFlag;
    this.tableRegion = tableRegion;
    this.cases = cases;
    this.deaths = deaths;
    this.recovered = recovered;
  }

  renderTable(country, index) {
    console.log();
    this.tableFlag.style.backgroundImage = `url(${country.flagPath})`;
    console.log(country.flagPath);
    console.log(this.tableFlag.style.backgroundImage);
    this.tableRegion.textContent = country.countryName;
    this.cases.className = 'cases-digits';
    this.deaths.className = 'deaths-digits';
    this.recovered.className = 'recovered-digits';

    if (index.startsWith('total')) {
      if (index.endsWith('Hundreds')) {
        this.tableIndex.textContent = 'Total indexes per 100 thousand';
        this.cases.textContent = country.index.totalCasesPerHundreds.value;
        this.deaths.textContent = country.index.totalDeathsPerHundreds.value;
        this.recovered.textContent = country.index.totalRecoveredPerHundreds.value;
      } else {
        this.tableIndex.textContent = 'Total indexes';
        this.cases.textContent = country.index.totalCases.value;
        this.deaths.textContent = country.index.totalDeaths.value;
        this.recovered.textContent = country.index.totalRecovered.value;
      }
    } else if (index.startsWith('last')) {
      if (index.endsWith('Hundreds')) {
        this.tableIndex.textContent = 'Indexes per 100 thousand in the last day';
        this.cases.textContent = country.index.lastCasesPerHundreds.value;
        this.deaths.textContent = country.index.lastDeathsPerHundreds.value;
        this.recovered.textContent = country.index.lastRecoveredPerHundreds.value;
      } else {
        this.tableIndex.textContent = 'Indexes per 100 thousand';
        this.cases.textContent = country.index.lastCases.value;
        this.deaths.textContent = country.index.lastDeaths.value;
        this.recovered.textContent = country.index.lastRecovered.value;
      }
    } else {
      this.cases.className = 'cases-digits';
      this.deaths.className = 'cases-digits';
      this.recovered.className = 'cases-digits';

      this.cases.textContent = 'not available';
      this.deaths.textContent = 'not available';
      this.recovered.textContent = 'not available';
    }
  }
}
