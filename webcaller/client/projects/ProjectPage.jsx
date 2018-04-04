import React from 'react';
import ReactDOM from 'react-dom';
import ProjectForm from './ProjectForm.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ProjectSingle from './ProjectSingle.jsx';


CallProjects = new Mongo.Collection("projects");

export default class ProjectPage extends TrackerReact(React.Component) {

    constructor(props){
        super(props);
        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects")
            }
        }
    }

    componentWillUnmount(){
        this.state.subscription.projects.stop();
    }

    projects(){
        return CallProjects.find().fetch();
    }

    render(){
        console.log(this.projects())
        let muuttuja = this.projects();
        return(
            <div>
                <ProjectForm />
                <ul className="projects">
                    {this.projects().map( (project)=>{
                        return <ProjectSingle key={project._id} project={project}/>
                    })}                
                </ul>
            </div>
        );
    }


}