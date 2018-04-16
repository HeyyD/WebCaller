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
        Meteor.call('readExcelFile', 'C:/Users/Tom/Documents/WebCaller/WebCaller/webcaller/numbers.xlsx');
        return <tr><td>{this.readFile()}</td></tr>;
    }
}