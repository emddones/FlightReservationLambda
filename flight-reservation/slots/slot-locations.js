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
var utilities = require('../helpers/utilities');

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

    populateLocationResponseCard(givenValue,
        function (error, card) { //callback from buildLocationOptions
            // console.log(`received generated card: ${JSON.stringify(card)}`);

            if (error || !card || !card.genericAttachments || card.genericAttachments.length < 1) {
                elicit(slotName, `I was not able to retrieve any location called ${givenValue}, Can you clarify, or give another name it's called?`,
                    null, intentRequest,
                    callback, outputSessionAttributes);
                actionPerformed = true;
                return true;
            }

            var places = card.genericAttachments;

            if (places.length > 0) {
                if (places[0].title == givenValue) {
                    console.log(`...I found a perfect match for the location "${givenValue}"?, I will let LEX ask fo the remaining things`);
                    outputSessionAttributes[slotName] = givenValue;
                    callback(responseBuilder.delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
                    return true;
                }

                if (places[0].title != givenValue && places.length == 1) {
                    console.log(`...I found only one match and I need to verify if "${givenValue}" also means "${places[0].title}"?`);
                    elicit(slotName, `Do you mean "${places[0].title}"?`,
                        card,
                        intentRequest, callback, outputSessionAttributes);
                    actionPerformed = true;
                    return true;
                }

                console.log(`...I found ${places.length} possible matches for "${givenValue}".`);
                elicit(slotName, `Can you please verify? I know some places like "${places[0].value}", and "${places[1].value}", can you be more specific please?`,
                    card,
                    intentRequest, callback, outputSessionAttributes);
                actionPerformed = true;
                return true;
            }
        }, outputSessionAttributes)

    return true;
}

function elicit(slotToElicit, message, responseCard, intentRequest, callback, outputSessionAttributes) {
    var response = responseBuilder.elicitSlot(
        outputSessionAttributes,
        intentRequest.currentIntent.name,
        intentRequest.currentIntent.slots,
        slotToElicit,
        {
            contentType: 'PlainText',
            content: message
        },
        responseCard);

    callback(response);
}

function populateLocationResponseCard(givenLocation, callback, outputSessionAttributes) {
    var retrieveOperation = 'retrievePlacesMock';
    if (outputSessionAttributes.LIVE_DATA) {
        retrieveOperation = 'retrievePlaces';
    }

    flightsApi[retrieveOperation]({ term: givenLocation, v: 3 }, function (error, responseData) {

        var card = generateResponseCard(responseData);

        if (error || !card) {
            // console.log('ERROR ' + error + ' ' + card);
            callback(error || `No location found`, null);
        } else {
            // console.log('Returning location card: ' + card);
            callback(null, card);
        }

    });
}

function generateResponseCard(responseData) {

    var card = { contentType: 'application/vnd.amazonaws.card.generic', version: 1, genericAttachments: [] };
    var locations = responseData;

    if (!responseData || !locations || locations.length < 1 || !locations[0].value) {
        return null;
    }

    card.genericAttachments = [];

    const limit = 5;
    for (var x = 0; x < locations.length && x < limit; x++) {
        var location = locations[x];
        if (location.type == 2) {
            var genericAttachment = {
                "title": `${location.value}`,
                "subTitle": ``,
                "imageUrl": generateMapImage(location.value, location.lat, location.lng),
                "attachmentLinkUrl": location.deep_link,
                buttons: [{ "text": `choose`, "value": location.value }],
            }
            card.genericAttachments.push(genericAttachment);
        }
    }
    return card;
}

function generateMapImage(value, lat, lng) {
    var url = 'https://maps.googleapis.com/maps/api/staticmap?'
    var params = {
        zoom: 12
        // , center: value
        , size: `600x300`
        , maptype: `roadmap`
        , format: `jpg`
        , markers: `color:red|label:A|${lat},${lng}`
    };

    return url + utilities.toQueryString(params);
}

