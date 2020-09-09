const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); //Blocks browser from restricting any data

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_CONVERSATION_ID
} = process.env;

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

let allMessages = [];

// 1st Create a conversation, this will give you access to the conversationID (CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
//   client.conversations.conversations
//     .create({ friendlyName: "Twilio SMS Nuxt" })
//     .then(conversation => createUsers(conversation.sid));

// 2nd Create a user (sms)
// client.conversations.conversations('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//   .participants
//   .create({
//      'messagingBinding.address': '<Your Personal Mobile Number>',
//      'messagingBinding.proxyAddress': '<Your purchased Twilio Phone Number>'
//    })
//   .then(participant => console.log(participant.sid));

// 3rd Create a user (chat)
// client.conversations
//   .conversations(CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
//   .participants.create({ identity: "rainbow" })
//   .then(participant => {
//     console.log(participant);
//   });

app.get("/send-text", (req, res) => {
  client.conversations
    .conversations(TWILIO_CONVERSATION_ID)
    .messages.create({ author: "rainbow", body: req.query.text })
    .then(message => console.log(message));

  client.conversations
    .conversations(TWILIO_CONVERSATION_ID)
    .messages.list({ limit: 30 })
    .then(messages => {
      messages.forEach(m => {
        allMessages.push({ author: m.author, body: m.body, index: m.index });
      });
      res.send(allMessages.reverse());
      allMessages = [];
    });
});

module.exports = {
  path: "/api",
  handler: app
};
