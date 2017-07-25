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
        try {
            console.log('[PRE LOCATIONS]');
            if (locations.process(intentRequest, callback, outputSessionAttributes)) { return true };

            console.log('[PRE SCHEDULE]');
            if (schedule.process(intentRequest, callback, outputSessionAttributes)) { return true };

            console.log('[PRE FLIGHT]');
            if (flights.process(intentRequest, callback, outputSessionAttributes)) { return true };

            console.log('...I think everything I need is in order.  I will let LEX do the rest');
        } catch (err) {
            console.log(`...oops... something went wrong ${JSON.stringify(err)}`);
            callback(responseBuilder.close(outputSessionAttributes, 'Failed', {
                contentType: 'PlainText',
                content: `Something wrong happened, I cant continue with your request. ${err.message}`
            }));
            return true;
        }
        callback(responseBuilder.delegate({}, intentRequest.currentIntent.slots));
        return true;
    } else {
        var slots = intentRequest.currentIntent.slots;
        callback(responseBuilder.close({},            
            'Failed',
            {
                contentType: 'PlainText',
                content: `Okay, I booked your trip from : ${slots.From} to  ${slots.To} for userID: ${intentRequest.userId}`
            },
            null)
        );
    }
    return false;
}

