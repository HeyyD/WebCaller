var accountSid = 'AC4a59caf3e6d9cb3e8aa3920d03447b04'; // Your Account SID from www.twilio.com/console
var authToken = '0e337a0dd91ddb837ed3d4370ade02e9';   // Your Auth Token from www.twilio.com/console

const VoiceResponse = require('twilio').twiml.VoiceResponse;
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);




Meteor.methods({
    makeCall(number){        
        Picker.route('/call', function(params, req, res, next) {
            const twiml = new VoiceResponse();
            const dial = twiml.dial();
            dial.number(number.toString());
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        });

        client.calls.create({
          url: 'https://cef7144b.ngrok.io/call',
          to: number,
          from: '+358248092145'
        })
        .then(call => process.stdout.write(call.sid));       
    },
    addProject(project){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized!');
        }
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error('not enough rights', 'Only admins can create new projects!');
        }
        CallProjects.insert({
            name: project.name,
            description: project.description,
            callLists: project.callLists,
            agents: project.agents,
            createdAt: Date(),
            user: Meteor.userId()
        });
    },
    modifyProject(project) {
        
    },
    insertAgent(newUserData){

        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error('not enough rights', 'Only admins can create new agents!');
        }

        let user = Accounts.createUser(newUserData);
        Roles.addUsersToRoles(user, ['agent', Meteor.userId()]);
        Roles.removeUsersFromRoles(user, ['admin']);
        return user;
    },
    deleteAgent(agentID){
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error('not enough rights', 'Only admins can delete agents!');
        }

        if(!Roles.userIsInRole(agentID, ['agent', Meteor.userId()])){
            throw new Meteor.Error('not enough rights', 'You can only delete your own agents!')
        }

        Meteor.users.remove(agentID);
    }
});