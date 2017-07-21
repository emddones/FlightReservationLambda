'use strict'

var responseBuilder = require('./helpers/lex-response');
var locations = require('./slots/slot-locations');
var schedule = require('./slots/slot-schedule');
var flights = require('./slots/slot-flights');

module.exports = {
    processIntent: function (intentRequest, callback) {
        processIntent(intentRequest, callback);
    }
}

function processIntent(intentRequest, callback) {
    const source = intentRequest.invocationSource;
    const outputSessionAttributes = intentRequest.sessionAttributes || {};

    if (source === 'DialogCodeHook') {

        console.log('PRE LOCATIONS');
        if (locations.process(intentRequest, callback, outputSessionAttributes)) { return true };

        console.log('PRE SCHEDULE');
        if (schedule.process(intentRequest, callback, outputSessionAttributes)) { return true };

        console.log('PRE FLIGHT');
        if (flights.process(intentRequest, callback, outputSessionAttributes)) { return true };

        console.log('...I think everything I need is in order.  I will let LEX do the rest');
        
        callback(responseBuilder.delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return true;
    } else {

        callback(responseBuilder.close(outputSessionAttributes, 'Fulfilled', {
            contentType: 'PlainText',
            content: `Okay, I booked your trip from : ${slots.To}`
        }));
    }
    return false;
}

