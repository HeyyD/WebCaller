import React, { Component } from 'react';
import './styles/ListView.css';


export default class ListView extends Component {


    constructor(props){
        super(props);
        this.itemSelected = this.itemSelected.bind(this);
        this.state = {
            options: [],
            listContent: [],
            newItem: ""
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
        let listItem = array[index];
        array.splice(index, 1);
        this.setState({
            listContent: array
        })
        this.props.onDeleteListItem(listItem);
    }

    addListItem(event, listItem){
        if(this.state.newItem != ""){
            console.log(this.props.onAddListItem);
            event.preventDefault();
            let array = this.state.listContent;
            array.push(listItem);
            this.setState({
                listContent: array
            });
            this.props.onAddListItem(listItem);
            this.setState({
                newItem: ""
            })
            document.getElementById("defaultValue").selected="selected";
        }
    }

    itemSelected(event){
        this.setState({ newItem: event.target.value});
    }

    render(){
        console.log("LISTA");
        return(
            <div className="viewContainer">
                <div className="contentList">
                    <ul>
                        {this.state.listContent.map((listItem, i) => {
                            return <li>{listItem}<button onClick={(event) => this.deleteItem(event, i)}>Delete</button></li>;    
                        })}
                    </ul>
                </div>
                <div className="botContainer">
                    <select defaultValue="default" onChange={(event) => this.itemSelected(event, )}>
                        <option id="defaultValue" value="default"> -- select an option -- </option>
                        {this.state.options.map((option) => {
                            return <option>{option}</option>;
                        })}
                    </select>
                    <button onClick={(event) => this.addListItem(event, this.state.newItem)}>Add</button>
                </div>
            </div>
        );
    }


}
