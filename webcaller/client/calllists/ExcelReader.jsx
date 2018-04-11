import React from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';

export default class ExcelReader extends React.Component {

    constructor(props) {
        super(props);
    }

    readFile(){
        
    }

    render(){
        return <tr><td>{this.readFile()}</td></tr>;
    }
}