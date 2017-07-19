'use strict';
var util = require('../helpers/utilities');

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

    retrieveFlightsMock: function(params, callback){
        LOG.log("BEGIN")
        callback(null, flightsMockData)
        LOG.log("END")
    }
}

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
    "_results": 2,
    "connections": [],
    "currency": "EUR",
    "currency_rate": 1,
    "all_stopover_airports": [],
    "data": [
        {
            "mapIdfrom": "los-angeles",
            "refr": false,
            "duration": {
                "total": 52200,
                "return": 0,
                "departure": 52200
            },
            "flyTo": "MNL",
            "conversion": {
                "EUR": 501
            },
            "deep_link": "https://www.kiwi.com/deep?from=LAX&to=MNL&departure=29-08-2017&flightsId=EU1498130691_336236382&price=501&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/JlrX3U3AoCx3di0VrdbALBpiVzt9bISEAuRBLuzSrpTWt7KZQMknybQBviOsr4E09wYoNpDXi6bQQRSPGHehW56eT/je/b/bPjM3G9pwRs7IXFn1xEcYtawWYYh3vRrM4toNB0yNP/j2wMFP64ZhytnWnneLeOzGOY0nq+1RhjugLbDAaQoU1ssDLkrgUD3JQ05Zo7ctqZB0espkfFy9Q59brB1JC9OClgjqKwE46C7u4qj8iZbhuGEcfbcsI4D6MShmtDh26BK8+8ubpOcwZO4JF0rrDU7MICp1fKu0X5jr+lr98wd5fmf7lfVgG6MmDDUSbGglYpiVYSOd9a7Q+2/PBW13NouX0Jaud+mJMcIqnikI2DakmhZ2KWzOTtytg2WdxMF0g+bYuJoKT9k0R5Q/AhSiFd764UTyLnXaIuVc4tXi39Fu9hk7e0p2dYyJEP2lDDdGkqHon+XSoljvkY=",
            "mapIdto": "manila",
            "nightsInDest": null,
            "airlines": [
                "PR"
            ],
            "id": "EU1498130691_336236382",
            "facilitated_booking_available": true,
            "pnr_count": 1,
            "fly_duration": "14h 30m",
            "countryTo": {
                "code": "PH",
                "name": "Philippines"
            },
            "baglimit": {
                "hand_width": 40,
                "hand_length": 55,
                "hold_weight": 10,
                "hand_height": 20,
                "hand_weight": 7
            },
            "aTimeUTC": 1504125000,
            "p3": 1,
            "price": 501,
            "type_flights": [
                "GDS-r"
            ],
            "bags_price": {
                "1": 0
            },
            "cityTo": "Manila",
            "transfers": [],
            "flyFrom": "LAX",
            "dTimeUTC": 1504072800,
            "p2": 1,
            "countryFrom": {
                "code": "US",
                "name": "United States"
            },
            "p1": 1,
            "dTime": 1504047600,
            "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/JlrX3U3AoCx3di0VrdbALBpiVzt9bISEAuRBLuzSrpTWt7KZQMknybQBviOsr4E09wYoNpDXi6bQQRSPGHehW56eT/je/b/bPjM3G9pwRs7IXFn1xEcYtawWYYh3vRrM4toNB0yNP/j2wMFP64ZhytnWnneLeOzGOY0nq+1RhjugLbDAaQoU1ssDLkrgUD3JQ05Zo7ctqZB0espkfFy9Q59brB1JC9OClgjqKwE46C7u4qj8iZbhuGEcfbcsI4D6MShmtDh26BK8+8ubpOcwZO4JF0rrDU7MICp1fKu0X5jr+lr98wd5fmf7lfVgG6MmDDUSbGglYpiVYSOd9a7Q+2/PBW13NouX0Jaud+mJMcIqnikI2DakmhZ2KWzOTtytg2WdxMF0g+bYuJoKT9k0R5Q/AhSiFd764UTyLnXaIuVc4tXi39Fu9hk7e0p2dYyJEP2lDDdGkqHon+XSoljvkY=",
            "cityFrom": "Los Angeles",
            "aTime": 1504153800,
            "route": [
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "los-angeles",
                    "flight_no": 103,
                    "original_return": 0,
                    "lngFrom": -118.223533630371,
                    "flyTo": "MNL",
                    "latTo": 14.6042,
                    "source": "GDS-r",
                    "combination_id": "EU1498130691",
                    "id": "EU1498130691_336236382",
                    "latFrom": 34.0699824882441,
                    "lngTo": 120.982,
                    "dTimeUTC": 1504072800,
                    "aTimeUTC": 1504125000,
                    "return": 0,
                    "price": 1,
                    "cityTo": "Manila",
                    "flyFrom": "LAX",
                    "mapIdto": "manila",
                    "dTime": 1504047600,
                    "found_on": null,
                    "airline": "PR",
                    "cityFrom": "Los Angeles",
                    "aTime": 1504153800
                }
            ],
            "distance": 11756.49
        },
        {
            "mapIdfrom": "los-angeles",
            "refr": false,
            "duration": {
                "total": 52200,
                "return": 0,
                "departure": 52200
            },
            "flyTo": "MNL",
            "conversion": {
                "EUR": 501
            },
            "deep_link": "https://www.kiwi.com/deep?from=LAX&to=MNL&departure=23-08-2017&flightsId=DD3312511819_499400415&price=501&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/JlrX3U3AoCx3di0VrdbALBWBcYzkIcn0ris+zYi4UKQGOiQ3RmJ5ZWE/tz61lojhBsKJL7FDsvTHnSUv1T6+GmF8LgKs44+RawnLaB/GaAb3NVcVRvNW3JrMmUqA4ibIPZUoSHHaaG6jY2pAfEpj5XMK1EHSU1Z9PeChVforF4iO0wGBMsetwklnGaIV8li+YJvR6wEZHUkOp5ab3XELcWJ5Yaa7Hq7rVmsHH5gMgLKFz0jWdItJa26foAeYKfcgGTrf/PjLwTiuYbp5eK9Zn5BluWapZojcxs4La6RM5Eq9WLm/86HQA+nlRbv2w9+pmOqV9dwQ+WvuGHC1+4DHwKcCeRjtpBmDEKuagpHKwvKAvrqOFhVGG8qDzAj14J27tCWGZhNyh7xET9WyjYhsLzs2DeiAwcg4rVQbQeQjdxmK6wvMb1WxqzmZG7ei/RUM8Ogb4Dhih5+mSirroJxegE=",
            "mapIdto": "manila",
            "nightsInDest": null,
            "airlines": [
                "PR"
            ],
            "id": "DD3312511819_499400415",
            "facilitated_booking_available": true,
            "pnr_count": 1,
            "fly_duration": "14h 30m",
            "countryTo": {
                "code": "PH",
                "name": "Philippines"
            },
            "baglimit": {
                "hand_width": 40,
                "hand_length": 55,
                "hold_weight": 10,
                "hand_height": 20,
                "hand_weight": 7
            },
            "aTimeUTC": 1503606600,
            "p3": 1,
            "price": 501,
            "type_flights": [
                "GDS-r"
            ],
            "bags_price": {
                "1": 0
            },
            "cityTo": "Manila",
            "transfers": [],
            "flyFrom": "LAX",
            "dTimeUTC": 1503554400,
            "p2": 1,
            "countryFrom": {
                "code": "US",
                "name": "United States"
            },
            "p1": 1,
            "dTime": 1503529200,
            "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/JlrX3U3AoCx3di0VrdbALBWBcYzkIcn0ris+zYi4UKQGOiQ3RmJ5ZWE/tz61lojhBsKJL7FDsvTHnSUv1T6+GmF8LgKs44+RawnLaB/GaAb3NVcVRvNW3JrMmUqA4ibIPZUoSHHaaG6jY2pAfEpj5XMK1EHSU1Z9PeChVforF4iO0wGBMsetwklnGaIV8li+YJvR6wEZHUkOp5ab3XELcWJ5Yaa7Hq7rVmsHH5gMgLKFz0jWdItJa26foAeYKfcgGTrf/PjLwTiuYbp5eK9Zn5BluWapZojcxs4La6RM5Eq9WLm/86HQA+nlRbv2w9+pmOqV9dwQ+WvuGHC1+4DHwKcCeRjtpBmDEKuagpHKwvKAvrqOFhVGG8qDzAj14J27tCWGZhNyh7xET9WyjYhsLzs2DeiAwcg4rVQbQeQjdxmK6wvMb1WxqzmZG7ei/RUM8Ogb4Dhih5+mSirroJxegE=",
            "cityFrom": "Los Angeles",
            "aTime": 1503635400,
            "route": [
                {
                    "bags_recheck_required": false,
                    "mapIdfrom": "los-angeles",
                    "flight_no": 103,
                    "original_return": 0,
                    "lngFrom": -118.223533630371,
                    "flyTo": "MNL",
                    "latTo": 14.6042,
                    "source": "GDS-r",
                    "combination_id": "DD3312511819",
                    "id": "DD3312511819_499400415",
                    "latFrom": 34.0699824882441,
                    "lngTo": 120.982,
                    "dTimeUTC": 1503554400,
                    "aTimeUTC": 1503606600,
                    "return": 0,
                    "price": 1,
                    "cityTo": "Manila",
                    "flyFrom": "LAX",
                    "mapIdto": "manila",
                    "dTime": 1503529200,
                    "found_on": null,
                    "airline": "PR",
                    "cityFrom": "Los Angeles",
                    "aTime": 1503635400
                }
            ],
            "distance": 11756.49
        }
    ],
    "ref_tasks": {},
    "refresh": [],
    "del": null,
    "all_airlines": [
        "PR"
    ],
    "time": 1
}