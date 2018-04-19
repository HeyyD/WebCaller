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
        this.agentsLoaded = this.agentsLoaded.bind(this);
        this.onDeleteListItem = this.onDeleteListItem.bind(this);
        this.getUnselectedAgents = this.getUnselectedAgents.bind(this);

        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects", this.onSubscriptionReady),
                agents: Meteor.subscribe("subUsers", this.agentsLoaded)
            },
            _id: '',
            projectName: '',
            projectDescription: '',
            projectAgents: [],
            agents: [],
            unselectedAgents: []
        }
    }

    agentsLoaded(){
        let agents = Meteor.users.find().fetch();
        let project = CallProjects.find({_id:this.props.id}).fetch()[0];
        

        let projectAgents = [];
        for(let i = 0; i < project.agents.length; i++){
            projectAgents.push(Meteor.users.find({_id: project.agents[i]}).fetch()[0]);
        }

        this.setState({
            agents: agents,
            projectAgents: projectAgents
        });
        this.getUnselectedAgents();
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
            agents: this.state.projectAgents
        };

        Meteor.call('modifyProject', p);

        FlowRouter.go('projects');

        event.preventDefault();
    }
    onDeleteListItem(listItems){
        let array = this.state.projectAgents;
        console.log(array);
        for(let i = 0; i < array.length; i++){
            let remove = true;
            for(let j = 0; j < listItems.length; j++){
                if(array[i].username == listItems[j]){
                    remove = false;
                }
            }
            if(remove){
                array.splice(i, 1);
                break;
            }
        }
        this.setState({
            projectAgents: array
        });
    }

    onAddListItem(array){
        let projectAgents = this.state.projectAgents;
        for(let i = 0; i < array.length; i++){
            let add = true;
            for(let j = 0; j < projectAgents; j++){
                if(array[i] == projectAgents.username){
                    add = false;
                }
            }
            if(add){
                projectAgents.push(Meteor.users.find({username: array[i]}).fetch()[0]);
                break;
            }
        }
        this.setState({
            projectAgents: projectAgents
        })
    }

    getUnselectedAgents(){
        unselectedAgents = this.state.agents;
        for(let i = unselectedAgents.length-1; i > 0; i--){
            removed = false;
            for(let j = 0; j < this.state.projectAgents.length; j++){
                if(unselectedAgents[i].username == this.state.projectAgents[j].username){
                    removed = true;
                }
            }
            console.log("moi")
            if(removed){
                console.log("Hello")
                unselectedAgents.splice(i, 1);
            }
        }

        this.setState({
            unselectedAgents: unselectedAgents
        });
    }

    render(){
        console.log("RENDER")
        console.log(this.state.unselectedAgents);
        let agentArray = [];
        for(let i = 0; i < this.state.projectAgents.length; i++){
            agentArray.push(this.state.projectAgents[i].username)
        }
        let unselectedAgents = [];
        for(let i = 0; i < this.state.unselectedAgents.length; i++){
            unselectedAgents.push(this.state.unselectedAgents[i].username);
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
                    options={unselectedAgents} 
                    listContent={agentArray} 
                    onDeleteListItem={this.onDeleteListItem}
                    onAddListItem={this.onDeleteListItem}/>
            </form>
        );
    }


}