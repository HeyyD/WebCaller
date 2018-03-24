import React from 'react';
import ReactDOM from 'react-dom';

export default class AgentsForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            username: "",
            password: "",
        });
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    addUser(event){
        event.preventDefault();
        console.log('hello');
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
                        <input type="text" 
                        name="password" 
                        ref="password" 
                        onChange={this.handleChange}/>
                    <button onClick={this.addUser}>Add Agent</button>
                </div>
            </form>
        );
    }
}