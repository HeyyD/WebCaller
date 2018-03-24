import React from 'react';
import ReactDOM from 'react-dom';

export default class AgentsForm extends React.Component {

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
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
                    <button onClick={this.addProject}>Add Project</button>
                </div>
            </form>
        );
    }
}