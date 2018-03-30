import React from 'react';
import ReactDOM from 'react-dom';

export default class ContactSingle extends React.Component {

    constructor(props){
        super(props);
    }

    readContact(){
        let keys = [];
        for (let [key, value] of Object.entries(this.props.contact)) {
            keys.push(<tr>
                        <td>{key}:</td> 
                        <td>{value}</td>
                    </tr>);
        }
        return keys;
    }

    render(){
        let keys = this.readContact();

        return(
            <div>
                {keys}
            </div>
        );
    }

}