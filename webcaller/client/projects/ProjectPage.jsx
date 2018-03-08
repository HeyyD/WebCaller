import React from 'react';
import ReactDOM from 'react-dom';
import ProjectForm from './ProjectForm.jsx';

CallProjects = new Mongo.Collection("projects");

export default class ProjectPage extends React.Component {

    projects(){
        return CallProjects.find().fetch();        
    }

    render(){
        return(
            <div>
                <ProjectForm />
                <ul>
                    {this.projects().map( (project)=>{
                        return <ResolutionSingle key={project._id} projectName={"nimi"}/>
                    })}                
                </ul>
            </div>
        );
    }


}