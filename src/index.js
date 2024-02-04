// src/index.js
const fs = require('fs');
const { processHeartRateData } = require('./studyHeartRate');

const readAndProcessData = () => {
  try {
    const rawData = fs.readFileSync('./data/heartrate.json', 'utf8');
    const heartRateData = JSON.parse(rawData);

    const dailyStats = processHeartRateData(heartRateData);

    fs.writeFileSync('./output/output.json', JSON.stringify(dailyStats, null, 2));

    console.log('Output successfully written to ./output/output.json');
  } catch (error) {
    console.error('Error processing data:', error.message);
  }
};

readAndProcessData();
