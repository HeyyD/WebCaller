import React from 'react';
import ReactDOM from 'react-dom';

import './styles/ProjectForm.css';


export default class ProjectForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            projectName: "",
            projectDescription: "",
            callLists: [],
            projectAgents: []
        });

        this.handleChange = this.handleChange.bind(this);
        this.addProject = this.addProject.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    agents(){
        return Meteor.users.find().fetch();
    }

    addProject(event){
        let project = {
            name: this.state.projectName,
            description: this.state.projectDescription,
            callLists: this.state.callLists,
            agents: this.state.projectAgents
        };
        Meteor.call('addProject', project);
        this.refs.projectName.value = "";
        this.refs.projectDescription.value = "";
        this.setState({
            projectName: "",
            projectDescription: "",
            callLists: [],
            projectAgents: []
        })
        event.preventDefault();
    }

    render(){
        let temp = [];
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
                    {
                        this.agents().map( (agent, i, map) => {
                            temp.push(agent.username);
                            if(map.length - 1 == i)
                                return <DropdownMultiSelect key={agent._id} onSelect={this.onSelect} title="Agents" options={temp} />;
                        })
                    }
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