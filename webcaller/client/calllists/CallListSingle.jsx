import React from 'react';
import ReactDOM from 'react-dom';

export default class CallListSingle extends React.Component {

    constructor(props){
        super(props);
        this.deleteCallList = this.deleteCallList.bind(this);
    }

    deleteCallList() {
        Meteor.call('deleteCallList', this.props.list._id);      
    }

    render(){
        return(<li><a href={"calllists/"+this.props.list._id}>{this.props.list.name}</a>
        <button onClick={this.deleteCallList}>X</button></li>);
    }

}