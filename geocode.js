const request = require('request');
const where = require("lodash.where");
const _ = require('lodash');
var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBqWjmoq42AtXyHJcyU1EQ-8bJVwplIiP4`,
    json: true
  }, (error, response, body) => {
    console.log(response.statusCode);
    console.log(body.status);
    if(body.status === 'REQUEST_DENIED') {
      console.log('I m here');
      callback(JSON.parse('{"error": "Unable to connect to Google servers."}'), null);
    } else if (body.status === 'ZERO_RESULTS') {
      callback(JSON.parse('{"error": "Unable to find that address."}'), null);
    } else if (body.status === 'OK') {
    var country= _.find(body.results[0].address_components, { 'types': ["country","political"]})
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
        country: country.long_name,
        shortCountry:country.short_name
      });
      console.log('this is the value',country.long_name);
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
