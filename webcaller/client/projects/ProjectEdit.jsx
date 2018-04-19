import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ListView from '../components/ListView';

export default class ProjectEdit extends TrackerReact(React.Component) {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.editProject = this.editProject.bind(this);
        this.onSubscriptionReady = this.onSubscriptionReady.bind(this);
        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects", this.onSubscriptionReady),
                agents: Meteor.subscribe("subUsers", this.agentsLoaded)
            },
            _id: '',
            projectName: '',
            projectDescription: '',
            projectAgents: []
        }
    }

    agentsLoaded(){
        
    }

    onSubscriptionReady(){

        let project = CallProjects.find({_id: this.props.id}).fetch()[0];

        this.setState({
            _id: project._id,
            projectName: project.name,
            projectDescription: project.description,
            projectAgents: project.agents
        })
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillUnmount(){
        this.state.subscription.projects.stop();
        this.state.subscription.agents.stop();
    }

    editProject(event) {

        let p = {
            _id : this.state._id,
            name: this.state.projectName,
            description : this.state.projectDescription,
            agents: this.state.agents
        };

        Meteor.call('modifyProject', p);

        FlowRouter.go('projects');

        event.preventDefault();
    }
    onDeleteListItem(listItem){
        let array = this.state.projectAgents;
        for(let i = 0; i < array.length; i++){
            if(array[i].username === listItem){
                array.splice(i, 1);
            }
        }
        this.setState({
            projectAgents: array
        });
    }

    render(){
        console.log(this.state.projectAgents);
        let agentArray = [];
        for(let i = 0; i < this.state.projectAgents; i++){
            agentArray.push(this.state.projectAgents[i].username)
        }
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
                <ListView 
                    options={agentArray} 
                    listContent={agentArray} 
                    onDeleteListItem={this.onDeleteListItem}
                    onAddListItem={this.onDeleteListItem}/>
            </form>
        );
    }


}