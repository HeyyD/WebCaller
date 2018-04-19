import React, { Component } from 'react';

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


    render(){
        return(
            <div>
                <div>
                    <ul>
                        {this.state.listContent.map((listItem) => {
                            return <li>{listItem}<button>X</button></li>;    
                        })}
                    </ul>
                </div>
                <div>
                    <select defaultValue="default" onChange={this.itemSelected}>
                        {this.state.options.map((option) => {
                            <option>{option}</option>
                        })}
                    </select>
                    <button>Add</button>
                </div>
            </div>
        );
    }


}
