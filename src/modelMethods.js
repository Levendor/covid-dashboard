getCountries(index) {
  // тут код, который выдирает из базы данных страну и её данные по показателю (index)
  const result = [ // массив с объектами стран
    {
      countryID, // не уверен в необходимости countyID, возможно, можно только по названию
      countryName,
      countryFlag,
      countryCoordinates: [lat, long],
      countryIndex,
    },
    {
      countryName,
      // ...
      countryIndex,
    },
    //...
    //...
    //...
    {
      countryName,
      // ...
      countryIndex,
    },
  ];
  return result;
}

getCountry(country, index) {
  // тут код, который выдирает из базы данных страну с указанным показателем
  const result = {
    countryID,
    countryName,
    countryFlag,
    countryIndexes: {
      cases,
      deaths,
      recovered,
      dailyCases,
      dailyDeaths,
      // и т.д.
      // 12 показателей
    },
    countryIndexHistory: [
      {
        date: 'dd/mm/yy';
        index,
      },
      // показатель на каждый день
    ]
  };
  return result;
}

getDate() {
  // тут код, выдирающий последнюю дату, за которую есть данные по всем странам
  return date; // 'dd/mm/yy hh:mm'
}