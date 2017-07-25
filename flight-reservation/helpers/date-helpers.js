

'use strict';
/**
 * A set of common helper functions
 */

module.exports = {
    parseLocalDate: function (date) {
        /**
         * Construct a date object in the local timezone by parsing the input date string, assuming a YYYY-MM-DD format.
         * Note that the Date(dateString) constructor is explicitly avoided as it may implicitly assume a UTC timezone.
         */
        const dateComponents = date.split(/\-/);
        return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    },

    parseFromUTC: function (utcString) {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcString);
        return d;
    },

    isValidDate: function (date) {
        try {
            return !(isNaN(this.parseLocalDate(date).getTime()));
        } catch (err) {
            return false;
        }
    },

    incrementTimeByThirtyMins: function (time) {
        if (time.length !== 5) {
            // Not a valid time
        }
        const hour = parseInt(time.substring(0, 2), 10);
        const minute = parseInt(time.substring(3), 10);
        return (minute === 30) ? '${hour + 1}:00' : '${hour}:30';
    },

    // Returns a random integer between min (included) and max (excluded)
    getRandomInt: function (min, max) {
        const minInt = Math.ceil(min);
        const maxInt = Math.floor(max);
        return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    },

    today: new Date(),

    toISODate: function (dateToFormat) {
        return `${dateToFormat.getFullYear()}-${dateToFormat.getMonth() + 1}-${dateToFormat.getDate()}`;
    },

    toTime: function (dateToFormat) {
        return `${dateToFormat.getTime()}`;
    }
}