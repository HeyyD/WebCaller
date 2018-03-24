import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AgentsForm from './AgentsForm.jsx';


export default class AgentsPage extends TrackerReact(React.Component) {


    render(){
        return(
            <div>
                <AgentsForm />
            </div>
        );
    }


}