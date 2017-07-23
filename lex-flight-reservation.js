/**
 * Main file for lambda function
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

//statement to include this file to another node module for testing.
module.exports = {
    handler: function (event, context, callback) {
        dispatch(event, (response) => loggingCallback(response, callback));
    }
}

function loggingCallback(response, originalCallback) {
    originalCallback(null, response);
}

function dispatch(intentRequest, originalCallback) {

    intentRequest.sessionAttributes.LIVE_DATA = LIVE_DATA;
    return logic.processIntent(intentRequest, originalCallback);

}