import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectEdit extends React.Component {

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
                <div>
                    <div>
                        <label>Project name:</label></div>
                    <div>
                        <input type="text" 
                            name="projectName" 
                            ref="projectName" 
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Description:</label>
                    </div>
                    <div>
                        <textarea className="desc" 
                            name="projectDescription" 
                            ref="projectDescription"
                            onChange={this.handleChange}/>
                    </div>
                    <button onClick={this.addProject}>Add Project</button>
                </div>
            </form>
        );
    }


}