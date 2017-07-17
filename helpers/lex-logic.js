'use strict';
/**
 * Response Helpers for Lex Logic
 */

module.exports = {
    /**
     * Build a resopnse based on the validation
     */
    buildValidationResult: function (isValid, validatedSlotName, messageContent) {
        return {
            isValid,
            validatedSlotName,
            message: { contentType: 'PlainText', content: messageContent },
        };
    },

    /**
     * Intent Dispatcher 
     * Validates the name of the Intent.
     */
    dispatch: function (event, callback, expectedIntent, processIntent) {
        // console.log(JSON.stringify(intentRequest, null, 2));
        console.log('dispatch userId=${intentRequest.userId}, intent=${intentRequest.currentIntent.name}');

        const name = event.currentIntent.name;

        // Dispatch to your skill's intent handlers
        if (name === expectedIntent) {
            return processIntent(event, callback);
        }

        throw new Error('Intent with name ${name} not supported');
    }

}