import React from 'react';
import ReactDOM from 'react-dom';

export default class CallListForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            projectName: "",
            projectDescription: "",
            callLists: [],
            projectAgents: []
        });

        this.handleChange = this.handleChange.bind(this);
        this.addProject = this.addProject.bind(this);
    }

   
    
    render(){
        return(
            <form>
                <div>
                    <div>
                        <label>Call list name:</label></div>
                    <div>
                        <input type="text" 
                            name="projectName" 
                            ref="projectName" 
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Description:</label>
                    </div>
                    <div>
                        <textarea className="desc" 
                            name="projectDescription" 
                            ref="projectDescription"
                            onChange={this.handleChange}/>
                    </div>
                    <button onClick={this.addList}>Add List</button>
                </div>
            </form>
        );
    }
}