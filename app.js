const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const geocode = require('./geocode');
const weather = require('./weather');
const population = require('./population');
const _ = require('lodash');
const nApi = require('newsapi');
const newsApi = new nApi('62089da2a08a4c7a8dcd09a789421ec1');
const countryInfo = require('./countryInfo');
const countryImages = require('./countryImages');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home'
    })
});

app.get('/about.html', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    })
});

app.post('/weather.html', (req, res) => {
    console.log(req.body);
    var addJson = req.body;
    setTimeout(function() {
        geocode.geocodeAddress(addJson.address, (errorMessage, results) => {
            if (errorMessage) {
                res.render('error.hbs', errorMessage);
            } else {
                console.log(results.address);
                weather.getWeather(results.latitude, results.longitude,results.address, (errorMessage, weatherResults) => {
                    if (errorMessage) {
                        res.render('error.hbs', errorMessage);
                    } else {
                        population.getPopulation(results.country, (errorMsg, populationResults) => {
                            console.log(`Population for today in`,results.country, `is`,populationResults.populationToday);
                            console.log(`Population for tomorrow in`,results.country, `is`,populationResults.populationTomorrow);
                            console.log(`population growth per day is`,_.subtract(populationResults.populationTomorrow,populationResults.populationToday));
                        
                        newsApi.v2.topHeadlines({
                            country: results.shortCountry
                          }).then(responseNews => {
                           // console.log(response);
                          
                          countryInfo.getCountryInfo(results.country,(errorMsg,countryInfoResults) =>{
                              console.log("country info",countryInfoResults);
                         countryImages.getCountryImages(results.country,(errorMsg,countryImages)=>{
                          var totalResults = {
                              weatherRes: weatherResults,
                              popResults: populationResults,
                              countryNews: responseNews,
                              countryInfRes: countryInfoResults[0],
                              images: countryImages.hits
                          }
                        //var objResults = ({"Temprature":weatherResults.temperature});
                        //var appTemp = ({"apparentTemperature":weatherResults.apparentTemperature});
                        //objResults.push(appTemp);
                        res.render('weather.hbs', totalResults);
                        console.log(`It's currently. It feels like.`);
                        });
                    });
                    });
                    });
                    }
                    
                });
            }
        });
    }, 1000);
});

app.listen(3000, () => {
    console.log('Server started at port # 3000');
})