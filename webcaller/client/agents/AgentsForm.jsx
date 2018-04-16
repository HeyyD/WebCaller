import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

export default class AgentsForm extends React.Component {

    constructor(props){
        super(props);

        this.state = ({
            username: "",
            password: "",
            projects: ["lol", "ebin"]
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
        this.setState({
            username: "",
            password: ""
        })
    }

    handleSelectChange (value) {
		console.log('You\'ve selected:', value);
        this.setState({ projects: [value] });
	}

    render(){
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
                    <label>projects</label>
                    <Select
                        closeOnSelect={false}
                        disabled={false}
                        multi
                        onChange={this.handleSelectChange}
                        placeholder="Select projects"
                        removeSelected={this.state.removeSelected}
                        rtl={false}
                        simpleValue
                        value={this.state.projects}
				    />
                    <button onClick={this.addUser}>Add Agent</button>
                </div>
            </form>
        );
    }
}