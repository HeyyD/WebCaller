CallProjects = new Mongo.Collection("projects");

Meteor.publish("userProjects", function(){
    return CallProjects.find({user: this.userId});
});

Meteor.publish("subUsers", function(){
    return Meteor.users.find({}, {fields: {_id: 1, username: 1}});
});