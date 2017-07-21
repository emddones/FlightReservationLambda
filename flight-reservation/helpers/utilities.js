'use strict'
var request = require('request');
var querystring = require('querystring');

module.exports = {
    logger: function (name) {
        // console.log('[INFO][SYSTEM] Preparing logger for ' + name);
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
        var LOG = this.logger;
        var requestUrl = getUrl.url + "?" + querystring.stringify(params);
        LOG('generic.js').log('Request URL : ' + requestUrl);
        request.get(requestUrl,
            function (error, response, body) {
                // LOG('generic.js').log(`Data response: ${body}`);
                if (!error && response.statusCode == 200) {                    
                    callback(error, JSON.parse(body));
                } else {                    
                    callback(error, { errormessage: body });
                }
            }
        );           
    },

    toQueryString: function (objectParams) {
        return querystring.stringify(objectParams);
    }
}