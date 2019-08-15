const axios = require('axios');
const cheerio = require('cheerio');
const flatcache = require('flat-cache');
const path = require('path');

const ATHLETE_ID = 11876587;
const KM_PER_MILE = 1.60934;

const getCacheKey = () => {
  const date = new Date();
  return `${date.getUTCFullYear()}-${date.getUTCMonth() +
    1}-${date.getUTCDate()}`;
};

const getKm = (miles) => miles * KM_PER_MILE;

class StravaInterface {
  constructor() {
    this._key = getCacheKey();
    this._cache = flatcache.load(
      'personal-strava-data',
      path.resolve('./_datacache')
    );
  }

  get key() {
    return this._key;
  }

  get cache() {
    return this._cache;
  }

  async eleventyData() {
    const data = this._cache.getKey(this._key)
      ? this._cache.getKey(this._key)
      : this._getDataOnline();
    return data;
  }

  async _getDataOnline() {
    const data = await this._getData();
    const recentActivities = this._getRecentActivities(data);
    const recentRuns = this._getRuns(recentActivities);
    const eleventyData = this._createEleventyDataWithMostRecentRuns(recentRuns);
    this._cache.setKey(this._key, eleventyData);
    this._cache.save();
    return eleventyData;
  }

  async _getData() {
    const result = await axios.get(
      `https://www.strava.com/athletes/${ATHLETE_ID}`
    );
    return result.data;
  }

  _getRecentActivities(data) {
    const $ = cheerio.load(data);
    return $(`div`)
      .filter(function() {
        return $(this).data('reactClass') === 'AthleteProfileApp';
      })
      .data('react-props').recentActivities;
  }

  _getRuns(recentActivities) {
    return recentActivities.filter((activity) => activity.type === 'run');
  }

  _createEleventyDataWithMostRecentRuns(recentRuns) {
    const { distance, id } = recentRuns[0];
    const distanceMiles = parseFloat(
      distance.substring(0, distance.length - 3)
    );
    const distanceKm = getKm(distanceMiles);
    const activityUrl = `https://www.strava.com/activities/${id}`;
    const profileUrl = `https://www.strava.com/athletes/${ATHLETE_ID}`;
    return { distanceMiles, distanceKm, activityUrl, profileUrl };
  }
}

module.exports = new StravaInterface();
