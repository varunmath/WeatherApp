const request = require('request');


var getPopulation = (country,callback) => {
request({
url : `http://api.population.io:80/1.0/population/${country}/today-and-tomorrow/`,
json : true
},(error, response, body)=>{
    if (response.statusCode === 400) {
        callback(JSON.parse('{"error": "Unable to get population of the country."}'), null);
      } else if (response.statusCode === 200){
          callback(undefined,{
              populationToday:body.total_population[0].population,
              populationTomorrow:body.total_population[1].population
          })
      }
}
)

}

module.exports.getPopulation = getPopulation;