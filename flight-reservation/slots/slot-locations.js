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

var process = function(intentRequest, callback, outputSessionAttributes){
    return false;
}

function populatePlacesOptions(WhereFrom, callback) {
    flightsApi.retrievePlaces({ term: WhereFrom, v: 3 }, function (error, data) {
        // console.log(data);
        var options = [];

        console.log(`records found: ${data.length}`)

        for (var x = 0; x < data.length && x < 10; x++) {
            var place = data[x];
            var option = { "text": `${place.value} - ${place.id}`, "value": place.value };
            // console.log(place);
            options.push(option);
        }
        // console.log(options)

        callback(options);
    });

    // callback([
    //         { text: 'Los Angeles', value: 'LA' },
    //         { text: 'Las Vegas', value: 'LX' },
    //         { text: 'DC', value: 'DC' },
    //     ]);
}

var processWhereFrom = function (intentRequest, callback, outputSessionAttributes) {
    if (!intentRequest.currentIntent.slots.WhereFrom) {
        // var responseCard = responseBuilder.buildResponseCard('Where are you going to?',
        //     'Airports near your origin',
        //     buildAirportOptions());
        var response = responseBuilder.elicitSlot(
            outputSessionAttributes,
            intentRequest.currentIntent.name,
            intentRequest.currentIntent.slots,
            'WhereFrom',
            {
                contentType: 'PlainText',
                content: 'Where are you coming from?'
            },
            null);
        callback(response);
        return true;
    }
}

var processPlaceFrom = function (intentRequest, callback, outputSessionAttributes) {
    if (!intentRequest.currentIntent.slots.PlaceFrom) {
        var WhereFrom = intentRequest.currentIntent.slots.WhereFrom;
        populatePlacesOptions(WhereFrom, function (options) {
            var responseCard = responseBuilder.buildResponseCard('Please select from places below:',
                'Matches found: ',
                options);

            var response = responseBuilder.elicitSlot(
                outputSessionAttributes,
                intentRequest.currentIntent.name,
                intentRequest.currentIntent.slots,
                'PlaceFrom',
                {
                    contentType: 'PlainText',
                    content: 'Please confirm the place where you are coming from'
                },
                responseCard);
            callback(response);
        });
        return true;
    }
}