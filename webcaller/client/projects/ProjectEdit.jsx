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

        this.callListsLoaded = this.callListsLoaded.bind(this);
        this.getUnselectedCallLists = this.getUnselectedCallLists.bind(this);
        this.onAddListItemCallList = this.onAddListItemCallList.bind(this);
        this.onDeleteListItemCallList = this.onDeleteListItemCallList.bind(this);

        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects", this.onSubscriptionReady),
                agents: Meteor.subscribe("subUsers", this.agentsLoaded),
                callLists: Meteor.subscribe("callLists", this.callListsLoaded)
            },
            _id: '',
            projectName: '',
            projectDescription: '',
            projectAgents: [],
            agents: [],
            unselectedAgents: [],
            projectCallLists: [],
            callLists: [],
            unselectedCallLists: []
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

    callListsLoaded(){
        let callLists = CallLists.find().fetch();
        console.log("Call Lists : " + callLists.length);
        let project = CallProjects.find({_id:this.props.id}).fetch()[0];
        console.log("CALLLISTS LOADED");
        

        let projectCallLists = [];
        
        console.log("call lists moi " + project.callLists.length);
        for(let i = 0; i < project.callLists.length; i++){
            projectCallLists.push(CallLists.find({_id: project.callLists[i]}).fetch()[0]);
            
        }
        console.log(projectCallLists);
        this.setState({
            callLists: callLists,
            projectCallLists: projectCallLists
        });
        this.getUnselectedCallLists();
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

        let projectCallLists = [];
        for(let i = 0; i < this.state.projectCallLists.length; i++){
            projectCallLists.push(this.state.projectCallLists[i]._id);
        }

        let p = {
            _id : this.state._id,
            name: this.state.projectName,
            description : this.state.projectDescription,
            callLists: projectCallLists,
            agents: projectAgents
        };

        Meteor.call('modifyProject', p);

        FlowRouter.go('projects');

        event.preventDefault();
    }

    onDeleteListItemCallList(listItem){
        console.log("ONDELETE CALL LIST");
        let array = this.state.projectCallLists;
        
        for(let i = 0; i < array.length; i++){
            if(array[i].name == listItem && array.length > 1){
                array.splice(i, 1);
            }
            else if(array[i].name == listItem)
                array = []
        }
        let unselected = this.state.unselectedCallLists;
        unselected.push(CallLists.find({name: listItem}).fetch()[0])
        this.setState({
            projectCallLists: array,
            unselectedCallLists: unselected
        });
        
    }

    onAddListItemCallList(listItem){
        console.log("PROJECTEDIT CALL LIST");
        console.log(listItem);
        let callList = CallLists.find({name: listItem}).fetch()[0];
        let projectCallLists = this.state.projectCallLists;
        //let unselectedCallLists = this.state.unselectedCallLists;
        projectCallLists.push(callList);
        console.log(projectCallLists);
        this.setState({
            projectCallLists: projectCallLists
        })
        this.getUnselectedCallLists();
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
    getUnselectedCallLists(){
        unselectedCallLists = this.state.callLists;
        console.log("UNSELECTED LISTS");
        console.log(unselectedCallLists);
        for(let i = unselectedCallLists.length-1; i >= 0; i--){
            for(let j = 0; j < this.state.projectCallLists.length; j++){
                if(unselectedCallLists[i].name == this.state.projectCallLists[j].name){
                    unselectedCallLists.splice(i, 1);
                }
            }
        }

        this.setState({
            unselectedCallLists: unselectedCallLists
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

        let callListArray = [];
        for(let i = 0; i < this.state.projectCallLists.length; i++){
            callListArray.push(this.state.projectCallLists[i].name)
        }
        let unselectedCallLists = [];
        for(let i = 0; i < this.state.unselectedCallLists.length; i++){
            unselectedCallLists.push(this.state.unselectedCallLists[i].name);
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
                    onAddListItem={this.onAddListItem}/>

                <br></br>
                <ListView 
                    options={unselectedCallLists} 
                    listContent={callListArray} 
                    onDeleteListItem={this.onDeleteListItemCallList}
                    onAddListItem={this.onAddListItemCallList}/>

            </form>
        );
    }


}