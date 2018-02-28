var accountSid = 'AC4a59caf3e6d9cb3e8aa3920d03447b04'; // Your Account SID from www.twilio.com/console
var authToken = '0e337a0dd91ddb837ed3d4370ade02e9';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);




Meteor.methods({
    makeCall(number){
        client.messages.create({
            body: 'Hello from Node',
            to: '+358400366613',  // Text this number
            from: '+358248092145' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));        
    }
});