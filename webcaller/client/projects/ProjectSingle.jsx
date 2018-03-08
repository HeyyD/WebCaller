import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectSingle extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.projectName);
        return(<li>{this.props.projectName}</li>);
    }

}