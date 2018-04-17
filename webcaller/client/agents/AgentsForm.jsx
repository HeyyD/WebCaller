import React from 'react';
import ReactDOM from 'react-dom';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AgentsForm extends TrackerReact(React.Component) {

    constructor(props){
        super(props);

        this.state = ({
            username: "",
            password: "",
            projects: []
        });
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    addUser(event){
        event.preventDefault();
        let userData = {
            username: this.state.username,
            password: this.state.password
        }
        Meteor.call('insertAgent', userData);
        this.refs.username.value = "";
        this.refs.password.value = "";
        
    }

    projects(){
        return CallProjects.find().fetch();
    }

    render(){
        console.log(this.state.projects);
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
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                    </div>
                    <div>
                        <input type="password" 
                        name="password" 
                        ref="password" 
                        onChange={this.handleChange}/>
                    </div>
                    {   
                        this.projects().map( (project, i, map) => {
                            temp.push(project.name)
                            if(map.length - 1 == i)
                                return <DropdownMultiSelect title="Projects" options={temp} />
                        }
                    )}
                    
                    <button onClick={this.addUser}>Add Agent</button>
                </div>
            </form>
        );
    }
}