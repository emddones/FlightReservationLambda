
NODE_TLS_REJECT_UNAUTHORIZED = 0;
var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var router = express.Router();

var util = require('./flight-reservation/helpers/utilities');
var reservation = require('./lex-flight-reservation');

var LOG = util.logger('index.js');
var reserve = reservation.handler;

var event = {}

event = {
    "currentIntent": {
        "name": "FlightReservation",
        "slots": {
            // "placeholder": "",
            "From": "Los Angele",
            "To": "New York",
            // "Departure": "2017-09-05",
            // "DepartureFlightId": "123",
            // "FlightType": "round trip",
            // "Return": "2017-09-05",
            // "ReturnFlightId": "123"
        },
        "confirmationStatus": "None"
    },
    "bot": {
        "name": "DCS_FCSP",
        "alias": "DEMO",
        "version": "9"
    },
    "userId": "emddones",
    "inputTranscript": "Los Angeles",
    "invocationSource": "DialogCodeHook",
    "outputDialogMode": "Text",
    "messageVersion": "1.0",
    "sessionAttributes": {
        "From": "Los Angeles",
        "To": "New York"
    }
};

// LOG.log('event: ' + JSON.stringify(event));

reserve(event, null, displayHandler)

router.use('/api/test', (req, res) => {
    res.status(200).send("success!" + generic.toQueryString({ "import": "successful" }));
});

app.use('/', router);

app.listen(3030);
LOG.level('SYSTEM').log('Listening on port ' + 3030 + '....');

function displayHandler(err, response) {
    console.log("\n\n");
    LOG.log('------------------------------------------------------');

    if (response.dialogAction) {
        if (response.sessionAttributes.completedSlots) {
            LOG.log('Completed');
        } else if (response.dialogAction.type === 'ElicitSlot') {
            LOG.log(` ${response.dialogAction.type} : ${response.dialogAction.slotToElicit} `)
        } else {
            LOG.log(` ${response.dialogAction.type}`);
        }
        LOG.log('------------------------------------------------------');

        if (err) {
            LOG.log(` error : ${err}`);
            LOG.log(` response : ${response}`);

        } else {
            if (response.dialogAction.message) {
                LOG.log(` LEX Message: ${response.dialogAction.message.content} `)
                if (response.dialogAction.responseCard) {
                    var genericAttachments = response.dialogAction.responseCard.genericAttachments;

                    var attachementIsNull = !genericAttachments;
                    var attachmentHasNoItem = attachementIsNull || genericAttachments.length < 1;
                    var cardHasTitle = attachmentHasNoItem || genericAttachments.length < 1 || !genericAttachments[0].title;

                    LOG.log(`Has Title: ${cardHasTitle}; AttachmentNull: ${attachementIsNull}; No Item: ${attachmentHasNoItem}`);

                    if (cardHasTitle || attachementIsNull || attachmentHasNoItem) {
                        LOG.level('WARNING').log('Warning: Response Card avilable, but no attachment, or title is found.  this will cause errors in LEX');
                    }

                    for (y = 0; y < genericAttachments.length; y++) {
                        var genericAttachment = response.dialogAction.responseCard.genericAttachments[y];
                        LOG.log('________________________________________________');
                        LOG.log(` | ${genericAttachment.title} `)
                        LOG.log(` | ${genericAttachment.subTitle} `)
                        LOG.log(` | ${genericAttachment.imageUrl} `)
                        var buttons = genericAttachment.buttons;
                        for (x = 0; x < buttons.length; x++) {
                            var text = buttons[x].text;
                            var value = buttons[x].value;
                            LOG.log(` |  ${x + 1}) ${text} : ${value}`);
                        }
                    }
                }
            }
            LOG.log('------------------------------------------------------');
            LOG.log(' SLOTS:');
            var slots = response.dialogAction.slots;
            for (var key in slots) {
                LOG.log(`   - ${key} : ${slots[key]}`);
            }
            LOG.log(' ATTRIBUTES:');
            var sessionAttributes = response.sessionAttributes;
            for (var key in sessionAttributes) {
                LOG.log(`   - ${key} : ${sessionAttributes[key]}`);
            }
            LOG.log('------------------------------------------------------');
            LOG.log('\n\n');
            LOG.log(JSON.stringify(response));
        }
    }
}