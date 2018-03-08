import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectSingle extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(<li>{this.props.projectName}</li>);
    }

}