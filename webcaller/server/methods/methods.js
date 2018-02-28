var accountSid = 'AC4a59caf3e6d9cb3e8aa3920d03447b04'; // Your Account SID from www.twilio.com/console
var authToken = '0e337a0dd91ddb837ed3d4370ade02e9';   // Your Auth Token from www.twilio.com/console

const express = require('express');
const app = express();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


Meteor.methods({
    makeCall(number){
        const twiml = new VoiceResponse();
        twiml.say({ voice: 'alice' }, 'hello world!');

        client.calls.create({
          url: 'http://koti.tamk.fi/~c6samhau/call.xml',
          to: number,
          from: '+358248092145'
        })
        .then(call => process.stdout.write(call.sid));       
    }
});