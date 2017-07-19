'use strict'
/**
 * Main lambda handler
 */
var logic = require('./helpres/lex-logic');
var card = require('./helpers/lex-response-card');
var util = require('./common-helper')

/**
 * 
 * @param {*} response 
 * @param {*} originalCallback 
 */

/**
 * logger
 */
function loggingCallback(response, originalCallback) {
    // console.log(JSON.stringify(response, null, 2));
    originalCallback(null, response);
}

/**
 * A sample function to validate slot values during dispatches
 * 
 * @param {*} slot1 - sample parameter 1
 * @param {*} slot2Name - sample parameter 2
 */
function validateIntent(slot1, slot2) {
    if (slot1 && slot1=="slot value 1") {
        var isValid = false;
        var validatedSlotName = "SomeSlotName";
        var message = 'Currently slot value 1 is not supported';
        return buildValidationResult(isValid, validatedSlotName, message);
    }

    if (slot1 && !slot2) {
        var isValid = false;
        var validatedSlotName = "SomeSlotName";
        var message = 'You alerady provided info for slot1 as ${slot1}. Please tell me about slot2';
        return buildValidationResult(isValid, validatedSlotName, message);
    }

    //tells that no violations for all slots is encountered.
    return buildValidationResult(true, null, null);
}

function buildOptions(slotName, slots) {
    if (slotName === 'slot1') {
        return [
            { text: 'Option Label 1', value: 'slot value 1' },
            { text: 'Option Label 2', value: 'slot value 2' },
            { text: 'Option Label 3', value: 'slot value 3' },
        ];
    }
}

/**
 * Performs dialog management and fulfillment for the intent.
 * 
 *   1) Use of elicitSlot in slot validation and re-prompting
 *   2) Use of confirmIntent to support the confirmation of inferred slot values, when confirmation is required
 *      on the bot model and the inferred slot values fully specify the intent.
 *   3) Fullfilment
 */
function processIntent(intentRequest, callback) {

    const outputSessionAttributes = intentRequest.sessionAttributes || {};
    /* Demonstrates a simple utility map object to store key-attribute values */
    const mappedValues = JSON.parse(outputSessionAttributes.mappedValues || '{}');

    const lexSlots = intentRequest.currentIntent.slots;
    const source = intentRequest.invocationSource;


    if (source === 'DialogCodeHook') {
        slot1 = lexslots.slot1;
        slot2 = lexslots.slot2;

        const validationResult = validateIntent(slot1, slot2);
        if (!validationResult.isValid) {
            slots['${validationResult.violatedSlot}'] = null;
            callback(elicitSlot(outputSessionAttributes, intentRequest.currentIntent.name,
                slots, validationResult.violatedSlot, validationResult.message,
                buildResponseCard('Specify ${validationResult.violatedSlot}', validationResult.message.content,
                    buildOptions(validationResult.violatedSlot, slots))));
            return;
        }
    }

    // Book the appointment.  In a real bot, this would likely involve a call to a backend service.
    const duration = getDuration(appointmentType);
    const initialized = mappedValues['initialized'];
    if (initialized) {
        outputSessionAttributes.mappedValues = JSON.stringify(mappedValues);
    } else {
        // This is not treated as an error as this code sample supports functionality either as fulfillment or dialog code hook.
        console.log('intent is not satisfied, This should have been initialized if this function was configured as the dialog code hook');
    }

    callback(close(outputSessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: 'All is ok, ${slot1} and ${slot2} are supplied.'
    }));
}

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
        process.env.TZ = 'America/New_York';
        console.log('event.bot.name=${event.bot.name}');

        /**
         * Uncomment this if statement and populate with your Lex bot name and / or version as
         * a sanity check to prevent invoking this Lambda function from an undesired Lex bot or
         * bot version.
         */

        /*
        if (event.bot.name !== 'MakeAppointment') {
             callback('Invalid Bot Name');
        }
        */

        // loggingCallback - intercepts callback to log first in console.
        dispatch(event, (response) => loggingCallback(response, callback), expectedIntent, processIntent);
    } catch (err) {
        callback(err);
    }
};
