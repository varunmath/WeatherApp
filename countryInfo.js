const request = require('request');

var getCountryInfo = (country, callback) => {
    request({
      url: `https://restcountries.eu/rest/v2/name/${country}?fullText=true`,
      json: true
    }, (error, response, body)=>{
callback(undefined,body);
    });
};

module.exports.getCountryInfo = getCountryInfo;