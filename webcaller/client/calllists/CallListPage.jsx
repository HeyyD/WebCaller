import React from 'react';
import ReactDOM from 'react-dom';

CallLists = new Mongo.Collection("calllists");

export default class CallListPage extends React.Component {
  
  constructor(props){
    super(props);
        /*this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects")
            }
        }*/
    }

    /*componentWillUnmount(){
        this.state.subscription.projects.stop();
    }*/

    lists(){
        return CallLists.find().fetch();
    }

    render(){
        console.log(this.lists())
        return(
            <div>
                <CallListForm />
            </div>
        );
    }
}