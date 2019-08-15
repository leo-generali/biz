const StravaInterface = require('./strava/strava-interface');

module.exports = async function() {
  const data = await StravaInterface.eleventyData();
  return data;
};
