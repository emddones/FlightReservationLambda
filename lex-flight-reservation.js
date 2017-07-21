/**
 * Main file for lambda function
 * 
 * 
 * 
 */
var logic = require('./flight-reservation/lex-business-logic');
var LIVE_DATA = true;
//object called by AWS lambda
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

function dispatch(intentRequest, originalCallback) {
    // console.log(JSON.stringify(intentRequest, null, 2));
    console.log(`dispatch userId=${intentRequest.userId}, intent=${intentRequest.currentIntent.name}`);

    const name = intentRequest.currentIntent.name;

    // Dispatch to your skill's intent handlers
    if (name === 'FlightReservation') {
        intentRequest.sessionAttributes.LIVE_DATA = LIVE_DATA || false;
        return logic.processIntent(intentRequest, originalCallback);
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
        dispatch(event, (response) => loggingCallback(response, callback));

    }
}



