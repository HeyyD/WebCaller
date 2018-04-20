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
            projects: [],
            activeProjects: []
        });
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.onSelect = this.onSelect.bind(this);
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
        
        Meteor.call('insertAgent', userData, (err, user) => {
            for(let i = 0; i < this.state.activeProjects.length; i++){
                let project = this.state.activeProjects[i];
                project.agents.push(user);
                Meteor.call('modifyProject', project);
            }
        });
        this.refs.username.value = "";
        this.refs.password.value = "";
        
    }

    projects(){
        return CallProjects.find().fetch();
    }

    onSelect(selected){
        let temp = []
        for(let i = 0; i < selected.length; i++){
            for(let j = 0; j < this.state.projects.length; j++){
                if(selected[i] === this.state.projects[j].name){
                    temp.push(this.state.projects[j]);
                }
            }
        }
        this.setState({
            activeProjects: temp
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            projects: props.projects
        })
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
                            temp.push(project.name);
                            if(map.length - 1 == i || map.length === 0)
                                return <DropdownMultiSelect key={project._id} onSelect={this.onSelect} title="Projects" options={temp} />;
                        }
                    )}
                    
                    <button onClick={this.addUser}>Add Agent</button>
                </div>
            </form>
        );
    }
}