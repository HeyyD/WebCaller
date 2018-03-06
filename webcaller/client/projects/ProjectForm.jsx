import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            projectName: "",
            projectDescription: "",
            projectLists: []
        });

        this.handleChange = this.handleChange.bind(this);
        this.addProject = this.addProject.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    addProject(){

    }

    render(){
        return(
            <form>
                <label>Project name:</label>
                <input type="text" name="projectName" onChange={this.handleChange}/>
                <label>Description:</label>
                <input type="text" name="projectDescription" onChange={this.handleChange}/>
                <button onClick={this.addProject}>Add Contact</button>
            </form>
        );
    }


}