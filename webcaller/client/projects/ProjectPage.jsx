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
                projects: Meteor.subscribe("userProjects"),
                agents: Meteor.subscribe("subUsers")
            }
        }
    }

    componentWillUnmount(){
        this.state.subscription.projects.stop();
        this.state.subscription.agents.stop();
    }

    projects(){
        return CallProjects.find().fetch();
    }

    renderContent(){
        if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
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
        }else {
            return(
                <div>
                    <p> Not authorized! </p>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }


}