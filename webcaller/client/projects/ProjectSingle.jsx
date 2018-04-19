import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectSingle extends React.Component {

    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject() {
        Meteor.call('deleteProject', this.props.project._id);      
    }

    render(){
        return(
        <tr>
            <td className="projectSingle"><a href={"projects/"+this.props.project._id}>{this.props.project.name}</a></td>
            <td className="delBut"><button onClick={this.deleteProject}>delete</button></td>
        </tr>
        );
    }

}