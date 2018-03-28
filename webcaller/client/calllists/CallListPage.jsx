import React from 'react';
import ReactDOM from 'react-dom';
import CallListForm from './CallListForm.jsx';

CallLists = new Mongo.Collection("calllists");

export default class CallListPage extends React.Component {
  
  constructor(props){
    super(props);
        this.state = {
            subscription: {
                lists: Meteor.subscribe("callLists")
            }
        }
    }

    componentWillUnmount(){
        this.state.subscription.lists.stop();
    }

    lists(){
        return CallLists.find().fetch();
    }

    render(){
        //console.log(this.lists())
        return(
            <div>
                <CallListForm />
            </div>
        );
    }
}