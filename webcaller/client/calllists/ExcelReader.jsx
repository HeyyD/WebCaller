import React from 'react';
import ReactDOM from 'react-dom';
import * as XLSX from 'xlsx';

export default class ExcelReader extends React.Component {

    constructor(props){
        super(props);
    }

    readFile(){
        let file = '../../banaani.xlsx';
        var name = file.name;
        const reader = new FileReader();
        reader.onload = (evt) => { //evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, {header:1});
            /* Update state */
            console.log("Data>>>"+data);
        };
        console.log(reader.readAsBinaryString(file));
    }

    render(){
        return <div>{this.readFile()}</div>;
    }
}