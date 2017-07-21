'use strict'
/**
 * 
 * Require:
 * - From: Should be a lcoation found in the repository
 * - To: Should be a lcoation found in the repository
 * 
 * Flow: 
 * - if there is a supplied location, check in repository : flightsApi
 * - if results, 
 * - if first result is perfect match, delegate to LEX
 * - if first record not an exact match, verify that record
 * - else verify by fiving options
 * 
 * Note: 
 * Use SessionAttributes if location match is found. THis will save roundtrips to API
 * 
 */
var flightsApi = require('../datasources/skypicker');
var responseBuilder = require('../helpers/lex-response');

module.exports = {
    "process": process
}

function process(intentRequest, callback, outputSessionAttributes) {
    console.log('processsing slot-location logic');
    if (ASK_IF_LOCATION_IS_EMPTY('From', intentRequest, callback, outputSessionAttributes)) { return true }
    if (VERIFY_IF_LOCATION_IS_VAGUE('From', intentRequest, callback, outputSessionAttributes)) { return true }
    if (ASK_IF_LOCATION_IS_EMPTY('To', intentRequest, callback, outputSessionAttributes)) { return true }
    if (VERIFY_IF_LOCATION_IS_VAGUE('To', intentRequest, callback, outputSessionAttributes)) { return true }
    return false;
}

function ASK_IF_LOCATION_IS_EMPTY(slotName, intentRequest, callback, outputSessionAttributes) {
    console.log(`...is "${slotName}" already given?... ${intentRequest.currentIntent.slots[slotName]}`);
    if (!intentRequest.currentIntent.slots[slotName]) {
        console.log(`...Well, "${slotName}" is empty. I will let LEX handle it!`);
        callback(responseBuilder.delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return true;
    }
    return false;
}

function VERIFY_IF_LOCATION_IS_VAGUE(slotName, intentRequest, callback, outputSessionAttributes) {

    console.log(`...do i need to verify "${slotName}"?`);
    if (intentRequest.currentIntent.slots[slotName] && outputSessionAttributes[slotName] != intentRequest.currentIntent.slots[slotName]) {
        console.log(`...I need to verify "${intentRequest.currentIntent.slots[slotName]}", last thing I remembered for "${slotName}" is "${outputSessionAttributes[slotName]}"`);
        if (verifyLocation(slotName, intentRequest.currentIntent.slots[slotName], intentRequest, callback, outputSessionAttributes)) { return true }
        return false;
    }
    return false;
}

function verifyLocation(slotName, givenValue, intentRequest, callback, outputSessionAttributes) {
    var actionPerformed = false;

    populateLocationOptions(givenValue,
        function (error, options) { //callback from buildLocationOptions

            if (error || options.length < 1) {
                elicit(slotName, `I was not able to retrieve any location called ${givenValue}, Can you clarify, or give another name it's called?`, [], intentRequest, callback, outputSessionAttributes);
                actionPerformed = true;
                return true;
            }

            if (options.length > 0) {
                if (options[0].value == givenValue) {
                    console.log(`...I found a perfect match for the location "${givenValue}"?, I will let LEX ask fo the remaining things`);
                    outputSessionAttributes[slotName] = givenValue;
                    callback(responseBuilder.delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
                    return true;
                }

                if (options[0].value != givenValue && options.length == 1) {
                    console.log(`...I found only one match and I need to verify if "${givenValue}" also means "${options[0].value}"?`);
                    elicit(slotName, `Do you mean "${options[0].value}"?`,
                        responseBuilder.buildResponseCard('Please select from places below:', 'Matches found: ', options),
                        intentRequest, callback, outputSessionAttributes);
                    actionPerformed = true;
                    return true;
                }

                console.log(`...I found ${options.length} possible matches for "${givenValue}".`);
                elicit(slotName, `Can you please verify? I know some places like "${options[0].value}", and "${options[1].value}", can you be more specific please?`,
                    responseBuilder.buildResponseCard('Please select from places below:', 'Matches found: ', options),
                    intentRequest, callback, outputSessionAttributes);
                actionPerformed = true;
                return true;
            }
        }, outputSessionAttributes)

    return true;
}

function elicit(slotToElicit, message, responseCards, intentRequest, callback, outputSessionAttributes) {
    var response = responseBuilder.elicitSlot(
        outputSessionAttributes,
        intentRequest.currentIntent.name,
        intentRequest.currentIntent.slots,
        slotToElicit,
        {
            contentType: 'PlainText',
            content: message
        },
        responseCards);

    callback(response);
}

function populateLocationOptions(givenLocation, callback, outputSessionAttributes) {
    var retrieveOperation = 'retrievePlacesMock';
    if (outputSessionAttributes.LIVE_DATA) {
        retrieveOperation = 'retrievePlaces';
    }
    flightsApi.retrievePlaces({ term: givenLocation, v: 3 }, function (error, data) {
        if (error) {
            callback(error, null);
        }

        var options = [];
        var lastOption = {};
        var limit = 7;
        for (var x = 0; x < data.length && options.length < limit; x++) {
            var place = data[x];
            var option = { "text": `${place.value}`, "value": place.value };

            if (!lastOption.value || option.value != lastOption.value) {
                console.log(`...I am ignoring ${option.value}, already have it in the list of options.`)
                options.push(option);
            } else {
                limit++;
            }

            lastOption = option;
        }

        callback(null, options);
    });
}