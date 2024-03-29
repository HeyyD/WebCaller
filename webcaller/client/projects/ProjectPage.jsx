import React from 'react';
import ReactDOM from 'react-dom';
import ProjectForm from './ProjectForm.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ProjectSingle from './ProjectSingle.jsx';


CallProjects = new Mongo.Collection("projects");

export default class ProjectPage extends TrackerReact(React.Component) {

    constructor(props){
        super(props);

        this.onSubscriptionReady = this.onSubscriptionReady.bind(this);
        this.onCallListLoad = this.onCallListLoad.bind(this);

        this.state = {
            subscription: {
                projects: Meteor.subscribe("userProjects"),
                agents: Meteor.subscribe("subUsers", this.onSubscriptionReady),
                callLists: Meteor.subscribe("callLists", this.onCallListLoad)
            },
            agents: [],
            callLists: []
        }


    }

    onSubscriptionReady(){   
        let agents = Meteor.users.find().fetch();
        this.setState({
            agents: agents
        });
    }

    onCallListLoad(){
        let lists = CallLists.find().fetch();
        console.log("LISTAT");
        console.log(lists);
        this.setState({
            callLists: lists
        });
    }

    componentWillUnmount(){
        this.state.subscription.projects.stop();
        this.state.subscription.agents.stop();
        this.state.subscription.callLists.stop();
    }

    projects(){
        return CallProjects.find().fetch();
    }

    renderContent(){
        if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
            return(
                <div>
                    <ProjectForm agents={this.state.agents} lists={this.state.callLists}/>
                    <table className="projectList">
                        {this.projects().map( (project)=>{
                            return <ProjectSingle key={project._id} project={project}/>
                        })}                
                    </table>
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