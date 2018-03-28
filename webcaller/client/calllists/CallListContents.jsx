import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

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

    render(){
        console.log(this.callLists());
        console.log(this.props.id);
        return(
            <div>
                <ul>
                    {this.callLists().map( (list)=>{
                        return <p>Hello World</p>;
                    })}                
                </ul>
            </div>
        );
    }

}