var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var router = express.Router();

var util = require('./helpers/utilities');
var lexmain = require('./lex-main');

var LOG = util.logger('index.js');
var LEX = lexmain.handler;


var event = {
    "currentIntent": {
        "name": "FlightReservation",
        "slots": {
            "WhereFrom": "Los Angeles"
            , "PlaceFrom": "LA"
            // , "AirportFrom": "LAX"
        },
        "confirmationStatus": "None",
    },
    "bot": {
        "name": "DCS_FCSP",
        "alias": "DEMO",
        "version": "9"
    },
    "userId": "emddones",
    "inputTranscript": "Los Angeles",
    // "invocationSource": "DialogCodeHook",
    "invocationSource": "FulfillmentCodeHook",     
    "outputDialogMode": "Text",
    "messageVersion": "1.0",
    "sessionAttributes": {
        "key1": "value1",
        "key2": "value2"
    }
}

// LOG.log('event: ' + JSON.stringify(event));

LEX(event, null, function (err, response) {
    LOG.log('------------------------------------------------------');

    if (response.dialogAction.type === 'ElicitSlot') {
        LOG.log(` ${response.dialogAction.type} : ${response.dialogAction.slotToElicit} `)
    } else {
        LOG.log(` ${response.dialogAction.type} `);
    }
    LOG.log('------------------------------------------------------');

    if (err) {
        LOG.log(` error : ${err}`);
        LOG.log(` response : ${response}`);
    } else {
        LOG.log(` LEX Message: ${response.dialogAction.message.content} `)
        if (response.dialogAction.responseCard) {
            var genericAttachments = response.dialogAction.responseCard.genericAttachments
            for (y = 0; y < genericAttachments.length; y++) {
                var genericAttachment = response.dialogAction.responseCard.genericAttachments[y];
                LOG.log('________________________________________________');
                LOG.log(` | ${genericAttachment.title} `)
                LOG.log(` | ${genericAttachment.subTitle} `)
                var buttons = genericAttachment.buttons;
                for (x = 0; x < buttons.length; x++) {
                    var text = buttons[x].text;
                    var value = buttons[x].value;
                    LOG.log(` |  ${x + 1}) ${text} : ${value}`);
                }
            }
        }
        LOG.log('------------------------------------------------------');
    }
})

router.use('/api/test', (req, res) => {
    res.status(200).send("success!" + generic.toQueryString({ "import": "successful" }));
});

app.use('/', router);

app.listen(3030);
LOG.level('SYSTEM').log('Listening on port ' + 3030 + '....');

