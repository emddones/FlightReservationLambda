'use strict'
/**
 * 
 * Require:
 * - Departure: e.g.'2017-07-20' 
 * - Return: e.g. '2017-07-23 ' 
 * 
 * Validation Rule: 
 * Validate return date is earlier than departure. If not valid date, ask again
 * 
 */
var responseBuilder = require('../helpers/lex-response');
var dateHelper = require('../helpers/date-helpers');

module.exports = {
    "process": process
}

function process(intentRequest, callback, outputSessionAttributes) {
    var slots = intentRequest.currentIntent.slots;

    if (ASK_EITHER_DATE_IS_EMPTY(intentRequest, callback, outputSessionAttributes)) { return true }
    if (CLARIFY_IF_THERE_ARE_INVALID_DATES(intentRequest, callback, outputSessionAttributes)) { return true }
    return false;
}


//just delegate to LEX
function ASK_EITHER_DATE_IS_EMPTY(intentRequest, callback, outputSessionAttributes) {
    var bothSupplied = intentRequest.currentIntent.slots.Departure && intentRequest.currentIntent.slots.Return;
    if (!bothSupplied) {
        callback(
            responseBuilder.delegate(outputSessionAttributes, intentRequest.currentIntent.slots)
        );
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
        elicit('Return', `Your return date should be later than your first departure, ${dateOfDeparture.toLocaleDateString()}. Could you please clarify?`, intentRequest, callback, outputSessionAttributes)
        return true;
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