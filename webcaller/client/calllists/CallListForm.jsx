import React from 'react';
import ReactDOM from 'react-dom';

export default class CallListForm extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            listName: "",
            listDescription: "",
            contacts: []
        });

        this.handleChange = this.handleChange.bind(this);
        this.addList = this.addList.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }   

    addList(event){
        let list = {
            name: this.state.listName,
            description: this.state.listDescription,
            contacts: this.state.contacts
        };
        Meteor.call('addCallList', list);
        this.refs.listName.value = "";
        this.refs.listDescription.value = "";
        this.setState({
            listName: "",
            listDescription: "",
            contacts: []
        })
        event.preventDefault();
    }
    
    render(){
        return(
            <form>
                <div>
                    <div>
                        <label>Call list name:</label></div>
                    <div>
                        <input type="text" 
                            name="listName" 
                            ref="listName" 
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Description:</label>
                    </div>
                    <div>
                        <textarea className="desc" 
                            name="listDescription" 
                            ref="listDescription"
                            onChange={this.handleChange}/>
                    </div>
                    <button onClick={this.addList}>Add List</button>
                </div>
            </form>
        );
    }
}