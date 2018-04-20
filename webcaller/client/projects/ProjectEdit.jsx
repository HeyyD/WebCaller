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
        this.onAddListItem = this.onAddListItem.bind(this);
        this.getUnselectedAgents = this.getUnselectedAgents.bind(this);
        this.listsLoaded = this.listsLoaded.bind(this);
        this.onAddCallList = this.onAddCallList.bind(this);
        this.onDeleteCallList = this.onDeleteCallList.bind(this);
        this.getUnselectedLists = this.getUnselectedLists.bind(this);

        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects", this.onSubscriptionReady),
                agents: Meteor.subscribe("subUsers", this.agentsLoaded),
                callLists: Meteor.subscribe("callLists", this.listsLoaded)
            },
            _id: '',
            projectName: '',
            projectDescription: '',
            projectAgents: [],
            agents: [],
            unselectedAgents: [],
            callLists: [],
            projectLists: [],
            unselectedLists: []
        }
    }

    listsLoaded(){
        let lists = CallLists.find().fetch();
        let project = CallProjects.find({_id:this.props.id}).fetch()[0];

        let projectLists = [];
        for(let i = 0; i < project.callLists.length; i++){

            projectLists.push(CallLists.find({_id: project.callLists[i]}).fetch()[0])
        }
        let unselected = CallLists.find().fetch();
        console.log(unselected);
       
        this.setState({
            callLists: lists,
            projectLists: projectLists,
            unselectedLists: unselected
        });
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
        this.state.subscription.callLists.stop();
    }

    editProject(event) {

        let projectAgents = [];
        for(let i = 0; i < this.state.projectAgents.length; i++){
            projectAgents.push(this.state.projectAgents[i]._id);
        }

        let projectLists = [];
        for(let i = 0; i < this.state.projectLists.length; i++){
            projectLists.push(this.state.projectLists[i]._id);
        }

        let p = {
            _id : this.state._id,
            name: this.state.projectName,
            description : this.state.projectDescription,
            agents: projectAgents,
            callLists: projectLists
        };

        Meteor.call('modifyProject', p);

        FlowRouter.go('projects');

        event.preventDefault();
    }
    onDeleteCallList(listItem){
        let array = this.state.projectLists;
        
        for(let i = 0; i < array.length; i++){
            if(array[i].name == listItem && array.length > 1){
                array.splice(i, 1);
            }
            else if(array[i].name == listItem)
                array = []
        }
        let unselected = this.state.unselectedLists;
        unselected.push(CallLists.find({name: listItem}).fetch()[0])
        this.setState({
            projectLists: array,
            unselectedLists: unselected
        });
    }

    onAddCallList(listItem){
        let callList = CallLists.find({name: listItem}).fetch()[0];
        let projectLists = this.state.projectLists;

        projectLists.push(callList);
        this.setState({
            projectLists: projectLists
        })
    }

    onDeleteListItem(listItem){
        console.log("ONDELETE");
        let array = this.state.projectAgents;
        
        for(let i = 0; i < array.length; i++){
            console.log(listItem)
            if(array[i].username == listItem && array.length > 1){
                array.splice(i, 1);
            }
            else if(array[i].username == listItem)
                array = []
        }
        let unselected = this.state.unselectedAgents;
        unselected.push(Meteor.users.find({username: listItem}).fetch()[0])
        this.setState({
            projectAgents: array,
            unselectedAgents: unselected
        });
        
    }

    onAddListItem(listItem){
        console.log("PROJECTEDIT");
        console.log(listItem);
        let agent = Meteor.users.find({username: listItem}).fetch()[0];
        let projectAgents = this.state.projectAgents;
        //let unselectedAgents = this.state.unselectedAgents;
        projectAgents.push(agent);
        console.log(projectAgents);
        this.setState({
            projectAgents: projectAgents
        })
        this.getUnselectedAgents();
    }

    getUnselectedAgents(){
        unselectedAgents = this.state.agents;
        console.log("UNSELECTED");
        console.log(unselectedAgents);
        for(let i = unselectedAgents.length-1; i >= 0; i--){
            for(let j = 0; j < this.state.projectAgents.length; j++){
                if(unselectedAgents[i].username == this.state.projectAgents[j].username){
                    unselectedAgents.splice(i, 1);
                }
            }
        }

        this.setState({
            unselectedAgents: unselectedAgents
        });
    }

    getUnselectedLists(){
        console.log("UNSELECTEDLIST")
        unselectedLists = this.state.callLists;
        console.log(this.state.callLists[2].name);
        console.log(unselectedLists[2].name);
        for(let i = unselectedLists.length-1; i >= 0; i--){
            console.log("HEHEE")
            for(let j = 0; j < this.state.projectLists.length; j++){
                console.log(this.state.projectList[j].name);
                if(unselectedLists[i].name == this.state.projectLists[j].name){
                    unselectedLists.splice(i, 1);
                }
            }
        }
        console.log(unselectedLists);
        this.setState({
            unselectedLists: unselectedLists
        });
    }

    render(){
        let agentArray = [];
        for(let i = 0; i < this.state.projectAgents.length; i++){
            agentArray.push(this.state.projectAgents[i].username)
        }
        let unselectedAgents = [];
        for(let i = 0; i < this.state.unselectedAgents.length; i++){
            unselectedAgents.push(this.state.unselectedAgents[i].username);
        }
        let unselectedLists = [];
        for(let i = 0; i < this.state.callLists.length; i++){
            unselectedLists.push(this.state.callLists[i].name);
        }
        let listArray = [];
        for(let i = 0; i < this.state.projectLists.length; i++){
            listArray.push(this.state.projectLists[i].name)
        }
        console.log(this.state.callLists);
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
                    onAddListItem={this.onAddListItem}/>
                <ListView 
                    options={unselectedLists} 
                    listContent={listArray} 
                    onDeleteListItem={this.onDeleteCallList}
                    onAddListItem={this.onAddCallList}/>
                
            </form>
        );
    }


}