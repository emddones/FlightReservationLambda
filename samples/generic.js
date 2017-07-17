var request = require('request');
var querystring = require('querystring');

module.exports = {

    logger: function (name) {
        console.log('[INFO][SYSTEM] Preparing logger for ' + name);
        if (!name) {
            name = "[GENERIC]";
        } else {
            name = "[" + name + "]"
        }

        return {
            name: name,

            levelValue: '[INFO]',

            level: function (level) {
                this.levelValue = '[' + level + ']';
                return this;
            },

            log: function (message) {
                var logMessage = this.levelValue + this.name + ' ' + message;
                console.log(logMessage);
            }
        }
    },

    get: function (getUrl, params, callback) {
        var requestUrl = getUrl.url + "?" + querystring.stringify(params);
        this.logger('generic.js').log('Request URL : ' + requestUrl);
        // request.get(requestUrl,
        //     function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             callback(error, JSON.parse(body));
        //         } else {
        //             callback(error, { errormessage: response.message });
        //         }
        //     }
        // );
        callback(null,
            [{ 'id': 'LAX', 'value': 'Los Angeles' }]
        )
    },

    toQueryString: function (objectParams) {
        return querystring.stringify(objectParams);
    }

}