import React from 'react';
import ReactDOM from 'react-dom';
import DropdownMultiSelect from '../components/DropdownMultiSelect';

import './styles/ProjectForm.css';


export default class ProjectForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            projectName: "",
            projectDescription: "",
            callLists: [],
            projectAgents: [],
            agents: []
        });

        this.handleChange = this.handleChange.bind(this);
        this.addProject = this.addProject.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    agents(){
        return Meteor.users.find().fetch();
    }

    onSelect(selected){
        let temp = []
        console.log(temp);
        for(let i = 0; i < selected.length; i++){
            for(let j = 0; j < this.state.agents.length; j++){
                if(selected[i] === this.state.agents[j].username){
                    temp.push(this.state.agents[j]);
                }
            }
        }
        this.setState({
            projectAgents: temp
        })
    }

    addProject(event){
        console.log(this.state.projectAgents);
        let users = []
        for(let i = 0; i < this.state.projectAgents; i++){
            users.push(this.state.projectAgents[i]._id);
        } 
        
        let project = {
            name: this.state.projectName,
            description: this.state.projectDescription,
            callLists: this.state.callLists,
            agents: users
        };
        console.log(project.agents);
        Meteor.call('addProject', project);
        this.refs.projectName.value = "";
        this.refs.projectDescription.value = "";
        this.setState({
            projectName: "",
            projectDescription: "",
            callLists: [],
            projectAgents: [],
            agents: []
        })
        event.preventDefault();
    }

    componentWillReceiveProps(props){
        console.log(props);
        this.setState({
            agents: props.agents
        });
    }

    render(){
        console.log(this.props.agents);
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