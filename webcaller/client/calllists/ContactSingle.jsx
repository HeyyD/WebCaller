import React from 'react';
import ReactDOM from 'react-dom';
import ExcelReader from './ExcelReader.jsx';

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
        return keys;
    }

    render(){
        let keys = this.readContact();
        return(
            <table>
                <tbody>
                {keys}
                <ExcelReader/>
                </tbody>
            </table>
        );
    }

}