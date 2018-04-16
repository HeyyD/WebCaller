import React from 'react';
import ReactDOM from 'react-dom';

export default class ContactSingle extends React.Component {

    constructor(props){
        super(props);
    }

    readContact(){
        let keys = [];
        let i = 0;
        for (let [key, value] of Object.entries(this.props.contact)) {
            keys.push(<tr key={i}>
                        <td>{key}:</td> 
                        <td>{value}</td>
                    </tr>);
            i++;
        }
        keys.push(<br></br>);
        return keys;
    }

    render(){
        let keys = this.readContact();
        return(
            <table>
                <tbody>
                    {keys}
                </tbody>
            </table>
        );
    }

}