import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectForm extends React.Component {

    constructor(props){
        super(props);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return(
            <form>
                <label>Project name:</label>
                <input type="text" name="projectName" onChange={console.log("hi")}/>
                <label>Description:</label>
                <input type="text" name="projectDescription" onChange={console.log("hi")}/>
                <button onClick={this.addContact}>Add Contact</button>
            </form>

        );
    }


}