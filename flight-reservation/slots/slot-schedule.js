'use strict'
/**
 * 
 * Require:
 * - Departure: e.g.'2017-07-20' 
 * - Return: e.g. '2017-07-23 ' 
 * 
 * Validation Rule: 
 * Validate return date is earlier than departure. If not valid date, ask again
 * @TODO - check if round trip before asking return schedule.
 * 
 */
var responseBuilder = require('../helpers/lex-response');
var dateHelper = require('../helpers/date-helpers');

module.exports = {
    "process": process
}

function process(intentRequest, callback, outputSessionAttributes) {
    console.log('processsing slot-schedule logic');
    var slots = intentRequest.currentIntent.slots;
    if (ASK_IF_RETURN_TRIP_NEEDED(intentRequest, callback, outputSessionAttributes)) { return true }
    if (CLARIFY_IF_THERE_ARE_INVALID_DATES(intentRequest, callback, outputSessionAttributes)) { return true }
    return false;
}


//just delegate to LEX
function ASK_IF_RETURN_TRIP_NEEDED(intentRequest, callback, outputSessionAttributes) {
    // var bothSupplied = intentRequest.currentIntent.slots.Departure && intentRequest.currentIntent.slots.Return;
    if ((intentRequest.currentIntent.slots.FlightType == 'round trip'
        || intentRequest.currentIntent.slots.FlightType == 'yes') && !intentRequest.currentIntent.slots.Return) {
        elicit('Return', `When will you return from the trip?`, intentRequest, callback, outputSessionAttributes)
        return true;
    }
}

function CLARIFY_IF_THERE_ARE_INVALID_DATES(intentRequest, callback, outputSessionAttributes) {

    var Departure = intentRequest.currentIntent.slots.Departure;
    var Return = intentRequest.currentIntent.slots.Return;

    if (!dateHelper.isValidDate(Departure)) {
        elicit('Departure', `Sorry but your departure date is invalid, can you repeat it please?`, intentRequest, callback, outputSessionAttributes)
        return true;
    }

    if (intentRequest.currentIntent.slots.FlightType == 'round trip'
        || intentRequest.currentIntent.slots.FlightType == 'yes') {

        if (!dateHelper.isValidDate(Return)) {
            elicit('Return', `Sorry but your return date is invalid, could you repeat it please?`, intentRequest, callback, outputSessionAttributes)
            return true;
        }

        var dateOfReturn = dateHelper.parseLocalDate(Return);
        var dateOfDeparture = dateHelper.parseLocalDate(Departure);

        if (dateOfDeparture < dateHelper.today) {
            elicit('Departure', `Your departure date should be later than today. Could you please clarify?`, intentRequest, callback, outputSessionAttributes)
            return true;
        }

        if (dateOfReturn < dateHelper.today) {
            elicit('Return', `Your return date should be later than today. Could you please clarify?`, intentRequest, callback, outputSessionAttributes)
            return true;
        }

        if (dateOfReturn < dateOfDeparture) {
            elicit('Return', `Your return date should be later than your first departure, ${dateHelper.toISODate(dateOfDeparture)}. Could you please clarify?`, intentRequest, callback, outputSessionAttributes)
            return true;
        }
    }

    return false;
}

function elicit(slotToElicit, message, intentRequest, callback, outputSessionAttributes) {
    var response = responseBuilder.elicitSlot(
        outputSessionAttributes,
        intentRequest.currentIntent.name,
        intentRequest.currentIntent.slots,
        slotToElicit,
        {
            contentType: 'PlainText',
            content: message
        },
        []);
    callback(response);
}