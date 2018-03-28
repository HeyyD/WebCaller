import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectSingle extends React.Component {

    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject() {

    }

    render(){
        return(
        <li>
            <a href={"projects/"+this.props.project._id}>{this.props.project.name}</a>
            <button>X</button>
        </li>
        );
    }

}