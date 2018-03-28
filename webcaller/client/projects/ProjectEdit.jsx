import React from 'react';
import ReactDOM from 'react-dom';

export default class ProjectEdit extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.editProject = this.editProject.bind(this);
        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects")
            }
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    editProject(event) {
        event.preventDefault();
        console.log(this.props.id);
    }

    projects(){
        return CallProjects.find().fetch();
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
                    <button onClick={this.editProject}>Save changes</button>
                </div>
            </form>
        );
    }


}