import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectForm extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return(
            <form>
                <label>Project name:</label>
                <input type="text" name="projectName" onChange={handleChange}/>
                <label>Description:</label>
                <input type="text" name="projectDescription" onChange={handleChange}/>
                <button onClick={this.addContact}>Add Contact</button>
            </form>

        );
    }


}