var responseBuilder = require('./helpers/lex-response');

function buildAirportOptions() {
    return [
        { text: 'American Airlines', value: 'AA' },
        { text: 'Delta Airlines', value: 'DA' },
        { text: 'Virgin America', value: 'VX' },
    ];
}

function buildPlacesOptions() {
    return [
        { text: 'Los Angeles', value: 'LA' },
        { text: 'Las Vegas', value: 'LX' },
        { text: 'DC', value: 'DC' },
    ];
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
        var responseCard = responseBuilder.buildResponseCard('Please select from places below:',
            'Matches found: ',
            buildPlacesOptions());
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
        return true;
    }
}

var processAirport = function (intentRequest, callback, outputSessionAttributes) {
    if (!intentRequest.currentIntent.slots.AirportFrom) {
        var responseCard = responseBuilder.buildResponseCard('Please specify the airport you are coming from.',
            'Airports near your origin',
            buildAirportOptions());
        var response = responseBuilder.elicitSlot(
            outputSessionAttributes,
            intentRequest.currentIntent.name,
            intentRequest.currentIntent.slots,
            'AirportFrom',
            {
                contentType: 'PlainText',
                content: 'What Airport?'
            },
            responseCard);
        callback(response);
        return true;
    }
}

function processIntent(intentRequest, callback) {
    const source = intentRequest.invocationSource;
    var slots = intentRequest.currentIntent.slots;
    const outputSessionAttributes = intentRequest.sessionAttributes || {};

    if (source === 'DialogCodeHook') {

        if (processWhereFrom(intentRequest, callback, outputSessionAttributes)) { return };
        if (processPlaceFrom(intentRequest, callback, outputSessionAttributes)) { return };
        if (processAirport(intentRequest, callback, outputSessionAttributes)) { return };
        callback(responseBuilder.delegate(outputSessionAttributes, slots));
        return;
    }

    callback(responseBuilder.close(outputSessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Okay, I booked your trip from : ${slots.PlaceFrom}`
    }));
}

module.exports = {

    processIntent: function (intentRequest, callback) {
        processIntent(intentRequest, callback);
    }

}