'use strict'

var responseBuilder = require('./helpers/lex-response');
// var locations = require('./slots/slot-locations');
var schedule = require('./slots/slot-schedule');
// var flights = require('./slots/slot-flights');

module.exports = {
    processIntent: function (intentRequest, callback) {
        processIntent(intentRequest, callback);
    }
}

function processIntent(intentRequest, callback) {
    const source = intentRequest.invocationSource;
    const outputSessionAttributes = intentRequest.sessionAttributes || {};

    if (source === 'DialogCodeHook') {
        if (schedule.process(intentRequest, callback, outputSessionAttributes)) { return true };

        //if everything is in order, just delegate to LEX configuration.
        outputSessionAttributes.completedSlots='true';
        callback(responseBuilder.delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return false;
    }

    callback(responseBuilder.close(outputSessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Okay, I booked your trip from : ${slots.To}`
    }));
    return false;
}

