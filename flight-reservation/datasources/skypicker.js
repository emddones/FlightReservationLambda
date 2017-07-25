'use strict';
var util = require('../helpers/utilities');
var Dates = require('../helpers/date-helpers');
var LOG = util.logger('places.js');
module.exports = {
    "retrievePlaces": retrievePlaces,
    "retrieveFlights": retrieveFlights,
    "constructParameterFrom": constructParameterFrom
}

function retrievePlaces(params, callback) {
    LOG.log("BEGIN");
    var getUrl = { url: "https://api.skypicker.com/places" };

    util.get(getUrl, params,
        function (error, data) {
            callback(error, data);
        }
    );

    LOG.log("END");
}

function retrieveFlights(params, callback) {
    LOG.log("BEGIN");
    var getUrl = { url: "https://api.skypicker.com/flights" };

    util.get(getUrl, params,
        function (error, data) {
            callback(error, data);
        }
    );

    LOG.log("END");
}

function constructParameterFrom(slotName, intentRequest, outputSessionAttributes) {

    // console.log(`intentRequest ${JSON.stringify(intentRequest)}`);
    var slots = intentRequest.currentIntent.slots;

    var origin;
    var destination;
    var targetDeparture = new Date();;

    if (slotName == 'DepartureFlightId') {
        origin = slots.From;
        destination = slots.To;
        targetDeparture = Dates.parseLocalDate(slots.Departure);
    } else {
        origin = slots.To;
        destination = slots.From;
        targetDeparture = Dates.parseLocalDate(slots.Departure);
    }
    
    return {
        flyFrom: origin //'Los Angeles' //[From]
        , to: destination //'New York' //[To]
        // Restricts that all retrieved flights are in the same day of the slot.
        , dateFrom: prepareDate(targetDeparture) //'11/08/2017' // [Departure] *format dd/mm/yyyy //Specific if rountrip searching is implemented
        , dateTo: prepareDate(targetDeparture)  //'11/08/2017' // [Departure] *format dd/mm/yyyy            
        , typeFlight: 'oneway' //(oneway, round)  //round returns 2 routes, the first departure, and return routes.
        , directFlights: 1 //specify dierct flights only
        , flyDaysType: 'departure' //For now departure only
        , returnFlyDays: '[0,1,2,,3,4,5,6]'
        , returnFlyDaysType: 'departure'
        , partner: 'picky'
        , partner_market: 'us'
        , limit: '5'
        , curr: 'USD'
        , sort: 'price'
    }
}

function prepareDate(dateToFormat) {
    return `${padLeft('00', dateToFormat.getDate())}/${padLeft('00', dateToFormat.getMonth() + 1)}/${'00', dateToFormat.getFullYear()}`;
}

function padLeft(leading, num) {
    var expectedLen = leading.length;
    return (leading + num).substr(expectedLen * -1, expectedLen)
}

var responseDataStruct = { //simplified response sample to map.
    "currency": "USD",
    "_results": 3,
    data: [{
        "id": "329138348|330940913",
        "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&return=19-09-2017&flightsId=329138348%7C330940913&price=351&passengers=1&affilid=picky&lang=en&currency=USD&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzDkR2o9Hv99rUDnsjbe97KzC718Rncc/e49OE50HYe/DPxEFRerM6opJrRFt16h+k5nYKEv96yPaSTTWbsN/XaosJsM5aczKNznh4IibSBbrUuAkUcSwFYwS/tLqwqFn9HvJqgK5VhOmFciv3TBr1kIo2YiznNhQl/MucF37GlRvfbU17ckYu6C8kF4r2Tw2SMAQEsDCxmK4nAk19dKHvJf7EM8qCX76n+fD3d5xDOcwN2zyzNZ9fInwO4F5ym6nUvqsPEZ+ghHdtZ0XSyacGlVlPuwOv6u9/CRKbo5aosis2meR5eunD9U82LK4dTntYXUlbd8OXZHdDZvyWuJNqPgjJoWKexiWhtamIJt+fVQIKknSrzIzqR8Q9dLsMXaKGW372FMjwXvkGyaBRRxZvrofaoFd/Bfp6pmIshkTlKtftGTdgtnudjOJ3GOTSKWoWg=",
        "return_duration": "6h 0m",
        "fly_duration": "5h 25m",
        "price": 407,
        "flyTo": "JFK",
        "flyFrom": "LAX",
        route: [{//0 = departure, 1 = return
            "id": "329138348",
            "flight_no": 24,
            "flyFrom": "LAX",
            "flyTo": "JFK",
            "cityTo": "New York City",
            "cityFrom": "Los Angeles",
            "dTimeUTC": 1502802000,
            "aTimeUTC": 1502821500,
            "airline": "B6"
        }]
    }]
};
