'use strict';
var util = require('../helpers/utilities');
var Dates = require('../helpers/date-helpers');
var LOG = util.logger('places.js');
module.exports = {

    retrievePlaces: function (params, callback) {
        LOG.log("BEGIN");
        var getUrl = { url: "https://api.skypicker.com/places" };

        util.get(getUrl, params,
            function (error, data) {
                callback(error, data);
            }
        );

        LOG.log("END");
    },

    retrieveFlights: function (params, callback) {
        LOG.log("BEGIN");
        var getUrl = { url: "https://api.skypicker.com/flights" };

        util.get(getUrl, params,
            function (error, data) {
                callback(error, data);
            }
        );

        LOG.log("END");
    },

    retrievePlacesMock: function (givenLocation, callback) {
        callback(null, placesMockData);
    },



    retrieveFlightsMock: function (params, callback) {
        LOG.log("BEGIN")
        callback(null, flightsMockData)
        LOG.log("END")
    },

    constructParameterFrom: function (slotName, intentRequest, outputSessionAttributes) {

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

        // var paramTargetDepartureDate = `${targetDeparture.getDate()}/${targetDeparture.getMonth() + 1}/${targetDeparture.getFullYear()}`;
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

var flightsMockData = {
    "search_params": {
        "to_type": "airport",
        "flyFrom_type": "airport",
        "seats": {
            "infants": 0,
            "passengers": 1,
            "adults": 1,
            "children": 0
        }
    },
    "_results": 3,
    "connections": [],
    "currency": "USD",
    "currency_rate": 0.86371,
    "all_stopover_airports": [],
    "data": [
        {
            "mapIdfrom": "los-angeles",
            "refr": false,
            "duration": {
                "total": 41100,
                "return": 21600,
                "departure": 19500
            },
            "return_duration": "6h 0m",
            "flyTo": "JFK",
            "conversion": {
                "USD": 407,
                "EUR": 351
            },
            "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&return=19-09-2017&flightsId=329138348%7C330940913&price=351&passengers=1&affilid=picky&lang=en&currency=USD&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzDkR2o9Hv99rUDnsjbe97KzC718Rncc/e49OE50HYe/DPxEFRerM6opJrRFt16h+k5nYKEv96yPaSTTWbsN/XaosJsM5aczKNznh4IibSBbrUuAkUcSwFYwS/tLqwqFn9HvJqgK5VhOmFciv3TBr1kIo2YiznNhQl/MucF37GlRvfbU17ckYu6C8kF4r2Tw2SMAQEsDCxmK4nAk19dKHvJf7EM8qCX76n+fD3d5xDOcwN2zyzNZ9fInwO4F5ym6nUvqsPEZ+ghHdtZ0XSyacGlVlPuwOv6u9/CRKbo5aosis2meR5eunD9U82LK4dTntYXUlbd8OXZHdDZvyWuJNqPgjJoWKexiWhtamIJt+fVQIKknSrzIzqR8Q9dLsMXaKGW372FMjwXvkGyaBRRxZvrofaoFd/Bfp6pmIshkTlKtftGTdgtnudjOJ3GOTSKWoWg=",
            "mapIdto": "new-york",
            "nightsInDest": 35,
            "airlines": [
                "B6",
                "DL"
            ],
            "id": "329138348|330940913",
            "facilitated_booking_available": false,
            "pnr_count": 2,
            "fly_duration": "5h 25m",
            "countryTo": {
                "code": "US",
                "name": "United States"
            },
            "baglimit": {
                "hand_width": 35,
                "hand_length": 55,
                "hold_weight": 20,
                "hand_height": 22,
                "hand_weight": 7
            },
            "aTimeUTC": 1502821500,
            "p3": 1,
            "price": 407,
            "type_flights": [
                "lcc"
            ],
            "bags_price": {
                "1": 44
            },
            "cityTo": "New York City",
            "transfers": [],
            "flyFrom": "LAX",
            "dTimeUTC": 1502802000,
            "p2": 1,
            "countryFrom": {
                "code": "US",
                "name": "United States"
            },
            "p1": 1,
            "dTime": 1502776800,
            "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzDkR2o9Hv99rUDnsjbe97KzC718Rncc/e49OE50HYe/DPxEFRerM6opJrRFt16h+k5nYKEv96yPaSTTWbsN/XaosJsM5aczKNznh4IibSBbrUuAkUcSwFYwS/tLqwqFn9HvJqgK5VhOmFciv3TBr1kIo2YiznNhQl/MucF37GlRvfbU17ckYu6C8kF4r2Tw2SMAQEsDCxmK4nAk19dKHvJf7EM8qCX76n+fD3d5xDOcwN2zyzNZ9fInwO4F5ym6nUvqsPEZ+ghHdtZ0XSyacGlVlPuwOv6u9/CRKbo5aosis2meR5eunD9U82LK4dTntYXUlbd8OXZHdDZvyWuJNqPgjJoWKexiWhtamIJt+fVQIKknSrzIzqR8Q9dLsMXaKGW372FMjwXvkGyaBRRxZvrofaoFd/Bfp6pmIshkTlKtftGTdgtnudjOJ3GOTSKWoWg=",
            "cityFrom": "Los Angeles",
            "aTime": 1502807100,
            "route": [
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "los-angeles",
                    "flight_no": 24,
                    "original_return": 0,
                    "lngFrom": -118.223533630371,
                    "flyTo": "JFK",
                    "latTo": 40.7052700759286,
                    "source": null,
                    "combination_id": "329138348",
                    "id": "329138348",
                    "latFrom": 34.0699824882441,
                    "lngTo": -74.0135622024537,
                    "dTimeUTC": 1502802000,
                    "aTimeUTC": 1502821500,
                    "return": 0,
                    "price": 1,
                    "cityTo": "New York City",
                    "flyFrom": "LAX",
                    "mapIdto": "new-york",
                    "dTime": 1502776800,
                    "found_on": null,
                    "airline": "B6",
                    "cityFrom": "Los Angeles",
                    "aTime": 1502807100
                },
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "new-york",
                    "flight_no": 428,
                    "original_return": 1,
                    "lngFrom": -74.0135622024537,
                    "flyTo": "LAX",
                    "latTo": 34.0699824882441,
                    "source": null,
                    "combination_id": "330940913",
                    "id": "330940913",
                    "latFrom": 40.7052700759286,
                    "lngTo": -118.223533630371,
                    "dTimeUTC": 1505828700,
                    "aTimeUTC": 1505850300,
                    "return": 1,
                    "price": 1,
                    "cityTo": "Los Angeles",
                    "flyFrom": "JFK",
                    "mapIdto": "los-angeles",
                    "dTime": 1505814300,
                    "found_on": null,
                    "airline": "DL",
                    "cityFrom": "New York City",
                    "aTime": 1505825100
                }
            ],
            "distance": 3936.98
        },
        {
            "mapIdfrom": "los-angeles",
            "refr": false,
            "duration": {
                "total": 41100,
                "return": 21600,
                "departure": 19500
            },
            "return_duration": "6h 0m",
            "flyTo": "JFK",
            "conversion": {
                "USD": 407,
                "EUR": 351
            },
            "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&return=19-09-2017&flightsId=329138348%7C330940912&price=351&passengers=1&affilid=picky&lang=en&currency=USD&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzB+N9kIzNrGabbZFh5gCKlg717iMFHrCmln5SAH4JND9yrd+MeeAjuwku3tj+fGu+DQXRpnN7Sw/J6dakuP8lXI3yYMIQdDAnCjynTIyQh1+wFESkiMfGK+geZrh0Z627Y6Qu43cZsJ10A893oWLbc2A/vlqD3CrdJ6IEIuTFsQfGGnwBWYdn++YmpcShIVRpitnGdXoaBI0glzXDacezR7gG7midQENJCYe3LxSs25t1cI5YHNSdMGcJbDQkXzMla1OJ7x3qOL+aBpTxk+vQCmE38F3zrOAwthlmDYc+3IgUbcH9WhBYYY+7ULsaFVuGbprIdHkVEcGDNthMJRiZlKsDpdhLnHMgz0tUO+UwCVzA289AE4WogEggyY+xz79skgZnDWGUjLm7TKDxZsLLWVcie3cgfWxqeoWwMTL+v36SEzVcN0BejWK+0qie1B8qE=",
            "mapIdto": "new-york",
            "nightsInDest": 35,
            "airlines": [
                "B6",
                "DL"
            ],
            "id": "329138348|330940912",
            "facilitated_booking_available": false,
            "pnr_count": 2,
            "fly_duration": "5h 25m",
            "countryTo": {
                "code": "US",
                "name": "United States"
            },
            "baglimit": {
                "hand_width": 35,
                "hand_length": 55,
                "hold_weight": 20,
                "hand_height": 22,
                "hand_weight": 7
            },
            "aTimeUTC": 1502821500,
            "p3": 1,
            "price": 407,
            "type_flights": [
                "lcc"
            ],
            "bags_price": {
                "1": 44
            },
            "cityTo": "New York City",
            "transfers": [],
            "flyFrom": "LAX",
            "dTimeUTC": 1502802000,
            "p2": 1,
            "countryFrom": {
                "code": "US",
                "name": "United States"
            },
            "p1": 1,
            "dTime": 1502776800,
            "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzB+N9kIzNrGabbZFh5gCKlg717iMFHrCmln5SAH4JND9yrd+MeeAjuwku3tj+fGu+DQXRpnN7Sw/J6dakuP8lXI3yYMIQdDAnCjynTIyQh1+wFESkiMfGK+geZrh0Z627Y6Qu43cZsJ10A893oWLbc2A/vlqD3CrdJ6IEIuTFsQfGGnwBWYdn++YmpcShIVRpitnGdXoaBI0glzXDacezR7gG7midQENJCYe3LxSs25t1cI5YHNSdMGcJbDQkXzMla1OJ7x3qOL+aBpTxk+vQCmE38F3zrOAwthlmDYc+3IgUbcH9WhBYYY+7ULsaFVuGbprIdHkVEcGDNthMJRiZlKsDpdhLnHMgz0tUO+UwCVzA289AE4WogEggyY+xz79skgZnDWGUjLm7TKDxZsLLWVcie3cgfWxqeoWwMTL+v36SEzVcN0BejWK+0qie1B8qE=",
            "cityFrom": "Los Angeles",
            "aTime": 1502807100,
            "route": [
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "los-angeles",
                    "flight_no": 24,
                    "original_return": 0,
                    "lngFrom": -118.223533630371,
                    "flyTo": "JFK",
                    "latTo": 40.7052700759286,
                    "source": null,
                    "combination_id": "329138348",
                    "id": "329138348",
                    "latFrom": 34.0699824882441,
                    "lngTo": -74.0135622024537,
                    "dTimeUTC": 1502802000,
                    "aTimeUTC": 1502821500,
                    "return": 0,
                    "price": 1,
                    "cityTo": "New York City",
                    "flyFrom": "LAX",
                    "mapIdto": "new-york",
                    "dTime": 1502776800,
                    "found_on": null,
                    "airline": "B6",
                    "cityFrom": "Los Angeles",
                    "aTime": 1502807100
                },
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "new-york",
                    "flight_no": 423,
                    "original_return": 1,
                    "lngFrom": -74.0135622024537,
                    "flyTo": "LAX",
                    "latTo": 34.0699824882441,
                    "source": null,
                    "combination_id": "330940912",
                    "id": "330940912",
                    "latFrom": 40.7052700759286,
                    "lngTo": -118.223533630371,
                    "dTimeUTC": 1505836800,
                    "aTimeUTC": 1505858400,
                    "return": 1,
                    "price": 1,
                    "cityTo": "Los Angeles",
                    "flyFrom": "JFK",
                    "mapIdto": "los-angeles",
                    "dTime": 1505822400,
                    "found_on": null,
                    "airline": "DL",
                    "cityFrom": "New York City",
                    "aTime": 1505833200
                }
            ],
            "distance": 3936.98
        },
        {
            "mapIdfrom": "los-angeles",
            "refr": false,
            "duration": {
                "total": 41400,
                "return": 21900,
                "departure": 19500
            },
            "return_duration": "6h 5m",
            "flyTo": "JFK",
            "conversion": {
                "USD": 407,
                "EUR": 351
            },
            "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&return=19-09-2017&flightsId=329138348%7C330940911&price=351&passengers=1&affilid=picky&lang=en&currency=USD&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzAgt9LTEHtwwdXcqKbnHhvy8zc4cd4Ar44WwSh65W/o74ZGXHt9lmgrbaG4gVEoB2UM58q055RDHYVrtoINZQH1n7bLGHPmC3WEOgALm/eSqiL9Oc+QkdJBjQg75VuPEyAFtERAc57PU0a+TRHLtRdup2kJ6OG70kLfYbdWPwDqtiOe0i0q0ydOfWMaAxc1lTdaQGWpTNqJzqKwYUPOte8pgz6QOMKSMFxkezRft3y+xRufpOaAejM2xDP0LpLdbv3FbqhSoCdI+iyiaVgVJ54tdIjvmkN8cIrVz74IG2QPTBCJMKfnqRMS6bap0FIGZxaZB4PLRcR4ei0GWuKoD0+ece8O48Zwdt9k44QhA85TkqmD/e8wbW2xY19p76xmueGSk1nZ2AgbbQIlCY2B35+ioLkW2MH3klVQYCs0UDd/p/RTP1mqgHkcMsx/ccR7ucY=",
            "mapIdto": "new-york",
            "nightsInDest": 35,
            "airlines": [
                "B6",
                "DL"
            ],
            "id": "329138348|330940911",
            "facilitated_booking_available": false,
            "pnr_count": 2,
            "fly_duration": "5h 25m",
            "countryTo": {
                "code": "US",
                "name": "United States"
            },
            "baglimit": {
                "hand_width": 35,
                "hand_length": 55,
                "hold_weight": 20,
                "hand_height": 22,
                "hand_weight": 7
            },
            "aTimeUTC": 1502821500,
            "p3": 1,
            "price": 407,
            "type_flights": [
                "lcc"
            ],
            "bags_price": {
                "1": 44
            },
            "cityTo": "New York City",
            "transfers": [],
            "flyFrom": "LAX",
            "dTimeUTC": 1502802000,
            "p2": 1,
            "countryFrom": {
                "code": "US",
                "name": "United States"
            },
            "p1": 1,
            "dTime": 1502776800,
            "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/J6A9UrZESdJSHUitxqyqzAgt9LTEHtwwdXcqKbnHhvy8zc4cd4Ar44WwSh65W/o74ZGXHt9lmgrbaG4gVEoB2UM58q055RDHYVrtoINZQH1n7bLGHPmC3WEOgALm/eSqiL9Oc+QkdJBjQg75VuPEyAFtERAc57PU0a+TRHLtRdup2kJ6OG70kLfYbdWPwDqtiOe0i0q0ydOfWMaAxc1lTdaQGWpTNqJzqKwYUPOte8pgz6QOMKSMFxkezRft3y+xRufpOaAejM2xDP0LpLdbv3FbqhSoCdI+iyiaVgVJ54tdIjvmkN8cIrVz74IG2QPTBCJMKfnqRMS6bap0FIGZxaZB4PLRcR4ei0GWuKoD0+ece8O48Zwdt9k44QhA85TkqmD/e8wbW2xY19p76xmueGSk1nZ2AgbbQIlCY2B35+ioLkW2MH3klVQYCs0UDd/p/RTP1mqgHkcMsx/ccR7ucY=",
            "cityFrom": "Los Angeles",
            "aTime": 1502807100,
            "route": [
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "los-angeles",
                    "flight_no": 24,
                    "original_return": 0,
                    "lngFrom": -118.223533630371,
                    "flyTo": "JFK",
                    "latTo": 40.7052700759286,
                    "source": null,
                    "combination_id": "329138348",
                    "id": "329138348",
                    "latFrom": 34.0699824882441,
                    "lngTo": -74.0135622024537,
                    "dTimeUTC": 1502802000,
                    "aTimeUTC": 1502821500,
                    "return": 0,
                    "price": 1,
                    "cityTo": "New York City",
                    "flyFrom": "LAX",
                    "mapIdto": "new-york",
                    "dTime": 1502776800,
                    "found_on": null,
                    "airline": "B6",
                    "cityFrom": "Los Angeles",
                    "aTime": 1502807100
                },
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "new-york",
                    "flight_no": 424,
                    "original_return": 1,
                    "lngFrom": -74.0135622024537,
                    "flyTo": "LAX",
                    "latTo": 34.0699824882441,
                    "source": null,
                    "combination_id": "330940911",
                    "id": "330940911",
                    "latFrom": 40.7052700759286,
                    "lngTo": -118.223533630371,
                    "dTimeUTC": 1505818800,
                    "aTimeUTC": 1505840700,
                    "return": 1,
                    "price": 1,
                    "cityTo": "Los Angeles",
                    "flyFrom": "JFK",
                    "mapIdto": "los-angeles",
                    "dTime": 1505804400,
                    "found_on": null,
                    "airline": "DL",
                    "cityFrom": "New York City",
                    "aTime": 1505815500
                }
            ],
            "distance": 3936.98
        }
    ],
    "ref_tasks": {},
    "refresh": [],
    "del": null,
    "all_airlines": [
        "AA",
        "VX",
        "DL",
        "B6",
        "AS"
    ],
    "time": 1
};

var placesMockData = [
    {
        "zoomLevelThreshold": 7,
        "numberOfAirports": 1,
        "sp_score": null,
        "value": "Los Angeles",
        "rank": 10,
        "parentId": "US",
        "lat": -36.943649,
        "lng": -72.350952,
        "type": 2,
        "id": "los-angeles",
        "population": 3877129
    },
    {
        "zoomLevelThreshold": 7,
        "numberOfAirports": 1,
        "sp_score": null,
        "value": "Los Angeles",
        "rank": 8,
        "parentId": "los-angeles_cl",
        "lat": -36.943649,
        "lng": -72.350952,
        "type": 0,
        "id": "LSQ",
        "population": null
    },
    {
        "zoomLevelThreshold": 7,
        "numberOfAirports": 1,
        "sp_score": null,
        "value": "Los Angeles",
        "rank": 8,
        "parentId": "los-angeles_us",
        "lat": 34.0699824882,
        "lng": -118.2235336304,
        "type": 0,
        "id": "LAX",
        "population": null
    }
];