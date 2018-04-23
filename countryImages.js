const request = require('request');

var getCountryImages = (country,callback)=>{
    request({
        url: `https://pixabay.com/api/?key=8772560-87ff43cbcb75bab75068efe35&q=${country}&image_type=photo&editers_choice=true&order=latest`,
        json: true
    },(error,response,body)=>{
        callback(undefined,body);
    });
};

module.exports.getCountryImages = getCountryImages;