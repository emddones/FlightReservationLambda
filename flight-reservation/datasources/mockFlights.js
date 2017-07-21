var params = {
    flyFrom: 'Los Angeles'
    , to: 'New York'
    , dateFrom: '11/08/2017' // format dd/mm/yyyy
    , dateTo: '11/08/2017'
    , returnFrom: '12/08/2017'
    , returnTo: '12/08/2017'
    , typeFlight: round //(oneway, round)
    , directFlights: 1 //specify dierct flights only
    , flyDaysType: 'departure'
    , returnFlyDays: '[0,1,2,,3,4,5,6]'
    , returnFlyDaysType: 'departure'
    , partner: 'picky'
    , partner_market: 'us'
    , limit: '4'
    , curr: 'USD'
    , sort: 'price'
}


var flightStructure = {
    "searchParams": {},
    "data": {
        "mapIdfrom": "los-angeles",
        "mapIdto": "new-york",
        "flyFrom": "LAX",
        "flyTo": "JFK",
        "cityFrom": "Los Angeles",
        "cityTo": "New York City",
        "id": "DE3798253790_571863076",
        "price": 193,
        "fly_duration": "5h 45m",
        "aTime": 1502830800,
        "distance": 3936.98,
        "countryFrom": {
            "code": "US",
            "name": "United States"
        },
        "countryTo": {
            "code": "US",
            "name": "United States"
        },
        "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&flightsId=DE3798253790_571863076&price=191&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/BMiB5qWJ7utwAjqQSe9Sp+wuTbVsMVftgpgGNk0B1WKvm1+9qWmbHUR3QMoGX9Ebm3W2ExAxL36/aKhI8kxFqBW64zCIbKUDw2PyDNqAALFXrD0E2zbW2eFRyvEyHBpAiGug/8D1bW9akGBQHcTRe3irtKNJeTJI7orPasMyiVGeizbe4Ylit7EnBExkCUkhpFiF+KUs9Jc22utCYKbzCKAkPogEjlD9p3dt2fbiSwjKovi0kBm4Zd9vqqX0RFcQH+1LtE/VcO1vPCs3pRN/mksita5/7qkv3YxgBh6ytBaHdk4CwuS1dSwzeqQ2eq9WGcRTUTAtRr9HP7xTjk6eOo3DGA7aX4LZBco7vm5bHrIS4MP55heQFq2BgBC2db6G/dcyYFjT2+2gnWrukdvcU56RrnKf8GyfeJUCMl/hBEr3JfLVe3V72auJraY9Ltu6Q1iGzikTZdedRiZBh9FHsM=",
        "airlines": [
            "DL"
        ],
    }

}


function retrieveFlights(params, callback) {
    callback(error, data);
}

