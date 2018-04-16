import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone'

export default class ExcelReader extends React.Component {

    constructor(props) {
        super(props);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            reader.onload = (e) => {
			// Parse data
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			// Get first worksheet 
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			// Convert array of arrays
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            // Pass data to backend 
            console.log(data);
            //Meteor.call('parseExcelData', data);
			//this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
		if(rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        });
    }



    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Drag and drop a file here, or click to select file to upload.</p>
                    </Dropzone>
                </div>
            </section>
        );
      }
}