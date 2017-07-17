/**
 * Main file for lambda function
 */

var logic = require('./helpers/lex-logic');
var responseBuilder = require('./helpers/lex-response');

//object called by lex
exports.handler = (event, context, callback) => {
    try {
        module.exports.handler(event, context, callback);
    } catch (err) {
        callback(err);
    }
};

function loggingCallback(response, originalCallback) {
    // console.log(JSON.stringify(response, null, 2));
    originalCallback(null, response);
}

function buildAirportOptions() {
    return [
        { text: 'American Airlines', value: 'AA' },
        { text: 'Delta Airlines', value: 'DA' },
        { text: 'Virgin America', value: 'VX' },
    ];
}

function process1(intentRequest, callback, outputSessionAttributes) {
    if (!intentRequest.currentIntent.slots.AirportFrom) {
        callback(responseBuilder.elicitSlot(outputSessionAttributes, intentRequest.currentIntent.name,
            intentRequest.currentIntent.slots, 'AirportFrom',
            { contentType: 'PlainText', content: 'What Airport are you coming from?' },
            responseBuilder.buildResponseCard('Please specify the airport you are coming from.', 'Airports near your origin',
                buildAirportOptions())));
        return true;
    }
}

function processIntent(intentRequest, callback) {
    const source = intentRequest.invocationSource;
    const outputSessionAttributes = intentRequest.sessionAttributes || {};

    if (source === 'DialogCodeHook') {
        if (process1(intentRequest, callback, outputSessionAttributes)) {return};
        callback('proccessing intent : ' + intentRequest.currentIntent.name);
    }

    callback(responseBuilder.close(outputSessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: 'Okay, I have booked your appointment.  We will see you at ${buildTimeOutputString(time)} on ${date}'
    }));
}

function dispatch(intentRequest, originalCallback) {
    // console.log(JSON.stringify(intentRequest, null, 2));
    console.log(`dispatch userId=${intentRequest.userId}, intent=${intentRequest.currentIntent.name}`);

    const name = intentRequest.currentIntent.name;

    // Dispatch to your skill's intent handlers
    if (name === 'FlightReservation') {
        return processIntent(intentRequest, originalCallback);
    }

    throw new Error(`Intent with name ${name} not supported`);
}


//statement to include this file to another node module for testing.
module.exports = {
    handler: function (event, context, callback) {

        var validateBotName = function (botName) {
            if (event.bot.name !== botName) {
                callback('Invalid Bot Name');
            }
        }

        console.log('event.bot.name=' + event.bot.name);
        validateBotName("DCS_FCSP");


        // loggingCallback - intercepts callback to log first in console.
        // dispatch(event, (response) => loggingCallback(response, callback), expectedIntent, processIntent);
        dispatch(event, (response) => loggingCallback(response, callback));

    }
}



