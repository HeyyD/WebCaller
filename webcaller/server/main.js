import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
      user.profile = options.profile;
    }

    user.roles = ['admin'];
    return user;
  });
});
