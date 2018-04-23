const request = require('request');

var getWeather = (lat, lng, address, callback) => {
  request({
    url: `https://api.forecast.io/forecast/ff682bf370c2ac7a9f65f1468f59d449/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    console.log(response.statusCode);
    console.log(error);
    if (response.statusCode === 403) {
      callback(JSON.parse('{"error": "Unable to connect to Forecast.io server."}'), null);
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.', null);
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        locAddress: address
      });
    }
  });
};

module.exports.getWeather = getWeather;
