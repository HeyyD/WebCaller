import Twilio from 'meteor/dispatch:twilio';

var client = new Twilio({
    from: Meteor.settings.TWILIO.FROM,
    sid: Meteor.settings.TWILIO.SID,
    token: Meteor.settings.TWILIO.TOKEN
  });

Meteor.methods({
    makeCall(number){
        twilio.makeCall('+358400366613');
    }
})