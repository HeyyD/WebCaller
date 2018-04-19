import React, { Component } from 'react';
import './styles/ListView.css';


export default class ListView extends Component {


    constructor(props){
        super(props);
        this.state = {
            options: [],
            listContent: []
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            options: props.options,
            listContent: props.listContent
        })
    }

    deleteItem(event, index){
        event.preventDefault();
        console.log(event);
        let array = this.state.listContent;
        array.splice(index, 1);
        this.setState({
            listContent: array
        })
        this.props.onDeleteListItem(array);
    }

    addListItem(){
        
    }

    render(){
        console.log("LISTA" + this.state.options);
        return(
            <div className="viewContainer">
                <div className="contentList">
                    <ul>
                        {this.state.listContent.map((listItem, i) => {
                            return <li>{listItem}<button onClick={(event) => this.deleteItem(event, i)}>Delete</button></li>;    
                        })}
                    </ul>
                </div>
                <div>
                    <select defaultValue="default" onChange={this.itemSelected}>
                        <option disabled value="default"> -- select an option -- </option>
                        {this.state.options.map((option) => {
                            return <option>{option}</option>;
                        })}
                    </select>
                    <button onClick={this.addListItem}>Add</button>
                </div>
            </div>
        );
    }


}
