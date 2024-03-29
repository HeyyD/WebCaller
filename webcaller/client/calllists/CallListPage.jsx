import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CallListForm from './CallListForm.jsx';
import CallListSingle from './CallListSingle.jsx';

CallLists = new Mongo.Collection("calllists");

export default class CallListPage extends TrackerReact(React.Component) {
  
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

    renderContent(){
        if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
            return(
                <div>
                    <CallListForm />
                    
                    <table className="projectList">
                        {this.lists().map( (list)=>{
                            return <CallListSingle key={list._id} list={list}/>
                        })}                
                    </table>
                </div>
            );
        }else {
            return(
                <div>
                    <p> Not authorized! </p>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}