import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AgentEdit extends TrackerReact(React.Component){
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.editAgent = this.editAgent.bind(this);
    this.onSubscriptionReady = this.onSubscriptionReady.bind(this);
    this.state = {
        subscription: {
            agents: Meteor.subscribe("subUsers", this.onSubscriptionReady) 
        },
        username: '',
        password: ''
    }
}

onSubscriptionReady(){

    let agent = Meteor.users.find({_id: this.props.id}).fetch()[0];
    console.log("this.id"+this.props.id)
    this.setState({
        _id: agent._id,
        username: agent.username,
        password: agent.password
    })
}

handleChange(event){
    this.setState({[event.target.name]: event.target.value});
}

componentWillUnmount(){
    this.state.subscription.agents.stop();
}

editAgent(event) {

    let a = {
        _id : this.state._id,
        username: this.state.username,
        password : this.state.password
    };

    Meteor.call('modifyAgent', a);

    FlowRouter.go('agents');

    event.preventDefault();
}
render(){
    let temp = [];
    return(
        <form>
            <div>
                <div>
                    <label>Username:</label></div>
                <div>
                    <input type="text" 
                        name="username" 
                        ref="username"
                        value={this.state.username}
                        onChange={this.handleChange}/>
                </div>
                <div>
                    <label>Password:</label>
                </div>
                <div>
                    <input type="password" 
                    name="password" 
                    ref="password"
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                </div>
                
                
                <button onClick={this.editAgent}>Save Changes</button>
            </div>
        </form>
    );
}
}

