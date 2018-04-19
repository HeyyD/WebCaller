import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ContactSingle from './ContactSingle.jsx';

export default class CallListContents extends TrackerReact(React.Component) {

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

    callLists(){
        return CallLists.find({_id: this.props.id}).fetch();
    }

    getContacts(){
        let c = this.callLists()[0].contacts;
        return Object.keys(c[0]);
    }

    render(){
        console.log(this.getContacts());
        //        <ContactAddForm contacts={this.getContacts()}/>
        return(
            <div>
                <ul>
                    {this.callLists()[0].contacts.map( (contact)=>{
                        return <ContactSingle key={contact._id} contact={contact}/>
                    })}                
                </ul>
            </div>
        );
    }
}