import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ProjectEdit extends TrackerReact(React.Component) {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.editProject = this.editProject.bind(this);
        this.onSubscriptionReady = this.onSubscriptionReady.bind(this);
        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects", this.onSubscriptionReady)
            },
            projectName: '',
            projectDescription: ''
        }
    }

    onSubscriptionReady(){

        let project = CallProjects.find({_id: this.props.id}).fetch()[0];

        this.setState({
            projectName: project.name,
            projectDescription: project.description
        })
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    editProject(event) {
        event.preventDefault();
        console.log(this.props.id);
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
                            value={this.state.projectName}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Description:</label>
                    </div>
                    <div>
                        <textarea className="desc" 
                            name="projectDescription" 
                            ref="projectDescription"
                            value={this.state.projectDescription}
                            onChange={this.handleChange}/>
                    </div>
                    <button onClick={this.editProject}>Save changes</button>
                </div>
            </form>
        );
    }


}