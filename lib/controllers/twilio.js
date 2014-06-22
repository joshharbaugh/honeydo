'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    config   = require('../config/twilio.json');

// Your accountSid and authToken from twilio.com/user/account
var accountSid = config.accountSid;
var authToken = config.authToken;
var client = require('twilio')(accountSid, authToken);

/**
 * Send SMS Message
 */
exports.createSMS = function (req, res, next) {
    var textMessage = "",
        todos = req.body.todos;

    for(var idx in todos) {
        if(!todos[idx].completed) textMessage += "- " + todos[idx].name + "\n";
    }

    client.messages.create({
        body: textMessage,
        to: req.body.to,
        from: "+17406100740"
    }, function(err, message) {
        if (err) return res.send(500, err.message);

        process.stdout.write(message.sid);
        return res.json(200, message);        
    });
};