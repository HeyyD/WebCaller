CallProjects = new Mongo.Collection("projects");
CallLists = new Mongo.Collection("calllists");

Meteor.publish("userProjects", function(){
    return CallProjects.find({user: this.userId});
});

Meteor.publish("subUsers", function(){
    return Meteor.users.find({roles: this.userId}, {fields: {_id: 1, username: 1, projects: 1, roles: 1}});
});
Meteor.publish("callLists", function(){
    return CallLists.find({user: this.userId});
});
