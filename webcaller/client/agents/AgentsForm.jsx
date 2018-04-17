import React from 'react';
import ReactDOM from 'react-dom';
import DropdownMultiSelect from '../components/DropdownMultiSelect';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AgentsForm extends TrackerReact(React.Component) {

    constructor(props){
        super(props);

        //Get project data
        let temp = this.getProjects();
        let projects = []
        for (let i = 0; i < temp.length; i++) {
            projects[i] = temp[i].name;
        }

        this.state = ({
            username: "",
            password: "",
            projects: projects
        });
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        
        
    }

    getProjects(){
        return CallProjects.find().fetch();
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
        this.setState({
            username: "",
            password: ""
        })
    }

    render(){
        console.log(this.state.projects);
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
                    <DropdownMultiSelect title="Projects" options={this.state.projects} />
                    <button onClick={this.addUser}>Add Agent</button>
                </div>
            </form>
        );
    }
}