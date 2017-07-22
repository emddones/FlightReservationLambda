'use strict'
/**
 * 
 * DepartureFlightId - if not valid, ask to verify
 * ReturnFlightId - if not valid, ask to verify
 * 
 */
var flightsApi = require('../datasources/skypicker');
var responseBuilder = require('../helpers/lex-response');
var Dates = require('../helpers/date-helpers');

module.exports = {
    "process": process
}

//default proecssor
function process(intentRequest, callback, outputSessionAttributes) {
    console.log('processsing slot-location logic');
    if (ASK_FLIGHT('DepartureFlightId', 'Please select your origin flight',
        intentRequest, callback, outputSessionAttributes))
    { return true }

    //check if round trip, then ask for the return flight
    var FlightType = intentRequest.currentIntent.slots.FlightType;
    var ReturnFlightId = intentRequest.currentIntent.slots.ReturnFlightId;
    if (!ReturnFlightId && (FlightType == 'yes' || FlightType == 'round trip')) {

        if (ASK_FLIGHT('ReturnFlightId', 'Please select your return flight.',
            intentRequest, callback, outputSessionAttributes))
        { return true }

    }
    //TODO: store selected flight info in outputSessionAttributes simplify structure for lambda-memory-storage optimization   
}

function ASK_FLIGHT(slotName, message, intentRequest, callback, outputSessionAttributes) {
    console.log(`...is "${slotName}" already given?... ${intentRequest.currentIntent.slots[slotName]}`);
    if (!intentRequest.currentIntent.slots[slotName]) {
        console.log(`...Well, "${slotName}" is empty. I need to ask.`);
        processFlight(slotName, message, intentRequest, callback, outputSessionAttributes);
        return true;
    }
    return false;
}

function isValid(DepartureFlightId, ReturnFlightId) {
    return true;
}

function processFlight(slotName, message, intentRequest, callback, outputSessionAttributes) {
    populateFlightCard(slotName, intentRequest, function (err, card) {

        // console.log(intentRequest);

        if (err || !card || !card.genericAttachments[0]) {
            var From = intentRequest.currentIntent.slots.From;
            var To = intentRequest.currentIntent.slots.To;
            var notFoundMessage = `Sorry but i dont see any flights from ${From} to ${To}. Plesae verify where you are coming from?`;
            intentRequest.currentIntent.slots.From = null;
            intentRequest.currentIntent.slots.To = null;
            intentRequest.currentIntent.slots.DepartureFlightId = null;
            intentRequest.currentIntent.slots.ReturnFlightId = null;
            outputSessionAttributes.From = null;
            outputSessionAttributes.To = null;
            elicitWithNoCard('To', notFoundMessage,
                intentRequest, callback, outputSessionAttributes);

        } else {

            var response = responseBuilder.elicitSlot(
                outputSessionAttributes,
                intentRequest.currentIntent.name,
                intentRequest.currentIntent.slots,
                slotName,
                {
                    contentType: 'PlainText',
                    content: message
                },
                card);
            callback(response);
        }

    }, outputSessionAttributes);
    return true;

}


var populateFlightCard = function (slotName, intentRequest, callback, outputSessionAttributes) {
    // console.log(`intentRequest ${JSON.stringify(intentRequest)}`);
    var params = flightsApi.constructParameterFrom(slotName, intentRequest, outputSessionAttributes);
    var retrieveOperation = 'retrieveFlightsMock';
    if (outputSessionAttributes.LIVE_DATA) {
        retrieveOperation = 'retrieveFlights';
    }

    flightsApi[retrieveOperation](params, function (error, response) { //Depending on LIVE_DATA, will call mock or live data source
        // console.log(`RESPONSE: ${response}`)
        // console.log(JSON.stringify(response));

        var card = generateCardFromData(response)

        if (error || !card) {
            callback(error || `No flights found for ${params.flyFrom} to ${params.flyTo}`, null);
        } else {
            callback(null, card);
        }
    })
}

function elicitWithNoCard(slotToElicit, message, intentRequest, callback, outputSessionAttributes) {
    var response = responseBuilder.elicitSlot(
        outputSessionAttributes,
        intentRequest.currentIntent.name,
        intentRequest.currentIntent.slots,
        slotToElicit,
        {
            contentType: 'PlainText',
            content: message
        }, null
    );
    callback(response);
}

function generateCardFromData(responseData) {

    var card = { contentType: 'application/vnd.amazonaws.card.generic', version: 1, genericAttachments: [] };
    var flights = responseData.data;

    if (!responseData || !flights || flights.length < 1) {
        return null;
    }

    card.genericAttachments = [];

    const limit = 5;
    for (var x = 0; x < flights.length && x < limit; x++) {
        var flight = flights[x];
        var firstDeparture = flight.route[0];
        var departureDate = Dates.parseFromUTC(firstDeparture.dTimeUTC);
        var arrivalDate = Dates.parseFromUTC(firstDeparture.dTimeUTC);

        var genericAttachment = {
            "title": `Flight number: ${firstDeparture.airline}${firstDeparture.flight_no} for (${flight.price} ${responseData.currency}) duration: ${flight.fly_duration}`,
            "subTitle": `Departure: ${firstDeparture.cityFrom} (${firstDeparture.flyFrom}) ${Dates.toISODate(departureDate)}`
            + ` \n Arrival: ${firstDeparture.cityTo} (${firstDeparture.flyTo}) ${Dates.toISODate(arrivalDate)}`,
            "imageUrl": `http://pics.avs.io/350/70/${firstDeparture.airline}.png`,
            "attachmentLinkUrl": flight.deep_link,
            buttons: [{ "text": `choose`, "value": flight.id }],
        }
        card.genericAttachments.push(genericAttachment);
    }

    return card;
}