import React from 'react';
import ReactDOM from 'react-dom';

export default class ExcelReader extends React.Component {

    constructor(props) {
        super(props);
    }

    readFile(){
        let objectData;
        convertExcel = require('excel-as-json').processFile;
        convertExcel('../../numbers.xlsx', null, null, (error, data) => {
            if(error) {
                console.log('error');
            }else{
                objectData = data;
            }
        });
    }
}