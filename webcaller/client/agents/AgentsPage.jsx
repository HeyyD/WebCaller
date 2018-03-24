import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class AgentsPage extends TrackerReact(React.Component) {


    render(){
        console.log(this.projects())
        return(
            <div>
                <p> Hello </p>
            </div>
        );
    }


}