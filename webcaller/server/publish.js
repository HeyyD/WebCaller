CallProjects = new Mongo.Collection("projects");

Meteor.publish("userProjects", function(){
    return CallProjects.find({user: this.userId});
});