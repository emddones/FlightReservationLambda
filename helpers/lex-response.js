'use strict';
/**
 * Helpers to build responses which match the structure of the necessary dialog actions
 */

module.exports = {

    elicitSlot: function (sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'ElicitSlot',
                intentName,
                slots,
                slotToElicit,
                message,
                responseCard,
            },
        };
    },

    confirmIntent: function (sessionAttributes, intentName, slots, message, responseCard) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'ConfirmIntent',
                intentName,
                slots,
                message,
                responseCard,
            },
        };
    },

    close: function close(sessionAttributes, fulfillmentState, message, responseCard) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState,
                message,
                responseCard,
            },
        };
    },

    delegate: function (sessionAttributes, slots) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Delegate',
                slots,
            },
        };
    },

    // Build a responseCard with a title, subtitle, and an optional set of options which should be displayed as buttons.
    buildResponseCard: function (title, subTitle, options) {
        let buttons = null;
        if (options != null) {
            buttons = [];
            for (let i = 0; i < Math.min(5, options.length); i++) {
                buttons.push(options[i]);
            }
        }
        return {
            contentType: 'application/vnd.amazonaws.card.generic',
            version: 1,
            genericAttachments: [{
                title,
                subTitle,
                buttons,
            }],
        };
    }
}