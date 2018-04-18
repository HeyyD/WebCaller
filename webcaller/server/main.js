import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Accounts.onCreateUser(function (options, user) {

    const customizedUser = Object.assign({
      projects: [],
    }, user);

    if (options.profile) {
      customizedUser.profile = options.profile;
    }

    customizedUser.roles = ['admin'];
    return customizedUser;
  });
});
