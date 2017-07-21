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
    if (!FlightType || FlightType == 'yes' || FlightType == 'round') {

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
    }, outputSessionAttributes);
    return true;

}


var populateFlightCard = function (slotName, intentRequest, callback, outputSessionAttributes) {
    // console.log(`intentRequest ${JSON.stringify(intentRequest)}`);
    var params = flightsApi.constructParameterFrom(slotName, intentRequest, outputSessionAttributes);

    // flightsApi.retrieveFlightsMock(params, function (error, response) { //Mock Data
    flightsApi.retrieveFlights(params, function (error, response) { //Live Data
        console.log(`RESPONSE: ${response}`)
        //prepare response card if there is data from repsponse [see definition of JSON response in api code]
        if (response.data) {
            var flights = response.data;
            var card = { contentType: 'application/vnd.amazonaws.card.generic', version: 1, genericAttachments: [] };
            card.genericAttachments = [];

            for (var x = 0; x < flights.length && x < 10; x++) {
                var flight = flights[x];
                var firstDeparture = flight.route[0];
                var departureDate = Dates.parseFromUTC(firstDeparture.dTimeUTC);
                var arrivalDate = Dates.parseFromUTC(firstDeparture.dTimeUTC);

                var genericAttachment = {
                    "title": `<strong>${firstDeparture.airline}${firstDeparture.flight_no}</strong> for ${flight.price} ${response.currency} <br/> ${flight.fly_duration}`,
                    "subTitle": `${firstDeparture.cityFrom} (${firstDeparture.flyFrom}) ${Dates.toISODate(departureDate)}`
                    + ` \n to ${firstDeparture.cityTo} (${firstDeparture.flyTo}) ${Dates.toISODate(arrivalDate)}`,
                    "imageUrl": `https://d2rhekw5qr4gcj.cloudfront.net/uploads/things/images/29304388_140406_0202_29.gif`,
                    "attachmentLinkUrl": flight.deep_link,
                    buttons: [{ "text": `choose`, "value": flight.id }],
                }
                card.genericAttachments.push(genericAttachment);
            }
        }

        callback(error, card);
    })
}