'use strict'
/**
 * 
 * DepartureFlightId - if not valid, ask to verify
 * ReturnFlightId - if not valid, ask to verify
 * 
 */
var flightsApi = require('../datasources/skypicker');
var responseBuilder = require('./helpers/lex-response');

module.exports = {    
    "process": process    
}

//default proecssor
var process = function(intentRequest, callback, outputSessionAttributes){
    if(intentRequest.currentIntent.slots.DepartureFlightId && ReturnFlightId){

    }
}

var isValid = function(DepartureFlightId, ReturnFlightId) {
    return true;
}

var processFlight = function (intentRequest, callback, outputSessionAttributes) {
    // if (!intentRequest.currentIntent.slots.Flight) {
        var PlaceFrom = intentRequest.currentIntent.slots.PlaceFrom;
        populateFlightOptions(PlaceFrom, function (options) {
            var responseCard = responseBuilder.buildResponseCard('Please select flight schedule below:',
                'Matches found: ',
                options);

            var response = responseBuilder.elicitSlot(
                outputSessionAttributes,
                intentRequest.currentIntent.name,
                intentRequest.currentIntent.slots,
                'Flight',
                {
                    contentType: 'PlainText',
                    content: 'Please select a flight from the selection'
                },
                responseCard);
            callback(response);
        });
        return true;
    // }
}


var populateFlightOptions = function (PlaceFrom, PlaceTo, callback) {

    var params = {
        "flyFrom": PlaceFrom,
        "to": 'Los Angeles',
        "dateFrom": '08/08/2017',
        "dateTo": '08/08/2017',
        "directFlights": 1,
        "partner": 'picky',
        "partner_market": 'us',
        "limit": '2'
    };

    flightsApi.retrieveFlights(params, function (error, data) {
        var options = [];
        var flights;
        if (data.data) {
            flights = data.data;
            for (var x = 0; x < flights.length && x < 10; x++) {
                var flight = flights[x];
                var option = { "text": `${flight.route[0].cityFrom} - ${flight.route[0].cityTo}`, "value": flight.route[0].cityFrom };
                options.push(option);
            }
        }

        callback(options);
    })
}