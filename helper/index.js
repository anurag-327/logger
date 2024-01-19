export function segregateData(logs, credentials) {
  const dataByCountry = groupByCountry(logs);
  const dataByCity = groupByCity(logs);
  const dataByRegion = groupByRegion(logs);
  const dataByIP = groupByIP(logs);
  const totalVisitors = credentials.count;
  const uniqueVisitors = Object.keys(dataByIP).length;
  const logsCountByDate = countByDays(logs, 7);
  const logsCountByCountry = countByCountry(logs);
  const logsCountByCity = countByCity(logs);
  const stats = {
    dataByCountry,
    dataByCity,
    dataByIP,
    dataByRegion,
    totalVisitors,
    uniqueVisitors,
    logsCountByDate,
    logsCountByCountry,
    logsCountByCity,
  };
  return stats;
}
function countByCountry(items) {
  const logsCountByCountry = {};
  items.forEach((log) => {
    const country = log.country;
    logsCountByCountry[country] = (logsCountByCountry[country] || 0) + 1;
  });
  const logsCountArray = Object.entries(logsCountByCountry);
  logsCountArray.sort((a, b) => b[1] - a[1]);
  const top7Countries = logsCountArray.slice(0, 7);
  return Object.fromEntries(top7Countries);
}
function countByCity(items) {
  const logsCountByCity = {};
  items.forEach((log) => {
    const city = log.city;
    logsCountByCity[city] = (logsCountByCity[city] || 0) + 1;
  });
  const logsCountArray = Object.entries(logsCountByCity);
  logsCountArray.sort((a, b) => b[1] - a[1]);
  const top7Cities = logsCountArray.slice(0, 7);
  return Object.fromEntries(top7Cities);
}

export function countByDays(items, days) {
  const NDaysAgo = new Date();
  NDaysAgo.setDate(NDaysAgo.getDate() - days);
  const logsLastnDays = items.filter((log) => {
    const logDate = new Date(log.created_at);
    return logDate >= NDaysAgo;
  });
  const logsCountByDate = {};
  logsLastnDays.forEach((log) => {
    const logDate = new Date(log.created_at).toLocaleDateString();
    logsCountByDate[logDate] = (logsCountByDate[logDate] || 0) + 1;
  });
  return logsCountByDate;
}
function groupByRegion(items) {
  return items.reduce((groupedData, currentItem) => {
    const { region } = currentItem;
    if (!groupedData[region]) {
      groupedData[region] = [];
    }
    groupedData[region].push(currentItem);
    return groupedData;
  }, {});
}
function groupByIP(items) {
  return items.reduce((groupedData, currentItem) => {
    const { ip } = currentItem;
    if (!groupedData[ip]) {
      groupedData[ip] = [];
    }
    groupedData[ip].push(currentItem);
    return groupedData;
  }, {});
}
function groupByCountry(items) {
  return items.reduce((groupedData, currentItem) => {
    const { country } = currentItem;
    if (!groupedData[country]) {
      groupedData[country] = [];
    }
    groupedData[country].push(currentItem);
    return groupedData;
  }, {});
}
function groupByCity(items) {
  return items.reduce((groupedData, currentItem) => {
    const { city } = currentItem;
    if (!groupedData[city]) {
      groupedData[city] = [];
    }
    groupedData[city].push(currentItem);
    return groupedData;
  }, {});
}
