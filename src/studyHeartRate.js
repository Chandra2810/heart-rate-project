const calculateDailyStats = (data) => {
  const sortedData = data.sort((a, b) => a.beatsPerMinute - b.beatsPerMinute);

  const min = sortedData[0].beatsPerMinute;
  const max = sortedData[sortedData.length - 1].beatsPerMinute;

  const mid = Math.floor(sortedData.length / 2);
  const median = sortedData.length % 2 === 0
    ? (sortedData[mid - 1].beatsPerMinute + sortedData[mid].beatsPerMinute) / 2
    : sortedData[mid].beatsPerMinute;

  const latestDataTimestamp = sortedData[sortedData.length - 1].endTimestamp;

  const date = latestDataTimestamp.split('T')[0];
 
  return [{
    date,
    min,
    max,
    median,
    latestDataTimestamp
  }];
};

const processHeartRateData = (heartRateData) => {
  const dailyStats = {};

  heartRateData.forEach((measurement) => {
    const date = measurement.startTimestamp.split('T')[0];
    dailyStats[date] = dailyStats[date] || [];
    dailyStats[date].push(measurement);
  });

  return Object.values(dailyStats).map((groupedData) => calculateDailyStats(groupedData)).flat();
};

module.exports = { calculateDailyStats, processHeartRateData };