function mockData() {
    var data =
        {
            "search_params": {
            },
            "_results": 5,
            "currency": "EUR",
            "currency_rate": 1,
            "data": [
                {
                    "mapIdfrom": "los-angeles",
                    "mapIdto": "new-york",
                    "flyFrom": "LAX",
                    "flyTo": "JFK",
                    "cityFrom": "Los Angeles",
                    "cityTo": "New York City",
                    "id": "DE3798253790_571863076",
                    "price": 193,
                    "fly_duration": "5h 45m",
                    "aTime": 1502830800,
                    "distance": 3936.98,
                    "countryFrom": {
                        "code": "US",
                        "name": "United States"
                    },
                    "countryTo": {
                        "code": "US",
                        "name": "United States"
                    },
                    "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&flightsId=DE3798253790_571863076&price=191&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/BMiB5qWJ7utwAjqQSe9Sp+wuTbVsMVftgpgGNk0B1WKvm1+9qWmbHUR3QMoGX9Ebm3W2ExAxL36/aKhI8kxFqBW64zCIbKUDw2PyDNqAALFXrD0E2zbW2eFRyvEyHBpAiGug/8D1bW9akGBQHcTRe3irtKNJeTJI7orPasMyiVGeizbe4Ylit7EnBExkCUkhpFiF+KUs9Jc22utCYKbzCKAkPogEjlD9p3dt2fbiSwjKovi0kBm4Zd9vqqX0RFcQH+1LtE/VcO1vPCs3pRN/mksita5/7qkv3YxgBh6ytBaHdk4CwuS1dSwzeqQ2eq9WGcRTUTAtRr9HP7xTjk6eOo3DGA7aX4LZBco7vm5bHrIS4MP55heQFq2BgBC2db6G/dcyYFjT2+2gnWrukdvcU56RrnKf8GyfeJUCMl/hBEr3JfLVe3V72auJraY9Ltu6Q1iGzikTZdedRiZBh9FHsM=",
                    "airlines": [
                        "DL"
                    ],
                    "route": [
                        {
                            "bags_recheck_required": false,
                            "mapIdfrom": "los-angeles",
                            "flight_no": 473,
                            "original_return": 0,
                            "latTo": 40.7052700759286,
                            "latFrom": 34.0699824882441,
                            "lngTo": -74.0135622024537,
                            "lngFrom": -118.223533630371,
                            "flyTo": "JFK",
                            "source": "GDS-r",
                            "combination_id": "DE3798253790",
                            "id": "DE3798253790_571863076",

                            "dTimeUTC": 1502824500,
                            "aTimeUTC": 1502845200,
                            "return": 0,
                            "price": 1,
                            "cityTo": "New York City",
                            "flyFrom": "LAX",
                            "mapIdto": "new-york",
                            "airline": "DL",
                            "cityFrom": "Los Angeles",
                            "aTime": 1502830800
                        }
                    ]
                },
                {
                    "mapIdfrom": "los-angeles",
                    "refr": true,
                    "duration": {
                        "total": 20100,
                        "return": 0,
                        "departure": 20100
                    },
                    "flyTo": "JFK",
                    "conversion": {
                        "EUR": 193
                    },
                    "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=15-08-2017&flightsId=DE2949586201_466423828&price=193&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NLHyKVR7H1cSkqItuGke3IQMLuII7I1h7DmuXtUsTr4h5GTmxieNBkJjklD8ca0jDN0upIIMgdLsHNsq/u58dXfo8SNUNf+Jki98ETV+6b6KWWdq9Ea3aMEad+3se+1Xrt4IT5816jAa719POtrIjoXyiX25rNKL7RZWp3gBqz12Vdw+rJFoAHjWalXWbt+BU71oKbpT9xjL2eusFiAdmfmAZjeCZ2Za9XRvJrRjuBAlgkB0x4x6VCAiVhPiE6sXhL1Q6DyR0OBm77HvdGJK7FAx7NZdDSSmZaXSb+hI0QBFkP8iE1/mg3FRx1rbUrMbmOUorW97XkBJnMQsT/RnpP3PxcHoxU1tFu2QwVCEsTkKafwJyxwXdH76Cqg8AjTv0xuE3TG9VkWG13n4i42OJNZxFxP7Kwhj0w7PsoBO6/juDRc6Qniu9HUisAesKHH3wfOTBN4+ENqpTNBJ2EGZFLRW5mV8fDZunxp1cpWUTGU6UE811Fi45NgvUDxTD0sI+Y=",
                    "mapIdto": "new-york",
                    "nightsInDest": null,
                    "airlines": [
                        "VX"
                    ],
                    "id": "DE2949586201_466423828",
                    "facilitated_booking_available": true,
                    "pnr_count": 1,
                    "fly_duration": "5h 35m",
                    "countryTo": {
                        "code": "US",
                        "name": "United States"
                    },
                    "baglimit": {
                        "hand_width": 40,
                        "hand_length": 60,
                        "hold_weight": 22,
                        "hand_height": 20,
                        "hand_weight": 10
                    },
                    "aTimeUTC": 1502856600,
                    "p3": 1,
                    "price": 193,
                    "type_flights": [
                        "GDS-r"
                    ],
                    "bags_price": {
                        "1": 23,
                        "2": 46
                    },
                    "cityTo": "New York City",
                    "transfers": [],
                    "flyFrom": "LAX",
                    "dTimeUTC": 1502836500,
                    "p2": 1,
                    "countryFrom": {
                        "code": "US",
                        "name": "United States"
                    },
                    "p1": 1,
                    "dTime": 1502811300,
                    "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NLHyKVR7H1cSkqItuGke3IQMLuII7I1h7DmuXtUsTr4h5GTmxieNBkJjklD8ca0jDN0upIIMgdLsHNsq/u58dXfo8SNUNf+Jki98ETV+6b6KWWdq9Ea3aMEad+3se+1Xrt4IT5816jAa719POtrIjoXyiX25rNKL7RZWp3gBqz12Vdw+rJFoAHjWalXWbt+BU71oKbpT9xjL2eusFiAdmfmAZjeCZ2Za9XRvJrRjuBAlgkB0x4x6VCAiVhPiE6sXhL1Q6DyR0OBm77HvdGJK7FAx7NZdDSSmZaXSb+hI0QBFkP8iE1/mg3FRx1rbUrMbmOUorW97XkBJnMQsT/RnpP3PxcHoxU1tFu2QwVCEsTkKafwJyxwXdH76Cqg8AjTv0xuE3TG9VkWG13n4i42OJNZxFxP7Kwhj0w7PsoBO6/juDRc6Qniu9HUisAesKHH3wfOTBN4+ENqpTNBJ2EGZFLRW5mV8fDZunxp1cpWUTGU6UE811Fi45NgvUDxTD0sI+Y=",
                    "cityFrom": "Los Angeles",
                    "aTime": 1502842200,
                    "route": [
                        {
                            "bags_recheck_required": false,
                            "mapIdfrom": "los-angeles",
                            "flight_no": 416,
                            "original_return": 0,
                            "lngFrom": -118.223533630371,
                            "flyTo": "JFK",
                            "latTo": 40.7052700759286,
                            "source": "GDS-r",
                            "combination_id": "DE2949586201",
                            "id": "DE2949586201_466423828",
                            "latFrom": 34.0699824882441,
                            "lngTo": -74.0135622024537,
                            "dTimeUTC": 1502836500,
                            "aTimeUTC": 1502856600,
                            "return": 0,
                            "price": 1,
                            "cityTo": "New York City",
                            "flyFrom": "LAX",
                            "mapIdto": "new-york",
                            "dTime": 1502811300,
                            "found_on": "amadeus_mpis",
                            "airline": "VX",
                            "cityFrom": "Los Angeles",
                            "aTime": 1502842200
                        }
                    ],
                    "distance": 3936.98
                },
                {
                    "mapIdfrom": "los-angeles",
                    "refr": true,
                    "duration": {
                        "total": 20340,
                        "return": 0,
                        "departure": 20340
                    },
                    "flyTo": "JFK",
                    "conversion": {
                        "EUR": 195
                    },
                    "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=16-08-2017&flightsId=DH3516503649_558614960&price=195&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/PJec2NbzV8pQpyv0ZBijUnFn3f7Z6iJkCTScuzW+1WiCmguszPFq2OZzUD2inoeqGaWHtxN9UpX62eGUMK3ptmcCgV5VUSlsIxX0Mwhn27v9lwClSddco5mgwHlXP1cXapKGFUKhSalxZaklG2pI8TGR02Y2Rhpo9zm4KFec2WjSGoBe8ZXbbBidycighq33dc0mRthEIPtwHnkNoO2ocVc1JjmPZUM3UH0mJH7dewvufLvPoxl/z3nKKu/9WrxPEqmC65x88acQZ+KN9DzKBN+z3al/cMoyhI0jejj4nCN6rdsOi/5s/1+cHWzy1b1IGIy6kznG4NcofhRCoGLb2TpboDQy6MjlRjNYWSIwxFAObXPKEJKxhl8vfnsj+pSIIGicEL4ThpVRY4KvQ/GgbXhfd8FWay6Zi6XAyKZelozdJbeFrSW//97QeM48l4Aob7jOd/D06ECHjcDMw5IduE=",
                    "mapIdto": "new-york",
                    "nightsInDest": null,
                    "airlines": [
                        "DL"
                    ],
                    "id": "DH3516503649_558614960",
                    "facilitated_booking_available": true,
                    "pnr_count": 1,
                    "fly_duration": "5h 39m",
                    "countryTo": {
                        "code": "US",
                        "name": "United States"
                    },
                    "baglimit": {
                        "hand_width": 35,
                        "hand_length": 56,
                        "hold_weight": 20,
                        "hand_height": 23,
                        "hand_weight": 7
                    },
                    "aTimeUTC": 1502908740,
                    "p3": 1,
                    "price": 195,
                    "type_flights": [
                        "GDS-r"
                    ],
                    "bags_price": {
                        "1": 25
                    },
                    "cityTo": "New York City",
                    "transfers": [],
                    "flyFrom": "LAX",
                    "dTimeUTC": 1502888400,
                    "p2": 1,
                    "countryFrom": {
                        "code": "US",
                        "name": "United States"
                    },
                    "p1": 1,
                    "dTime": 1502863200,
                    "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/PJec2NbzV8pQpyv0ZBijUnFn3f7Z6iJkCTScuzW+1WiCmguszPFq2OZzUD2inoeqGaWHtxN9UpX62eGUMK3ptmcCgV5VUSlsIxX0Mwhn27v9lwClSddco5mgwHlXP1cXapKGFUKhSalxZaklG2pI8TGR02Y2Rhpo9zm4KFec2WjSGoBe8ZXbbBidycighq33dc0mRthEIPtwHnkNoO2ocVc1JjmPZUM3UH0mJH7dewvufLvPoxl/z3nKKu/9WrxPEqmC65x88acQZ+KN9DzKBN+z3al/cMoyhI0jejj4nCN6rdsOi/5s/1+cHWzy1b1IGIy6kznG4NcofhRCoGLb2TpboDQy6MjlRjNYWSIwxFAObXPKEJKxhl8vfnsj+pSIIGicEL4ThpVRY4KvQ/GgbXhfd8FWay6Zi6XAyKZelozdJbeFrSW//97QeM48l4Aob7jOd/D06ECHjcDMw5IduE=",
                    "cityFrom": "Los Angeles",
                    "aTime": 1502894340,
                    "route": [
                        {
                            "bags_recheck_required": false,
                            "mapIdfrom": "los-angeles",
                            "flight_no": 763,
                            "original_return": 0,
                            "lngFrom": -118.223533630371,
                            "flyTo": "JFK",
                            "latTo": 40.7052700759286,
                            "source": "GDS-r",
                            "combination_id": "DH3516503649",
                            "id": "DH3516503649_558614960",
                            "latFrom": 34.0699824882441,
                            "lngTo": -74.0135622024537,
                            "dTimeUTC": 1502888400,
                            "aTimeUTC": 1502908740,
                            "return": 0,
                            "price": 1,
                            "cityTo": "New York City",
                            "flyFrom": "LAX",
                            "mapIdto": "new-york",
                            "dTime": 1502863200,
                            "found_on": "amadeus_mpis",
                            "airline": "DL",
                            "cityFrom": "Los Angeles",
                            "aTime": 1502894340
                        }
                    ],
                    "distance": 3936.98
                },
                {
                    "mapIdfrom": "los-angeles",
                    "refr": true,
                    "duration": {
                        "total": 20100,
                        "return": 0,
                        "departure": 20100
                    },
                    "flyTo": "JFK",
                    "conversion": {
                        "EUR": 195
                    },
                    "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=06-09-2017&flightsId=EU2565883611_408542164&price=195&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/PJec2NbzV8pQpyv0ZBijUmANvU/XDQQn7gqHyoTNwMZIep73NHtVAwutgGVHJE2CNDl3siw77RdvZ4J3CwW8MgHhfkUGwJOcKtbetHfIJlFtJqLvM/T2ohmFBJC4OcYfZrZCCz9Gh/8JNPirLB4K7BAD9MpuwZ9EvQ+FjPvgn1vfvjAtTAV3YtOwb1QnOAmkWsg9riu9PQcrn0fMIJexzD4b/V/+2OzlAu7XDaAE4RboOI8N9fhdX1BJqdp5fa/sLZRw3GjeVTOkyYShnhiW10JNydFmRxA5QFFH07BUuOItnjU9eW6hROKKa+4j8eQm4MNDl1RzJ24BG0k/1iJy1PIjTVyp/tovEFxyqLTtA/m7YFtAWu13WQeHun1YWyCASdsoVkmPVb3BaUOjrnaXtqFssjYWHJXSF/YXb7NSUO4K5mOPyEnCnYjA0FA4HtIKv6vxVSf9jWo9ieWPsnqv/s=",
                    "mapIdto": "new-york",
                    "nightsInDest": null,
                    "airlines": [
                        "AS"
                    ],
                    "id": "EU2565883611_408542164",
                    "facilitated_booking_available": true,
                    "pnr_count": 1,
                    "fly_duration": "5h 35m",
                    "countryTo": {
                        "code": "US",
                        "name": "United States"
                    },
                    "baglimit": {
                        "hand_width": 41,
                        "hand_length": 43,
                        "hold_weight": 23,
                        "hand_height": 25,
                        "hand_weight": 10
                    },
                    "aTimeUTC": 1504777500,
                    "p3": 1,
                    "price": 195,
                    "type_flights": [
                        "GDS-r"
                    ],
                    "bags_price": {
                        "1": 25
                    },
                    "cityTo": "New York City",
                    "transfers": [],
                    "flyFrom": "LAX",
                    "dTimeUTC": 1504757400,
                    "p2": 1,
                    "countryFrom": {
                        "code": "US",
                        "name": "United States"
                    },
                    "p1": 1,
                    "dTime": 1504732200,
                    "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/PJec2NbzV8pQpyv0ZBijUmANvU/XDQQn7gqHyoTNwMZIep73NHtVAwutgGVHJE2CNDl3siw77RdvZ4J3CwW8MgHhfkUGwJOcKtbetHfIJlFtJqLvM/T2ohmFBJC4OcYfZrZCCz9Gh/8JNPirLB4K7BAD9MpuwZ9EvQ+FjPvgn1vfvjAtTAV3YtOwb1QnOAmkWsg9riu9PQcrn0fMIJexzD4b/V/+2OzlAu7XDaAE4RboOI8N9fhdX1BJqdp5fa/sLZRw3GjeVTOkyYShnhiW10JNydFmRxA5QFFH07BUuOItnjU9eW6hROKKa+4j8eQm4MNDl1RzJ24BG0k/1iJy1PIjTVyp/tovEFxyqLTtA/m7YFtAWu13WQeHun1YWyCASdsoVkmPVb3BaUOjrnaXtqFssjYWHJXSF/YXb7NSUO4K5mOPyEnCnYjA0FA4HtIKv6vxVSf9jWo9ieWPsnqv/s=",
                    "cityFrom": "Los Angeles",
                    "aTime": 1504763100,
                    "route": [
                        {
                            "bags_recheck_required": false,
                            "mapIdfrom": "los-angeles",
                            "flight_no": 1418,
                            "original_return": 0,
                            "lngFrom": -118.223533630371,
                            "flyTo": "JFK",
                            "latTo": 40.7052700759286,
                            "source": "GDS-r",
                            "combination_id": "EU2565883611",
                            "id": "EU2565883611_408542164",
                            "latFrom": 34.0699824882441,
                            "lngTo": -74.0135622024537,
                            "dTimeUTC": 1504757400,
                            "aTimeUTC": 1504777500,
                            "return": 0,
                            "price": 1,
                            "cityTo": "New York City",
                            "flyFrom": "LAX",
                            "mapIdto": "new-york",
                            "dTime": 1504732200,
                            "found_on": "amadeus_mpis",
                            "airline": "AS",
                            "cityFrom": "Los Angeles",
                            "aTime": 1504763100
                        }
                    ],
                    "distance": 3936.98
                },
                {
                    "mapIdfrom": "los-angeles",
                    "refr": true,
                    "duration": {
                        "total": 19320,
                        "return": 0,
                        "departure": 19320
                    },
                    "flyTo": "JFK",
                    "conversion": {
                        "EUR": 195
                    },
                    "deep_link": "https://www.kiwi.com/deep?from=LAX&to=JFK&departure=08-09-2017&flightsId=CD4486339312_649218522&price=195&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/PJec2NbzV8pQpyv0ZBijUkQShniVwJ3FMyfp6ga+Xj8PbfXp9ePy+4al/dBdO4Mcmb7Wd8Z39GgnErBPIUppd2nFJbtLctVJ/Od4mwbz283lLHmpRGfDWSEeXHIhyrcbwXje8mE9A7z4tYcy9qreKHH1ufOasq8oC0ullkwJkgyWzgrBPVjw2Djnlb1X9iX1sN4TCuZI9hdEfcC1N8N2uhhQ0UqmWKlLBu9A2+6JMc04OKFA/CpYW+9+iAwrsm3yyc6NakyI/eYW5IWCQ8s+sO0pswAtrl1lkGn7XvF+Siww6l+rUq/OOB3Vv5RyKwEPa9+fVK7ASKEcMgylVWgaNj/QVZli5zaRnbc0efd44THISGwOeB3E6SCd8MSra8ysaKCXROmpL+m8dVBI7ZMfUqPlrYi7x0sGU5EbWf3LauhDijjGGLv3twn3l4Ip9U7wzGVUmeCnlCqgbpeSjeWHTQ=",
                    "mapIdto": "new-york",
                    "nightsInDest": null,
                    "airlines": [
                        "B6"
                    ],
                    "id": "CD4486339312_649218522",
                    "facilitated_booking_available": true,
                    "pnr_count": 1,
                    "fly_duration": "5h 22m",
                    "countryTo": {
                        "code": "US",
                        "name": "United States"
                    },
                    "baglimit": {
                        "hand_width": 35,
                        "hand_length": 55,
                        "hold_weight": 22,
                        "hand_height": 22,
                        "hand_weight": 15
                    },
                    "aTimeUTC": 1504933320,
                    "p3": 1,
                    "price": 195,
                    "type_flights": [
                        "GDS-r"
                    ],
                    "bags_price": {
                        "1": 19
                    },
                    "cityTo": "New York City",
                    "transfers": [],
                    "flyFrom": "LAX",
                    "dTimeUTC": 1504914000,
                    "p2": 1,
                    "countryFrom": {
                        "code": "US",
                        "name": "United States"
                    },
                    "p1": 1,
                    "dTime": 1504888800,
                    "booking_token": "1jxlYxkde2GyMabEvaGo7iaK1KZ7vAp0GyLPK1O56NJ5ph4eWn5jUAgXHofQYcwLirzDzbwYxVmymxriDzQD/PJec2NbzV8pQpyv0ZBijUkQShniVwJ3FMyfp6ga+Xj8PbfXp9ePy+4al/dBdO4Mcmb7Wd8Z39GgnErBPIUppd2nFJbtLctVJ/Od4mwbz283lLHmpRGfDWSEeXHIhyrcbwXje8mE9A7z4tYcy9qreKHH1ufOasq8oC0ullkwJkgyWzgrBPVjw2Djnlb1X9iX1sN4TCuZI9hdEfcC1N8N2uhhQ0UqmWKlLBu9A2+6JMc04OKFA/CpYW+9+iAwrsm3yyc6NakyI/eYW5IWCQ8s+sO0pswAtrl1lkGn7XvF+Siww6l+rUq/OOB3Vv5RyKwEPa9+fVK7ASKEcMgylVWgaNj/QVZli5zaRnbc0efd44THISGwOeB3E6SCd8MSra8ysaKCXROmpL+m8dVBI7ZMfUqPlrYi7x0sGU5EbWf3LauhDijjGGLv3twn3l4Ip9U7wzGVUmeCnlCqgbpeSjeWHTQ=",
                    "cityFrom": "Los Angeles",
                    "aTime": 1504918920,
                    "route": [
                        {
                            "bags_recheck_required": false,
                            "mapIdfrom": "los-angeles",
                            "flight_no": 1124,
                            "original_return": 0,
                            "lngFrom": -118.223533630371,
                            "flyTo": "JFK",
                            "latTo": 40.7052700759286,
                            "source": "GDS-r",
                            "combination_id": "CD4486339312",
                            "id": "CD4486339312_649218522",
                            "latFrom": 34.0699824882441,
                            "lngTo": -74.0135622024537,
                            "dTimeUTC": 1504914000,
                            "aTimeUTC": 1504933320,
                            "return": 0,
                            "price": 1,
                            "cityTo": "New York City",
                            "flyFrom": "LAX",
                            "mapIdto": "new-york",
                            "dTime": 1504888800,
                            "found_on": "amadeus_mpis",
                            "airline": "B6",
                            "cityFrom": "Los Angeles",
                            "aTime": 1504918920
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
                "DL",
                "B6",
                "AS",
                "VX",
                "UA"
            ],
            "time": 1
        }
    return data;
}