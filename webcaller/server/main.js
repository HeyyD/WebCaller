import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Accounts.onCreateUser(function (options, user) {
    
    if (options.profile) {
      user.profile = options.profile;
      user.projects = options.projects;
    }

    user.roles = ['admin'];
    return user;
  });
});
